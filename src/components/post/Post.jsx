import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/svg/comment-balloon-part-3-svgrepo-com.svg";
import Share from "../../img/svg/share-svgrepo-com.svg";
import Like from "../../img/svg/like-svgrepo-com.svg";
import NotLike from "../../img/svg/like-svgrepo-com (1).svg";
import { useSelector } from "react-redux";
import { likePost } from "../../Api/PostRequest";

function Post({ data }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Like : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" style={{ cursor: "pointer" }} />
        <img src={Share} alt="" style={{ cursor: "pointer" }} />
      </div>
      <span className="likes">
        {likes} <span>Likes</span>
      </span>
      <div className="desc">
        <span> {data.desc}</span>
      </div>
    </div>
  );
}

export default Post;
