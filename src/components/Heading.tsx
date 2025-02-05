import React from "react";
import { useParams } from "react-router-dom";
import "./Header.css";

const Heading = () => {
  const { domain, category, q: query } = useParams(); // Extracts the dynamic part from the URL

  // Determine the heading based on the available params
  const heading = domain
    ? `Source: ${domain.toUpperCase()}`
    : category
      ? `Category: ${category}`
      : query
        ? `Search: ${query}`
        : "";

  return <h1 className="heading">{heading}</h1>;
};

export default Heading;
