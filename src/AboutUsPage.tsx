import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import "./about-us-page.css";

const milestones = [
  {
    year: "1971",
    title: "A single store in Seattle",
    body: "Starbucks opens in Pike Place Market, bringing freshly roasted whole-bean coffee to its first customers.",
  },
  {
    year: "1981",
    title: "A first visit",
    body: "Howard Schultz walks into Starbucks for the first time. A year later, he joins the company.",
  },
  {
    year: "1983",
    title: "A coffeehouse vision",
    body: "A trip to Italy inspires a new way to bring people together over coffee.",
  },
  {
    year: "1987",
    title: "The story grows",
    body: "With local investors, Schultz acquires Starbucks and brings that coffeehouse vision to life.",
  },
];

const principles = [
  {
    title: "Our Coffee",
    image: "/assets/about/our-coffee.jpg",
    alt: "A coffee grower tending ripe coffee cherries on a farm",
    body: "It begins with quality. We seek to source the finest coffee, roast it with care, and keep improving the lives of the people who grow it.",
  },
  {
    title: "Our Partners",
    image: "/assets/about/our-stores.jpg",
    alt: "Colleagues greeting one another with a handshake",
    body: "We call one another partners. We work to create an inclusive place where people can be themselves and treat one another with dignity.",
  },
  {
    title: "Our Customers",
    image: "/assets/about/our-shareholders.jpg",
    alt: "A Starbucks partner handing a coffee to a customer at a drive-through",
    body: "Every visit is an opportunity to welcome someone, share a favorite, and make a coffee moment feel personal.",
  },
  {
    title: "Our Stores",
    image: "/assets/about/our-partners.jpg",
    alt: "A Starbucks drive-through coffeehouse beneath a bright blue sky",
    body: "Our coffeehouses are places to pause, connect, and feel at home—a third place between work and home.",
  },
  {
    title: "Our Neighborhood",
    image: "/assets/about/our-neighborhood.jpg",
    alt: "Green coffee-growing hills surrounded by mountains",
    body: "Every store is part of a community. We aim to be good neighbors and bring people together for positive action.",
  },
  {
    title: "Our Shareholders",
    image: "/assets/about/our-customers.jpg",
    alt: "Community members sharing a conversation over coffee",
    body: "We are accountable for building a business that can endure and thrive while supporting the people and communities it touches.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="about-us-page" id="about-top">
      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="about-mission-inner">
          <div className="about-mission-copy">
            <p className="about-eyebrow">About Starbucks Philippines</p>
            <p className="about-overline">Our mission</p>
            <h1 id="about-mission-title">
              With every cup,<br />
              with every conversation,<br />
              with every community—
              <span>we nurture the limitless possibilities of human connection.</span>
            </h1>
            <p className="about-mission-description">
              Great coffee is where our story begins. The moments, conversations, and connections
              shared around it are what make it meaningful.
            </p>
            <div className="about-mission-actions">
              <a className="about-scroll-link" href="#starbucks-story">
                Discover our story <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="about-official-link" href="https://starbucks.ph/about-us" target="_blank" rel="noreferrer">
                View official About Us page <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="about-mission-visual">
            <div className="about-mission-image-frame">
              <img
                src="/assets/about/story-pike-place.jpg"
                alt="Inside a Starbucks coffeehouse, with warm wood, coffee displays, and a shared counter"
              />
            </div>
            <figcaption>A place to pause, connect, and share a coffee.</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-story-section" id="starbucks-story" aria-labelledby="about-story-title">
        <div className="about-content-width">
          <header className="about-section-heading">
            <p className="about-eyebrow">Our beginnings</p>
            <h2 id="about-story-title">The Starbucks Story</h2>
            <p>
              To say we buy and roast high-quality coffee is true—but it hardly tells the whole story.
              It is also a story about a coffeehouse, a sense of community, and the people who make it.
            </p>
          </header>

          <div className="about-story-layout">
            <figure className="about-story-photo">
              <img
                src="/assets/about/more-than-coffee.jpg"
                alt="A historic Starbucks storefront at Pike Place Market in Seattle"
                loading="lazy"
              />
              <figcaption>It began with a single store and a love of well-crafted coffee.</figcaption>
            </figure>
            <ol className="about-timeline" aria-label="Milestones in Starbucks history">
              {milestones.map((milestone) => (
                <li className="about-timeline-item" key={milestone.year}>
                  <span className="about-timeline-year">{milestone.year}</span>
                  <div className="about-timeline-copy">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="about-philippines-section" aria-labelledby="about-ph-title">
        <div className="about-philippines-inner">
          <figure className="about-philippines-photo">
            <img
              src="/assets/about/philippines-first-store.jpeg"
              alt="A Starbucks partner holding a cup in a warm coffeehouse"
              loading="lazy"
            />
          </figure>
          <div className="about-philippines-copy">
            <p className="about-eyebrow">Since December 4, 1997</p>
            <h2 id="about-ph-title">Starbucks in the Philippines</h2>
            <p>
              The Philippines welcomed its first Starbucks at 6750 Ayala Building in Makati City.
              That opening marked a milestone: the Philippines became Starbucks’ third market outside
              North America.
            </p>
            <p>
              A tradition of warm hospitality, a love of coffee, and a desire to connect continue to
              shape the Starbucks experience here.
            </p>
            <a className="about-text-link" href="/stores">
              <MapPin size={17} aria-hidden="true" /> Find a Starbucks near you
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="about-beyond-section" aria-labelledby="about-beyond-title">
        <div className="about-content-width about-beyond-inner">
          <div className="about-beyond-copy">
            <p className="about-eyebrow">More than just coffee</p>
            <h2 id="about-beyond-title">A little more connection in every day.</h2>
            <p>
              From the first cup of the morning to an unhurried conversation with a friend, we want
              every Starbucks moment to feel welcoming, thoughtful, and full of possibility.
            </p>
            <a className="about-text-link" href="/menu">
              Explore the menu <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <figure className="about-beyond-photo">
            <img
              src="/assets/about/our-customers.jpg"
              alt="People sharing a conversation and coffee in a colorful community space"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="about-principles-section" aria-labelledby="about-principles-title">
        <div className="about-content-width">
          <header className="about-section-heading about-section-heading--center">
            <p className="about-eyebrow">Our mission in action</p>
            <h2 id="about-principles-title">What guides us</h2>
            <p>These principles shape how we source, serve, and show up for one another.</p>
          </header>
          <div className="about-principles-grid">
            {principles.map((principle) => (
              <article className="about-principle-card" key={principle.title}>
                <div className="about-principle-image">
                  <img src={principle.image} alt={principle.alt} loading="lazy" />
                </div>
                <div className="about-principle-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-store-callout" aria-labelledby="about-store-title">
        <div className="about-store-callout-inner">
          <div>
            <p className="about-eyebrow">Your next coffee moment</p>
            <h2 id="about-store-title">Find your neighborhood Starbucks.</h2>
          </div>
          <a className="about-store-button" href="/stores">
            Find a store <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
