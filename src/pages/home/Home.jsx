import React from "react";
import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSilde/PostSide";
import LeftSide from "../../components/leftSide/LeftSide";
function Home() {
  return (
    <div className="Home">
      <LeftSide />
      <PostSide />
      <ProfileSide />
    </div>
  );
}

export default Home;
