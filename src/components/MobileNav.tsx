import React, { useState, useEffect } from "react";
import { ChevronRight, ArrowLeft, User } from "lucide-react";
import { NAV_DROPDOWN_DATA } from "src/constants";
import { Link } from "react-router-dom";
import "./MobileNav.css";

const MobileOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentLevel, setCurrentLevel] = useState("L1"); // "L1", "L2", "L3"
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setCurrentLevel("L1"); // Reset to main menu
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOverlay = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      setSelectedCategory('Personalized');
      setCurrentLevel("L1"); // Always reset to L1 when opening
    }
  };

  const openSubMenu = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    setCurrentLevel("L2");
  };

  const goBack = () => {
    setSelectedCategory('Personalized');
    setCurrentLevel((prev) => (prev === "L3" ? "L2" : "L1"));
  };

  const subMenuItems =
    NAV_DROPDOWN_DATA.find((data) => data.title === selectedCategory)?.items ||
    [];

  return (
    <div className="mobile-nav">
      <button onClick={toggleOverlay} className="nav-item">
        <User size={20} className="icon" /> Personalized
      </button>

      {isOpen && isMobile && (
        <div className={`overlay ${isOpen ? "active" : ""}`}>
          <div className="overlay-content">
            <div className="nav-header-wrap">
              {currentLevel === "L2" ? (
                <button className="back-btn" onClick={goBack}><ArrowLeft size={20} /></button>
              ) : null}
              <h4 className="heading">{selectedCategory}</h4>
              <button className="close-btn" onClick={toggleOverlay}>&times;</button>
            </div>
            {/* Level 1 (Main Menu) */}
            {currentLevel === "L1" && (
              <div className="overlay-menu">

                {NAV_DROPDOWN_DATA.map((item) => (
                  <button
                    key={item.title}
                    className="overlay-item"
                    onClick={() => openSubMenu(item.title)}
                  >
                    {item.title} <ChevronRight size={18} />
                  </button>
                ))}
              </div>
            )}

            {/* Level 3 (Final Items) */}
            {currentLevel === "L2" && (
              <div className="overlay-menu">
                {subMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    className="overlay-item"
                    to={`/${selectedCategory.toLowerCase()}/${item.name.toLowerCase()}`}
                    onClick={toggleOverlay} // Close overlay after selection
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileOverlay;
