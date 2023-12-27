import React, { useEffect } from "react";
// import { PostsData } from "../../data/PostData";
import "./Posts.css";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePostOfUser } from "../../Action/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimelinePostOfUser(user._id));
  }, []);

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
