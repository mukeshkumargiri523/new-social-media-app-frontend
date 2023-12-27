import React, { useEffect, useState } from "react";
import { followUser, unfollowUser } from "../../Action/UserAction";
import { useDispatch, useSelector } from "react-redux";

const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const dispatch = useDispatch();
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <>
      <div className="follower">
        <div>
          <img
            src={
              person.profilePicture
                ? publicFolder + person.profilePicture
                : publicFolder + "default_profile_pic.jpg"
            }
            alt=""
            className="followerImg"
          />
          <div className="name">
            <span className="fol_name">
              {person.firstname} {person.lastname}
            </span>
            <span className="fol_username"> {person.username}</span>
          </div>
        </div>
        <button
          className={
            following ? "button fc-button UnfollowBtn" : "button fc-button"
          }
          onClick={handleFollow}
        >
          {following ? "UnFollow" : "Follow"}
        </button>
      </div>
    </>
  );
};

export default User;
