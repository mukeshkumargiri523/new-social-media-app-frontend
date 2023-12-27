import React, { useRef, useState } from "react";
import PostImage from "../../img/postpic2.jpg";
import "./PostShare.css";
import { FcGallery } from "react-icons/fc";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../Action/UploadAction";

const PostShare = () => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <>
      <div className="PostShare">
        <div className="img_inp">
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "default_profile_pic.jpg"
            }
            alt=""
          />
          <div>
            <textarea
              ref={desc}
              required
              className="share_inp"
              type="text-area"
              placeholder="Share Your Views"
            />
          </div>
        </div>
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <FcGallery />
            Photos
          </div>
          <div className="option o2">
            <AiOutlineSchedule />
            Schedule
          </div>
          <div className="option o3">
            <FaRegCirclePlay />
            Video
          </div>
          <div className="option o4">
            <MdAddLocationAlt />
            Location
          </div>
          <button
            className="share_button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading.." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      </div>
      {image && (
        <div className="previewImage">
          <MdOutlineCancel
            className="preview_cancel"
            onClick={() => {
              setImage(null);
            }}
          />
          <img
            className="preview_img"
            src={URL.createObjectURL(image)}
            alt="preview"
          />
        </div>
      )}
    </>
  );
};

export default PostShare;
