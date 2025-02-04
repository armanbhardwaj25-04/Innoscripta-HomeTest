import React, { useEffect, useState } from "react";
import NewsCarousel from "./Carousel";
import { fetchCarouselArticles } from "../services/api";
import { CIRCULAR_CAROUSEL_TYPE, FALLBACK_CAROUSEL, RECTANGLE_CAROUSEL_TYPE } from "../constants/index.js";
import "./Content.css";

// Define article structure
interface Article {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

const Home: React.FC = () => {
  const [carouselData, setCarouselData] = useState<Article[]>(FALLBACK_CAROUSEL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCarouselArticles();
        setCarouselData(data.length > 0 ? data : FALLBACK_CAROUSEL); // Ensures fallback is used if API returns empty
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        setCarouselData(FALLBACK_CAROUSEL); // Use fallback on error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contentWrapper">
      {/* Rectangle Carousel */}
      <NewsCarousel version={RECTANGLE_CAROUSEL_TYPE} articles={carouselData} />

      {/* Circular Carousel */}
      <NewsCarousel version={CIRCULAR_CAROUSEL_TYPE} />
    </div>
  );
};

export default Home;
