import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import {
  ENTER,
  SEARCH_BTN_TITLE,
  SEARCH_PLACEHOLDER,
  SEARCH_ROUTE,
} from "../constants";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ENTER && searchQuery.trim()) {
      navigate(`${SEARCH_ROUTE}${searchQuery}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`${SEARCH_ROUTE}${searchQuery}`);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        placeholder={SEARCH_PLACEHOLDER}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      <Link to={`${SEARCH_ROUTE}${searchQuery}`}>
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={!searchQuery.trim()}
        >
          {SEARCH_BTN_TITLE}
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
