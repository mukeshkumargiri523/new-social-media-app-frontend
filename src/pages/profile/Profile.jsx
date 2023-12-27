import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSide from "../../components/postSilde/PostSide";
import LeftSide from "../../components/leftSide/LeftSide";
function Profile() {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-Center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <LeftSide />
    </div>
  );
}

export default Profile;
