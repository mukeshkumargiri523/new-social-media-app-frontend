import React from "react";
import "./LeftBotttom.css";
import Friend from "../../img/left_bottom_svg/friend-4-svgrepo-com.svg";
import Memories from "../../img/left_bottom_svg/clock-svgrepo-com.svg";
import Saved from "../../img/left_bottom_svg/save-svgrepo-com.svg";
import Groups from "../../img/left_bottom_svg/group-team-svgrepo-com.svg";
import Video from "../../img/left_bottom_svg/video-course-svgrepo-com.svg";
import AdsManager from "../../img/left_bottom_svg/graph2-svgrepo-com.svg";
import Drop from "../../img/left_bottom_svg/drop-74-svgrepo-com.svg";
import Climate from "../../img/left_bottom_svg/sun-rain-svgrepo-com.svg";
import Event from "../../img/left_bottom_svg/calendar-svgrepo-com.svg";

function LeftBottom() {
  return (
    <div className="LeftBottom">
      <div className="left_page">
        <img src={Friend} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Friends</span>
      </div>
      <div className="left_page">
        <img src={Memories} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Memories</span>
      </div>
      <div className="left_page">
        <img src={Saved} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Saved</span>
      </div>
      <div className="left_page">
        <img src={Groups} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Groups</span>
      </div>
      <div className="left_page">
        <img src={Video} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Video</span>
      </div>

      <div className="left_page">
        <img src={AdsManager} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Ads Manager</span>
      </div>
      <div className="left_page">
        <img src={Drop} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Blood donation</span>
      </div>
      <div className="left_page">
        <img src={Climate} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Climate</span>
      </div>
      <div className="left_page">
        <img src={Event} alt="" className="leftpage_icon" />
        <span className="leftpage_name">Event</span>
      </div>
    </div>
  );
}

export default LeftBottom;
