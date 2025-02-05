import axios from "axios";
import { FALLBACK_CAROUSEL, NYT_DOMAIN } from "../constants";
import { SetStateAction } from "react";
import { Params } from "react-router-dom";

// API Keys (Move these to .env for security in production)
const API_KEYS = {
  NEWS_API: "pub_668944c47a72c490460a028fa72f20cc14979",
  NYT_API: "58rOFjG2VJsANfVlI6AXJNycdC7fDLZL",
  OPEN_NEWS_API: "76157d0ee8a84cac83d060db9179e565",
  GUARDIAN_API: "a220498b-a1bb-43ce-bb88-38a997dc87e6",
};

// API Endpoints
const API_ENDPOINTS = {
  NYT: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  NEWS_DATA: "https://newsdata.io/api/1/latest",
  OPEN_NEWS: "https://newsapi.org/v2/everything",
};

// Utility function for handling API requests
const fetchData = async (url: string, params: object) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};

// Fetch carousel articles from NYT API
export const fetchCarouselArticles = async () => {
  const response = await fetchData(API_ENDPOINTS.NYT, {
    "api-key": API_KEYS.NYT_API,
    q: "news",
  });

  if (!response?.response?.docs) return [];

  return response.response.docs
    .filter((item: { multimedia: { url: string }[] }) => item.multimedia?.[0]?.url)
    .map(
      (item: { multimedia: { url: string }[]; abstract: string; lead_paragraph: string, web_url: string }, index: number) => ({
        id: index,
        imageUrl: `${NYT_DOMAIN}${item.multimedia[0].url}`,
        title: item.abstract,
        description: item.lead_paragraph,
        url: item.web_url,
      })
    );
};

// Fetch general news articles from multiple sources
export const fetchArticles = async (
  setIsLoading: (value: SetStateAction<boolean>) => void,
  params: Readonly<Params<string>>,
  filters: Record<string, any>
) => {
  let queryParams = { ...params, ...filters };
  if (!queryParams.q) queryParams.q = "world"; // Default to "world" if no query

  setIsLoading?.(true);

  // Fetch data from multiple sources
  const [newsApiResponse, openNewsResponse] = await Promise.all([
    fetchData(API_ENDPOINTS.NEWS_DATA, { apiKey: API_KEYS.NEWS_API, ...queryParams }),
    fetchData(API_ENDPOINTS.OPEN_NEWS, { apiKey: API_KEYS.OPEN_NEWS_API, ...queryParams }),
  ]);

  setIsLoading?.(false);

  return processApiResponse(newsApiResponse, openNewsResponse);
};

// Process API responses and merge data
const processApiResponse = (newsApiResponse: any, openNewsResponse: any) => {
  const response: any[] = [
    ...(newsApiResponse?.results || []),
    ...(openNewsResponse?.articles || []),
  ];
  const error = response.length === 0 ? "Failed to fetch news data" : "";

  return { response, error };
};
