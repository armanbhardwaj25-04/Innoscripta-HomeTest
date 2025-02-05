import React, { useState } from "react";
import { Home, User, Newspaper, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { NAV_DROPDOWN_DATA } from "../constants";
import MobileOverlay from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="sidebar">
        <Link to="/" className="nav-item">
          <Home size={20} className="icon" /> Home
        </Link>
        <MobileOverlay />
      </div>
    </nav>
  );
};

export default Navbar;
