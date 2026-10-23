import { ArrowUpRight } from "lucide-react";
import rewardsFaqs from "./rewardsFaq.json";
import "./rewards-page.css";

const asset = (file: string) => `/assets/rewards/${file}`;

const rewardTiers = [
  {
    stars: 50,
    starImage: "star-50.png",
    productImage: "50Star-EspressoShot.png",
    title: "Drink Customization",
    note: "Except Breve and 2oz Heavy Cream",
    alt: "A Starbucks espresso shot",
  },
  {
    stars: 50,
    starImage: "star-50.png",
    productImage: "50Star-Bagel_etc.png",
    title: "Bagel, doughnut, or banana loaf",
    note: "Choose a bagel, glazed or chocolate-dipped doughnut, or banana loaf",
    alt: "A selection of Starbucks bakery items",
  },
  {
    stars: 100,
    starImage: "star-100.png",
    productImage: "100-handcrafteddrink_etc.png",
    title: "Handcrafted drink or bakery",
    note: "Any handcrafted drink or bakery item",
    alt: "A Starbucks handcrafted drink and bakery item",
  },
  {
    stars: 150,
    starImage: "star-150.png",
    productImage: "150-Sandwiches_etc.png",
    title: "Pasta, sandwich, or cake slice",
    note: "Choose any pasta, sandwich, or cake slice",
    alt: "Starbucks pasta, sandwiches, and cake",
  },
];

const whatStays = [
  {
    icon: "star.svg",
    title: "How you earn",
    description: "Still 1 Star for every ₱25 spent in store with your registered card.",
  },
  {
    icon: "calendar.svg",
    title: "Your Stars and dates",
    description: "Your Star balance carries over. Your anniversary date stays the same.",
  },
  {
    icon: "gift.svg",
    title: "Your perks",
    description: "Birthday treat and Double Star Days aren't going anywhere.",
  },
  {
    icon: "shopping-bag.svg",
    title: "Grab and Lazada",
    description: "Keep earning 1 Star for every ₱40 on linked delivery and e-commerce orders.",
  },
];

const redemptionSteps = [
  {
    image: "RewardsRedemptionFlow01.jpg",
    title: "Open Rewards",
    description: "Open the Starbucks PH app, log in, then tap Rewards.",
  },
  {
    image: "RewardsRedemptionFlow02.jpg",
    title: "Choose a reward",
    description: "Browse rewards and tap Use on the one you want.",
  },
  {
    image: "RewardsRedemptionFlow03.jpg",
    title: "Confirm",
    description: "Tap Continue to unlock the reward with your Stars.",
  },
  {
    image: "RewardsRedemptionFlow04.jpg",
    title: "Unlock your voucher",
    description: "Your new reward voucher appears under Available Rewards.",
  },
  {
    image: "RewardsRedemptionFlow05.jpg",
    title: "Show it in store",
    description: "View your vouchers anytime in Your Available Rewards.",
  },
];

function RewardsPage() {
  return (
    <main className="rewards-landing" id="top">
      <div className="rewards-sticky-bar">
        <div className="rewards-sticky-inner">
          <h1>Starbucks® Rewards</h1>
          <a className="rewards-join-link" href="#download-app">
            Join in the app <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <a className="rewards-hero-link" href="#reward-tiers" aria-label="Discover more choices and rewards">
        <picture>
          <source media="(max-width: 650px)" srcSet={asset("mtr-banner-mobile-wtext-live.jpg")} />
          <img
            className="rewards-hero-image"
            src={asset("mtr-banner-wtext-live.jpg")}
            alt="Now available: More choices, more rewards. Download the new Starbucks PH app."
          />
        </picture>
      </a>

      <section className="rewards-tier-section" id="reward-tiers">
        <div className="rewards-page-width">
          <header className="rewards-section-heading">
            <p className="rewards-kicker">Now in the new Starbucks PH app</p>
            <h2>New ways to use your Stars</h2>
          </header>
          <div className="rewards-tier-grid">
            {rewardTiers.map((tier, index) => (
              <a
                className="rewards-tier-card"
                href="#rewards-faq"
                key={`${tier.stars}-${tier.title}`}
                aria-label={`${tier.stars} Stars: ${tier.title}. Read rewards FAQs.`}
              >
                <img className="tier-star-image" src={asset(tier.starImage)} alt={`${tier.stars} Stars`} />
                <img className="tier-product-image" src={asset(tier.productImage)} alt={tier.alt} loading="lazy" />
                <h3>{tier.title}</h3>
                <p>{tier.note}</p>
                <span className="tier-card-number">0{index + 1}</span>
              </a>
            ))}
          </div>
          <p className="reward-footnote">Reward availability and exclusions apply. See the FAQs below for details.</p>
          <img className="reward-star-divider" src={asset("star-separator.png")} alt="" loading="lazy" />
        </div>
      </section>

      <section className="rewards-carryover-section" id="what-stays">
        <div className="rewards-page-width">
          <header className="rewards-section-heading rewards-section-heading--compact">
            <p className="rewards-kicker">The familiar things stay</p>
            <h2>Some things aren't changing</h2>
            <p>Your Stars, your dates, your perks—all carrying over to the new program.</p>
          </header>
          <div className="rewards-carryover-grid">
            {whatStays.map((item) => (
              <article className="carryover-card" key={item.title}>
                <span className="carryover-icon-wrap">
                  <img src={asset(item.icon)} alt="" loading="lazy" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <img className="reward-star-divider" src={asset("star-separator.png")} alt="" loading="lazy" />
        </div>
      </section>

      <section className="rewards-redemption-section" id="redeem">
        <div className="rewards-page-width">
          <header className="rewards-section-heading rewards-section-heading--compact">
            <p className="rewards-kicker">Redeeming is easy</p>
            <h2>Choose your reward in the app</h2>
            <p>Pick your reward before placing your order in store.</p>
          </header>
          <div className="redemption-step-grid">
            {redemptionSteps.map((step, index) => (
              <article className="redemption-step" key={step.title}>
                <div className="redemption-image-wrap">
                  <img src={asset(step.image)} alt={`Starbucks PH app redemption flow, step ${index + 1}`} loading="lazy" />
                </div>
                <p className="redemption-step-label">Step {index + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rewards-faq-section" id="rewards-faq">
        <div className="rewards-page-width rewards-faq-width">
          <header className="rewards-section-heading rewards-section-heading--faq">
            <p className="rewards-kicker">A little more clarity</p>
            <h2>Frequently Asked Questions</h2>
          </header>
          <div className="rewards-faq-list">
            {rewardsFaqs.map((faq, index) => (
              <details className="rewards-faq-item" key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
                {index === 1 && (
                  <a className="rewards-inline-link" href="#reward-tiers">Review the reward tiers</a>
                )}
              </details>
            ))}
          </div>
          <div className="rewards-support-note">
            <div>
              <h3>More questions?</h3>
              <p>If you can't find what you're looking for, our customer service team can help.</p>
            </div>
            <a className="rewards-support-link" href="/customer-service">
              Get in touch <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="rewards-terms">
            <strong>Terms of Use</strong> — For full details on Stars and the Starbucks® Rewards program, read the terms of use{" "}
            <a href="/terms">here</a>. DTI Fair Trade Permit No. FTEB-177222 Series of 2023.
          </p>
        </div>
      </section>

      <section className="rewards-download-section" id="download-app">
        <a className="rewards-download-link" href="/join" aria-label="Join Starbucks Rewards in the app">
          <picture>
            <source media="(max-width: 650px)" srcSet={asset("bottom-banner-inverse-mobile.jpg")} />
            <img src={asset("bottom-banner-full-with-text-qr.jpg")} alt="Download the new Starbucks PH app" loading="lazy" />
          </picture>
        </a>
      </section>
    </main>
  );
}

export default RewardsPage;
