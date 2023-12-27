import React, { useEffect, useState } from "react";
import { getUser } from "../../Api/UserRequest";

const Conversation = ({ data, online, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="friend_list conversation">
        {online && <div className="online-dot"> </div>}
        <img
          src={
            userData?.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + "default_profile_pic.jpg"
          }
          className="followerImage"
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            marginRight: "2.5rem",
          }}
          alt=""
        />
        <div className="name" style={{ fontSize: "0.9rem" }}>
          <span>
            {userData?.firstname} {userData?.lastname}
          </span>
          {online ? (
            <span className="online_text">Online</span>
          ) : (
            <span className="online_text">Offline</span>
          )}
        </div>
      </div>

      <hr />
    </>
  );
};

export default Conversation;
