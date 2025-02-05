import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  CIRCULAR_CAROUSEL_TYPE,
  FALLBACK_CAROUSEL,
  RECTANGLE_CAROUSEL_TYPE,
} from "../constants";

import "swiper/css";
import "swiper/css/navigation";
import "./Carousel.css";
import "./Carousel2.css";

interface Article {
  id?: number;
  title: string;
  description?: string;
  imageUrl?: string;
  name?: string;
  value?: string;
  logo?: string;
  url: string;
}

interface Circular {
  id: number;
  name: string;
  logo: string;
}

interface NewsCarouselProps {
  version: string;
  articles?: Article[];
  data?: Circular[];
  heading?: string;
  noImage?: boolean;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
};

// Rectangular News Carousel
const RectangularCarousel: React.FC<{ articles: Article[] }> = React.memo(({ articles }) => {
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
        {articles.map(
          (article) =>
            article.imageUrl && (
              <SwiperSlide key={article.id} style={{ background: `url(${article.imageUrl})` }}>
                <Link to={article.url} className="slide-link">
                  <div className="slide">
                    <div className="overlay"></div>
                    <div className="slide-content">
                      <h2>{truncateText(article.title, 100)}</h2>
                      {article.description && <p>{truncateText(article.description, 100)}</p>}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
});

// Circular Sources Carousel
const CircularCarousel: React.FC<{ data: Circular[]; heading?: string; noImage?:boolean }> = React.memo(
  ({ data = [], heading, noImage }) => {
    return data.length ? (
      <div className="sources-carousel">
        {heading && <h2 className="carousel-heading">{heading}</h2>}
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
          {data.map((source, index) => (
            <SwiperSlide key={source.id || index} style={{ width: "auto" }}>
              <Link to={`/${heading?.toLowerCase()}/${encodeURIComponent(source.name?.toLowerCase() || "")}`} className="source-slide">
                {!noImage 
                  ? source.logo && <img src={source.logo} alt={`Source: ${source.name}`} className="source-logo" />
                  : <div className="source-logo no-image"><p>{source.name}</p></div>
                 }
                <p className="source-name">{source.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ): null;
  }
);

// Main NewsCarousel Component
const NewsCarousel: React.FC<NewsCarouselProps> = ({ version, articles = FALLBACK_CAROUSEL, data, heading, noImage}) => {
  // Ensure articles are always passed as a valid array
  const validArticles = articles && Array.isArray(articles) ? articles : FALLBACK_CAROUSEL;
  const validData = data && Array.isArray(data) ? data : [];

  if (version === RECTANGLE_CAROUSEL_TYPE) {
    return <RectangularCarousel articles={validArticles} />;
  }
  if (version === CIRCULAR_CAROUSEL_TYPE) {
    return <CircularCarousel data={validData} heading={heading} noImage={noImage}/>;
  }
  return null;
};

export default React.memo(NewsCarousel);
