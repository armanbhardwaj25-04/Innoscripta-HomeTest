import React from "react";
import { APP_HEADING } from "../constants/index.js";
import SearchBar from "./SearchBar";
import Navbar from "./NavBar";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className="wrapper">
      <header className="header" />
      <div className="content">
        <h1 className="heading">{APP_HEADING}</h1>
        <SearchBar />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
