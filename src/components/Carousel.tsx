import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  CIRCULAR_CAROUSEL_TYPE,
  FALLBACK_CAROUSEL,
  RECTANGLE_CAROUSEL_TYPE,
  SOURCES_HEADING,
  SOURCES_LOGOS,
} from "../constants";

import "swiper/css";
import "swiper/css/navigation";
import "./Carousel.css";
import "./Carousel2.css";

interface Article {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
}

interface NewsCarouselProps {
  version: string;
  articles?:Array<Article>; 
}

// Rectangular News Carousel
const RectangularCarousel: React.FC<{ articles: Array<Article> }> = React.memo(({ articles }) => {
  if (!articles || articles.length === 0) return null;
  
  return (
    <div className="news-carousel">
      <Swiper
        modules={[Navigation, Autoplay]}
        lazyPreloadPrevNext={2}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2500, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        className="swiper-container"
      >
        {articles.map((article) =>
          article.imageUrl ? (
            <SwiperSlide key={article.id} style={{background: `url(${article.imageUrl})`}}>
              <div className="slide">
                <div className="overlay"></div>
                <div className="slide-content">
                  <h2>{`${article.title.slice(0, 100)}...`}</h2>
                  {article.description && <p>{`${article.description.slice(0, 100)}...`}</p>}
                </div>
              </div>
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
});

// Circular Sources Carousel
const CircularCarousel: React.FC = React.memo(() => {
  return (
    <div className="sources-carousel">
      <h2 className="carousel-heading">{SOURCES_HEADING}</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={6}
        navigation
        loop
        breakpoints={{
          180: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
        className="swiper-container"
      >
        {SOURCES_LOGOS.map((source) => (
          <SwiperSlide key={source.id} style={{width: "auto",}}>
            <Link to={`/sources/${source.name.toLowerCase()}`} className="source-slide">
              <img
                src={source.logo}
                alt={`Source: ${source.name}`}
                className="source-logo"
              />
              <p className="source-name">{source.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

// Main NewsCarousel Component
const NewsCarousel: React.FC<NewsCarouselProps> = ({ version, articles = FALLBACK_CAROUSEL }) => {
  // Ensure articles are always passed as a valid array (Article[])
  const validArticles = articles && Array.isArray(articles) ? articles : FALLBACK_CAROUSEL;

  if (version === RECTANGLE_CAROUSEL_TYPE) {
    return <RectangularCarousel articles={validArticles} />;
  }
  if (version === CIRCULAR_CAROUSEL_TYPE) {
    return <CircularCarousel />;
  }
  return null;
};

export default React.memo(NewsCarousel);
