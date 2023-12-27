import { Modal } from "@mantine/core";
import "./ProfileModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../Action/UploadAction";
import { updateUser } from "../../Action/UserAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const { password, ...otherData } = data;
  const [formData, setFormData] = useState(otherData);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture"
        ? setProfilePicture(img)
        : setCoverPicture(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = formData;
    if (profilePicture) {
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const fileName = Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, userData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        centered
        size="60%"
        onClose={() => setModalOpened(false)}
      >
        <div className="modal">
          <form className="infoform">
            <h4>Your Info</h4>
            <div>
              <input
                type="text"
                className="infoInput"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstname}
              />
              <input
                type="text"
                className="infoInput"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastname}
              />
            </div>
            <div>
              <input
                type="text"
                className="infoInput"
                name="city"
                placeholder="Lives in City"
                onChange={handleChange}
                value={formData.city}
              />
              <input
                type="text"
                className="infoInput"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                value={formData.country}
              />
            </div>
            <div className="lastRow">
              <div className="radio_inp">
                <div className="single">
                  <input
                    type="radio"
                    id="single"
                    name="status"
                    value="Single"
                    onChange={handleChange}
                  />
                  <label htmlFor="single">Single</label>
                </div>
                <div className="relation">
                  <input
                    type="radio"
                    id="relation"
                    name="status"
                    value="Relationship"
                    onChange={handleChange}
                  />
                  <label htmlFor="relation">Relationship</label>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="infoInput"
                  name="worksat"
                  placeholder="Works At"
                  onChange={handleChange}
                  value={formData.worksat}
                />
              </div>
            </div>
            <div className="upload_file">
              Profile Image
              <input
                type="file"
                name="profilePicture"
                onChange={handleImageChange}
              />
              Cover Image
              <input
                type="file"
                name="coverPicture"
                onChange={handleImageChange}
              />
            </div>
            <button className="button update_btn" onClick={handleSubmit}>
              Update Profile
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default ProfileModal;
