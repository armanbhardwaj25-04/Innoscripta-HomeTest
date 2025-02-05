import React, { useEffect, useState } from "react";
import NewsCarousel from "./Carousel";
import { fetchCarouselArticles } from "../services/api";
import {
  CATEGORIES_HEADING,
  CIRCULAR_CAROUSEL_TYPE,
  FALLBACK_CAROUSEL,
  NEWS_CATEGORIES_FILTER,
  RECTANGLE_CAROUSEL_TYPE,
  SOURCES_HEADING,
  SOURCES_LOGOS,
} from "../constants";

import "./Content.css";

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  url: string;
}

const Home: React.FC = () => {
  const [carouselData, setCarouselData] =
    useState<Article[]>(FALLBACK_CAROUSEL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Article[] = await fetchCarouselArticles(); // Ensured type safety
        setCarouselData(data.length > 0 ? data : FALLBACK_CAROUSEL);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        setCarouselData(FALLBACK_CAROUSEL);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contentWrapper">
      {/* Rectangle Carousel */}
      <NewsCarousel version={RECTANGLE_CAROUSEL_TYPE} articles={carouselData} />

      {/* Circular Carousels */}
      <NewsCarousel
        version={CIRCULAR_CAROUSEL_TYPE}
        data={SOURCES_LOGOS}
        heading={SOURCES_HEADING}
      />
      <NewsCarousel
        version={CIRCULAR_CAROUSEL_TYPE}
        data={NEWS_CATEGORIES_FILTER}
        heading={CATEGORIES_HEADING}
        noImage={true}
      />
    </div>
  );
};

export default Home;
