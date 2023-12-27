import React from "react";
// import CoverImg from "../../img/cover.jpg";
// import ProfileImg from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProfileCard = ({ location }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? publicFolder + user.coverPicture
              : publicFolder + "welcome_main_cover_image.jpg"
          }
          alt=""
          className="coverImg"
        />
        {location === "profilePage" ? (
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "default_profile_pic.jpg"
            }
            style={{ width: "20%", height: "10rem" }}
            alt=""
            className="profileImg"
          />
        ) : (
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "default_profile_pic.jpg"
            }
            style={{ width: "6rem", height: "6rem" }}
            alt=""
            className="profileImg"
          />
        )}
      </div>
      <div className="ProfileName">
        <span>{`${user.firstname}  ${user.lastname}`}</span>
        <span>{user.workat ? user.worksat : "About Yourself"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>

            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow ">
            <span>{user.followers.length}</span>

            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>

        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <div className="Profilelink">
          <Link to={`/profile/${user._id}`}>My Profile</Link>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
