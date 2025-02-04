import React, { useState, useEffect } from "react";
import "./Filters.css";
import { NEWS_CATEGORIES_FILTER, NEWS_SOURCES_FILTER } from "../constants";

// Define the interface for props
interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<any>>; 
  filters: any;
  showFilters: boolean;
  domain?: string; 
  category?: string;
  q?: string;
  [key: string]: any; // For other additional dynamic props that you might pass via {...params}
}

const Filters: React.FC<FiltersProps> = ({ setFilters, filters, showFilters, domain, category, q }) => {
  const [categoryFilter, setCategoryFilter] = useState<any>("");
  const [source, setSource] = useState<any>("");

  // Effect to update filters based on selected category or source
  useEffect(() => {
    const updatedFilters: Record<string, string> = { ...filters };

    if (categoryFilter) updatedFilters.category = categoryFilter?.replaceAll(" ", "")?.toLowerCase();
    if (source) updatedFilters.domain = source?.replaceAll(" ", "")?.toLowerCase();

    setFilters(updatedFilters);
  }, [categoryFilter, source]);

  // Rendering the Filters component
  return showFilters ? (
    <div className="container">
      <div className="filters">
        {!category && (
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {NEWS_CATEGORIES_FILTER.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        {!domain && (
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            {NEWS_SOURCES_FILTER.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        <button
          className="reset-btn"
          onClick={() => {
            setCategoryFilter("");
            setSource("");
            setFilters({}); // Reset filters to an empty object
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  ) : null;
};

export default Filters;
