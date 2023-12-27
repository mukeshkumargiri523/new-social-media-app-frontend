import React from "react";
import Search from "../search/Search";
import ProfileCard from "../profileCard/ProfileCard";
import "./ProfileSide.css";
import FollowersCard from "../followersCard/FollowersCard";
function ProfileSide() {
  return (
    <div className="ProfileSide">
      <Search />
      <ProfileCard location="homepage" />
      <FollowersCard />
    </div>
  );
}

export default ProfileSide;
