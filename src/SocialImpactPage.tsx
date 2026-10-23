import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import socialImpactData from "./socialImpactData.json";
import "./social-impact-page.css";

const articlesPerPage = 3;
const storyUrl = (id: string) => `https://starbucks.ph/story/${id}`;

export default function SocialImpactPage() {
  const [activePage, setActivePage] = useState(0);
  const pageCount = Math.ceil(socialImpactData.articles.length / articlesPerPage);
  const visibleArticles = socialImpactData.articles.slice(
    activePage * articlesPerPage,
    (activePage + 1) * articlesPerPage,
  );
  const [leadFeature, ...secondaryFeatures] = socialImpactData.features;

  return (
    <main className="social-impact-page">
      <section
        className="impact-hero"
        style={{ backgroundImage: `url("${socialImpactData.hero.heroImage}")` }}
        aria-labelledby="impact-hero-title"
      >
        <div className="impact-hero-shade" aria-hidden="true" />
        <div className="impact-hero-inner">
          <div className="impact-hero-copy">
            <h1 id="impact-hero-title">{socialImpactData.hero.title}</h1>
            <p>{socialImpactData.hero.description}</p>
            <a className="impact-hero-cta" href="#feature">
              {socialImpactData.hero.cta}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="impact-featured impact-content-width" id="feature" aria-label="Featured articles">
        <article className="impact-featured-lead">
          <a className="impact-featured-image" href={storyUrl(leadFeature.id)} target="_blank" rel="noreferrer" aria-label={`Read ${leadFeature.title}`}>
            <img src={leadFeature.image} alt="" loading="lazy" />
          </a>
          <div className="impact-featured-copy">
            <h2>{leadFeature.title}</h2>
            <p>{leadFeature.description}</p>
            <a className="impact-read-more" href={storyUrl(leadFeature.id)} target="_blank" rel="noreferrer">
              Read more <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </article>

        <div className="impact-featured-grid">
          {secondaryFeatures.map((feature) => (
            <article className="impact-featured-card" key={feature.id}>
              <a className="impact-featured-card-image" href={storyUrl(feature.id)} target="_blank" rel="noreferrer" aria-label={`Read ${feature.title}`}>
                <img src={feature.image} alt="" loading="lazy" />
              </a>
              <div className="impact-featured-card-copy">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <a className="impact-read-more" href={storyUrl(feature.id)} target="_blank" rel="noreferrer">
                  Read more <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-articles-section" id="articles" aria-labelledby="impact-articles-title">
        <div className="impact-content-width">
          <div className="impact-articles-heading">
            <h2 id="impact-articles-title">Articles</h2>
            <div className="impact-article-controls" aria-label="Article carousel controls">
              <button
                type="button"
                onClick={() => setActivePage((page) => Math.max(0, page - 1))}
                disabled={activePage === 0}
                aria-label="Previous articles"
              >
                <ArrowLeft size={19} aria-hidden="true" />
              </button>
              <span aria-live="polite">{activePage + 1} / {pageCount}</span>
              <button
                type="button"
                onClick={() => setActivePage((page) => Math.min(pageCount - 1, page + 1))}
                disabled={activePage === pageCount - 1}
                aria-label="Next articles"
              >
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="impact-article-grid impact-article-grid--desktop" aria-live="polite">
            {visibleArticles.map((article) => (
              <article className="impact-article-card" key={article.id}>
                <a className="impact-article-image" href={storyUrl(article.id)} target="_blank" rel="noreferrer" aria-label={`Read ${article.title}`}>
                  <img src={article.image} alt="" loading="lazy" />
                </a>
                <div className="impact-article-copy">
                  <p className="impact-article-category">{article.category}</p>
                  <h3><a href={storyUrl(article.id)} target="_blank" rel="noreferrer">{article.title}</a></h3>
                  <p>{article.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="impact-article-grid impact-article-grid--mobile" aria-label="More articles; swipe to browse">
            {socialImpactData.articles.map((article) => (
              <article className="impact-article-card" key={`mobile-${article.id}`}>
                <a className="impact-article-image" href={storyUrl(article.id)} target="_blank" rel="noreferrer" aria-label={`Read ${article.title}`}>
                  <img src={article.image} alt="" loading="lazy" />
                </a>
                <div className="impact-article-copy">
                  <p className="impact-article-category">{article.category}</p>
                  <h3><a href={storyUrl(article.id)} target="_blank" rel="noreferrer">{article.title}</a></h3>
                  <p>{article.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
