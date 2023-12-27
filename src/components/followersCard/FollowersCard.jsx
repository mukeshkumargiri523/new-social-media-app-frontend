import React, { useEffect, useState } from "react";
import "./FollowersCard.css";

// import { Followers } from "../../data/FollowersData";
import User from "../user/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../Api/UserRequest";
function FollowersCard() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPerson();
  }, []);
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
}

export default FollowersCard;
