import React from "react";
import "./ArticleCard.css";
import { ArticleSkeletons } from "./SkeletonLoader";
import NoArticleFound from "./NoArticleFound";

// Define the Article structure
interface Article {
  title?: string;
  abstract?: string;
  link?: string;
  web_url?: string;
  source_name?: string;
  source?: { name?: string };
  description?: string;
  lead_paragraph?: string;
  image_url?: string;
  urlToImage?: string;
  multimedia?: { url?: string }[];
}

// Props Interface
interface ArticleCardProps {
  articles: Article[];
  isLoading: boolean;
  error: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  articles,
  isLoading,
  error,
}) => {
  if (isLoading) return <ArticleSkeletons />;

  return articles.length > 0 ? (
    <div className="article-grid">
      {articles.map((article, index) => {
        const title = article.title || article.abstract || "Untitled";
        const link = article.link || article.web_url || "#";
        const badge =
          article.source_name || article?.source?.name || "Unknown Source";
        const description =
          article.description ||
          article.lead_paragraph ||
          "No description available.";
        const imageUrl =
          article.image_url ||
          article?.urlToImage ||
          article?.multimedia?.[0]?.url;

        return imageUrl ? (
          <a
            href={link}
            key={index}
            className="article-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            {badge && <span className="article-card__badge">{badge}</span>}
            <img
              src={imageUrl}
              alt={title}
              className="article-card__image"
              loading="lazy"
            />
            <div className="article-card__content">
              <h3 className="article-card__title">{title}</h3>
              {description && (
                <p className="article-card__description">{`${description.slice(0, 100)}...`}</p>
              )}
              <p className="article-card__read-more">Read More</p>
            </div>
          </a>
        ) : null;
      })}
    </div>
  ) : (
    <NoArticleFound error={error} />
  );
};

export default React.memo(ArticleCard);
