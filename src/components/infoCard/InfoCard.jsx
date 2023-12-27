import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import Edit from "../../img/svg/pen-new-square-svgrepo-com.svg";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../Api/UserRequest";
import { logout } from "../../Action/AuthAction";

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h3>Profile Info</h3>
        {user._id === profileUserId ? (
          <img src={Edit} alt="" onClick={() => setModalOpened(true)} />
        ) : (
          ""
        )}

        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user}
        />
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.status}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives In</b>
        </span>
        <span>
          {profileUser.city} {profileUser.country}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works At</b>
        </span>
        <span>{profileUser.worksat}</span>
      </div>
      <hr />
      <button className="button logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default InfoCard;
