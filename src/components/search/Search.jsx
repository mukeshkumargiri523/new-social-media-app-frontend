import React from "react";
import Logo from "../../img/logo/Beatlogo-removebg-preview.png";
import TopLogo from "../../img/logo/Beats_main_logo-removebg-preview.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./Search.css";
function Search() {
  return (
    <>
      <div className="upper_logo">
        <img src={TopLogo} alt="" />
      </div>
      <div className="Search">
        <div className="search-input">
          <input className="inp" type="text" placeholder="#ExploreMore" />
          <div className="serach-icon">
            <UilSearch />
          </div>
        </div>
        <img src={Logo} alt="" />
      </div>
    </>
  );
}

export default Search;
