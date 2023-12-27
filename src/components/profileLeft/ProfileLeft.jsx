import React from "react";
import "./ProfileLeft.css";
import Search from "../search/Search";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
function ProfileLeft() {
  return (
    <div className="ProfileLeft">
      <Search />
      <InfoCard />
      <FollowersCard />
    </div>
  );
}

export default ProfileLeft;
