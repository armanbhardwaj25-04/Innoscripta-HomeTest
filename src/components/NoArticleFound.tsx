import React from "react";

interface NoArticleFoundProps {
  error: string;
}

const NoArticleFound: React.FC<NoArticleFoundProps> = ({ error }) => {
  return error ? (
    <div className="error-state">
      <img alt={error} src="/images/error.jpg" />
      <p>{error}</p>
    </div>
  ) : null;
};

export default NoArticleFound;
