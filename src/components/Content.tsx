import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import Filters from "./Filters";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../services/api";
import NoArticleFound from "./NoArticleFound";
import Heading from "./Heading";
import "./Content.css";

// Define the structure of fetched data
interface Article {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

const Content: React.FC = () => {
  const [data, setData] = useState<Article[]>([]);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, any>>({}); // Ensuring filters is an object
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams<{ domain?: string; category?: string; q?: string }>();
  const { domain, category, q: query } = params;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchArticles(setIsLoading, params, filters);
        setData(result?.response || []);
        setError(result.error || "");
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [domain, category, query, filters, params]); // Ensures API calls only when needed

  return (
    <div className="contentWrapper">
      <Suspense fallback={<NoArticleFound error={error} />}>
        <Heading />
        <Filters showFilters={data.length > 0} filters={filters} setFilters={setFilters} error={error} {...params} />
        <ArticleCard error={error} articles={data} isLoading={isLoading} />
      </Suspense>
    </div>
  );
};

export default Content;
