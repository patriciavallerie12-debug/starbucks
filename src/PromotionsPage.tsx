import { useMemo, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import "./promotions-page.css";

type PromotionCategory = "Drinks" | "Food" | "Merchandise";
type Promotion = {
  id: string;
  category: PromotionCategory;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  action: string;
  href: string;
};

const promotions: Promotion[] = [
  {
    id: "bunny-mooncake",
    category: "Merchandise",
    eyebrow: "Collection spotlight",
    title: "The Bunny Mooncake Feast Collection",
    description: "A playful, collectible way to celebrate Mid-Autumn.",
    image: "/assets/moon-cake.jpg",
    alt: "Bunny Mooncake Fest tumblers and mug beneath a full moon",
    action: "Explore the collection",
    href: "/merchandise#merch-collection-2",
  },
  {
    id: "fall-bites",
    category: "Food",
    eyebrow: "Seasonal bites",
    title: "Fall Flavors, First Bite",
    description: "Hearty, satisfying eats for the season ahead.",
    image: "/assets/fall-bites.jpg",
    alt: "Seasonal cakes, pastries, sandwiches, and savory Starbucks bites",
    action: "Discover the menu",
    href: "/menu#menu-category-35",
  },
  {
    id: "cozy-cup",
    category: "Drinks",
    eyebrow: "Seasonal sips",
    title: "Cozy Up With Every Cup",
    description: "Autumn’s warmest flavors, sip by sip.",
    image: "/assets/cozy-cup.jpg",
    alt: "Two creamy Starbucks seasonal drinks in warm autumn light",
    action: "Explore featured drinks",
    href: "/menu#menu-category-1",
  },
];

const filters = ["All", "Drinks", "Food", "Merchandise"] as const;
type Filter = (typeof filters)[number];

export default function PromotionsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visiblePromotions = useMemo(
    () => activeFilter === "All"
      ? promotions
      : promotions.filter((promotion) => promotion.category === activeFilter),
    [activeFilter],
  );

  return (
    <main className="promotions-page" id="top">
      <div className="promotions-page-width">
        <section className="promotions-hero" aria-labelledby="promotions-title">
          <div className="promotions-hero-copy">
            <span className="promotions-eyebrow"><Sparkles size={15} aria-hidden="true" /> Promos and announcements</span>
            <h1 id="promotions-title">Never miss a beat, <em>or a drink</em> <span aria-hidden="true">😉</span></h1>
            <p>Seasonal favorites, new discoveries, and little moments worth sharing—find what’s happening at Starbucks Philippines.</p>
            <a className="promotions-primary-action" href="#latest-promotions">
              Explore what’s new <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <span className="promotions-hero-note">Fresh from the Starbucks PH home page</span>
          </div>
          <div className="promotions-hero-image">
            <img src="/assets/hero.jpg" alt="Creamy autumn Starbucks drinks against a warm seasonal backdrop" />
            <div className="promotions-image-badge"><span>IN SEASON</span><strong>Made for the moment</strong></div>
          </div>
        </section>

        <section className="promotions-list-section" id="latest-promotions" aria-labelledby="latest-promotions-title">
          <header className="promotions-section-header">
            <div>
              <p className="promotions-section-kicker">The latest</p>
              <h2 id="latest-promotions-title">A little something for the season</h2>
            </div>
            <p>Browse seasonal drinks, bites, and collections. Tap a card to continue to its local page.</p>
          </header>

          <div className="promotions-filter-row" role="group" aria-label="Filter promotions by category">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                key={filter}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="promotions-grid">
            {visiblePromotions.map((promotion) => (
              <article className="promotion-card" key={promotion.id}>
                <a className="promotion-image-link" href={promotion.href} aria-label={promotion.action}>
                  <img src={promotion.image} alt={promotion.alt} loading="lazy" />
                  <span className="promotion-category-tag">{promotion.category}</span>
                </a>
                <div className="promotion-card-copy">
                  <p className="promotion-card-eyebrow">{promotion.eyebrow}</p>
                  <h3><a href={promotion.href}>{promotion.title}</a></h3>
                  <p className="promotion-card-description">{promotion.description}</p>
                  <a className="promotion-card-action" href={promotion.href}>
                    {promotion.action} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="promotions-availability-note">Product selection and availability may vary by store. Campaign details are shown for this local preview.</p>
        </section>

        <section className="promotions-rewards-cta" aria-label="Starbucks Rewards">
          <div className="promotions-rewards-mark" aria-hidden="true">★</div>
          <div>
            <p className="promotions-section-kicker">A little more to look forward to</p>
            <h2>Make every visit count.</h2>
            <p>Discover new ways to use your Stars with Starbucks® Rewards.</p>
          </div>
          <a href="/rewards">Explore Rewards <ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
      </div>
    </main>
  );
}
