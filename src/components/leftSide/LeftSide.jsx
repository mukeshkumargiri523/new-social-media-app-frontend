import React, { useState } from "react";
import "./LeftSide.css";
import Home from "../../img/svg/home-svgrepo-com.svg";
import Notify from "../../img/svg/bell-svgrepo-com.svg";
import Comment from "../../img/svg/comment-balloon-part-2-svgrepo-com.svg";
import Setting from "../../img/svg/setting-setting-svgrepo-com.svg";
import TrendCard from "../trendCard/TrendCard";
import LeftBottom from "../leftBottom/LeftBottom";
import ShareModal from "../shareModal/ShareModal";
import { Link } from "react-router-dom";
function LeftSide() {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="LeftSide">
      <div className="navIcons">
        <Link to="../home">
          <img style={{ width: "30px" }} src={Home} alt="" />
        </Link>
        <Link to="../chat">
          <img style={{ width: "30px" }} src={Comment} alt="" />
        </Link>

        <img src={Notify} alt="" />
        <img src={Setting} alt="" />
      </div>
      <TrendCard />
      <button
        className="button sharing_btn"
        onClick={() => setModalOpened(true)}
      >
        Share Post
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      <LeftBottom />
    </div>
  );
}

export default LeftSide;
