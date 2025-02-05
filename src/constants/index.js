export const APP_HEADING = "Innoscripta AG News";
export const SEARCH_PLACEHOLDER = "Search articles...";
export const SEARCH_BTN_TITLE = "Search";
export const SEARCH_ROUTE = "/search/";
export const ENTER = "Enter";
export const SOURCES_HEADING = "Sources";
export const CATEGORIES_HEADING = "Categories";
export const RECTANGLE_CAROUSEL_TYPE = "RECTANGLE";
export const CIRCULAR_CAROUSEL_TYPE = "CIRCULAR";
export const NYT_DOMAIN = "https://www.nytimes.com/";
export const NEWS_SOURCES_FILTER = [
  { name: "All Sources", value: "" },
  { name: "BBC", value: "bbc" },
  { name: "NY Times", value: "nytimes" },
  { name: "CNN", value: "cnn" },
  { name: "Times of India", value: "timesofindia" },
  { name: "Reuters", value: "reuters" },
  { name: "The Guardian", value: "theguardian" },
];
export const NEWS_CATEGORIES_FILTER = [
  { id: 1, name: "All Categories", logo: "world" },
  { id: 2, name: "Technology", logo: "Technology" },
  { id: 3, name: "Health", logo: "Health" },
  { id: 4, name: "Top", logo: "Top" },
  { id: 5, name: "Entertainment", logo: "Entertainment" },
  { id: 6, name: "Business", logo: "Business" },
  { id: 7, name: "Sports", logo: "Sports" },
  { id: 8, name: "Lifestyle", logo: "Lifestyle" },
];
export const SOURCES_LOGOS = [
  { id: 1, name: "BBC", logo: "/images/bbclogo.jpg" },
  { id: 2, name: "NY Times", logo: "/images/nytimeslogo.png" },
  { id: 3, name: "CNN", logo: "/images/cnnlogo.png" },
  { id: 4, name: "The Guardian", logo: "/images/theguardianlogo.png" },
  { id: 5, name: "Reuters", logo: "/images/reuterslogo.webp" },
  { id: 6, name: "Times of India", logo: "/images/toilogo.jpg" },
];
export const FALLBACK_CAROUSEL = [
  {
    id: 1,
    title: "Breaking News: Market Hits Record Highs",
    imageUrl: "/images/newsportal.webp",
    description: "Stock markets around the world surged today...",
    url: "",
  },
  {
    id: 2,
    title: "Technology Advances in 2025",
    imageUrl: "/images/newsportal.webp",
    description: "AI and automation are reshaping industries...",
    url: "",
  },
  {
    id: 3,
    title: "Travel Trends This Year",
    imageUrl: "/images/newsportal.webp",
    description: "More people are seeking adventure in remote places...",
    url: "",
  },
  {
    id: 4,
    title: "Sports: Champions League Final Results",
    imageUrl: "/images/newsportal.webp",
    description: "An intense match ended in a dramatic victory...",
    url: "",
  },
];
export const NAV_DROPDOWN_DATA = [
  {
    title: "Sources",
    items: NEWS_SOURCES_FILTER.slice(1),
  },
  {
    title: "Categories",
    items: NEWS_CATEGORIES_FILTER.slice(1),
  },
  // {
  //   title: "Authors",
  //   items: ["Walter Cronkite", "Christiane Amanpour", "Bob Woodward"],
  // }
];
export const NAV_ITEM = { Personalized: NAV_DROPDOWN_DATA };
