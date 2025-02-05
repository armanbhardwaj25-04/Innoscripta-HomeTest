import React, { useEffect, useState } from "react";
import { Home, User, Newspaper, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_DROPDOWN_DATA } from "../constants";
import MobileOverlay from "./MobileNav";
import "./NavBar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return !isMobile ? (
    <nav className="navbar">
      <div className="sidebar">
        <Link to="/" className="nav-item">
          <Home size={20} className="icon" /> Home
        </Link>
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen("personalized")}
          onMouseLeave={() => setDropdownOpen(null)}
        >
          <button className="nav-item">
            <User size={20} className="icon" /> Personalized
          </button>
          {dropdownOpen === "personalized" && (
            <div className="dropdown-menu">
              {NAV_DROPDOWN_DATA.map((data) => (
                <DropdownItem
                  key={data.title}
                  title={data.title}
                  icon={<Newspaper size={16} />}
                  items={data.items}
                  setDropdownOpen={setDropdownOpen}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  ) : (
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

const DropdownItem = React.memo(
  ({
    title,
    icon,
    items,
    setDropdownOpen,
  }: {
    title: string;
    icon: any;
    items: any[];
    setDropdownOpen: React.Dispatch<React.SetStateAction<string | null>>;
  }) => {
    const [nestedOpen, setNestedOpen] = useState(false);

    return (
      <div
        className="dropdown-section"
        onMouseEnter={() => setNestedOpen(true)}
        onMouseLeave={() => setNestedOpen(false)}
      >
        <div className="dropdown-title">
          {icon} {title} <ChevronRight size={16} />
        </div>
        {nestedOpen && (
          <ul className="nested-menu">
            {items.map((item) => (
              <Link
                key={item.name}
                className="nested-item"
                to={`/${title.toLowerCase()}/${item.name.toLowerCase()}`}
                onClick={() => setDropdownOpen(null)} // Close dropdown on click
              >
                <li>{item.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default Navbar;
