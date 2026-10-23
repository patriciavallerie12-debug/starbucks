import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, MapPin, Search } from "lucide-react";
import DeliveryPage from "./DeliveryPage";
import AboutUsPage from "./AboutUsPage";
import OrderPage from "./OrderPage";
import SocialImpactPage from "./SocialImpactPage";
import MenuPage from "./MenuPage";
import MerchandisePage from "./MerchandisePage";
import PromotionsPage from "./PromotionsPage";
import RewardsPage from "./RewardsPage";

type LocalLink = { label: string; href: string };
type PageKind = "menu" | "merchandise" | "rewards" | "promos" | "stores" | "delivery" | "signin" | "join" | "faq" | "sitemap" | "info";
type PageDefinition = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  kind: PageKind;
  links?: LocalLink[];
  steps?: { title: string; body: string }[];
};

const pageDefinitions: Record<string, PageDefinition> = {
  "/menu": {
    title: "Menu",
    eyebrow: "Find your favorite",
    description: "Explore seasonal drinks, coffeehouse classics, and bites for every part of your day.",
    image: "/assets/cozy-cup.jpg",
    kind: "menu",
  },
  "/merchandise": {
    title: "Merchandise",
    eyebrow: "Collect a little joy",
    description: "Discover the seasonal collection and the everyday pieces made for your coffee ritual.",
    image: "/assets/moon-cake.jpg",
    kind: "merchandise",
  },
  "/rewards": {
    title: "Starbucks® Rewards",
    eyebrow: "More choices, more rewards",
    description: "Explore the new 50-, 100-, and 150-Star reward tiers in the Starbucks PH app.",
    image: "/assets/rewards/mtr-banner-wtext-live.jpg",
    kind: "rewards",
  },
  "/stores": {
    title: "Find a Store",
    eyebrow: "Your next coffee is closer than you think",
    description: "Search 538 Starbucks Philippines store listings, view a selected location on the map, and get directions with Google Maps.",
    image: "/assets/hero.jpg",
    kind: "stores",
  },
  "/sign-in": {
    title: "Sign in",
    eyebrow: "Welcome back",
    description: "Access your Starbucks Rewards account.",
    image: "/assets/cozy-cup.jpg",
    kind: "signin",
  },
  "/join": {
    title: "Join Starbucks Rewards",
    eyebrow: "Good things are waiting",
    description: "Create an account to start enjoying your Starbucks Rewards experience.",
    image: "/assets/moon-cake.jpg",
    kind: "join",
  },
  "/about-us": {
    title: "Our Company",
    eyebrow: "About Starbucks Philippines",
    description: "We believe a cup of coffee can create connection. Get to know the people, coffee, and communities behind Starbucks in the Philippines.",
    image: "/assets/hero.jpg",
    kind: "info",
    links: [
      { label: "Stories and News", href: "/stories" },
      { label: "Social Impact", href: "/social-impact" },
      { label: "Find a Store", href: "/stores" },
    ],
  },
  "/stories": {
    title: "Stories and News",
    eyebrow: "A little more to discover",
    description: "Read about the coffee, people, and moments that bring Starbucks communities together.",
    image: "/assets/fall-bites.jpg",
    kind: "info",
    links: [
      { label: "Explore the Menu", href: "/menu" },
      { label: "Current Promotions", href: "/promos" },
      { label: "Our Company", href: "/about-us" },
    ],
  },
  "/customer-service": {
    title: "Customer Service",
    eyebrow: "We're here to help",
    description: "Find quick answers about orders, stores, Starbucks Rewards, and your Starbucks experience.",
    image: "/assets/cozy-cup.jpg",
    kind: "info",
    links: [
      { label: "Frequently Asked Questions", href: "/faqs" },
      { label: "Find a Store", href: "/stores" },
      { label: "Order on the App", href: "/order" },
    ],
  },
  "/careers": {
    title: "Careers",
    eyebrow: "Make every day a little more meaningful",
    description: "Explore what it means to be part of a coffeehouse team built around craft, connection, and care.",
    image: "/assets/hero.jpg",
    kind: "info",
    links: [
      { label: "Our Company", href: "/about-us" },
      { label: "Social Impact", href: "/social-impact" },
      { label: "Customer Service", href: "/customer-service" },
    ],
  },
  "/order": {
    title: "Order on the App",
    eyebrow: "Mobile Order & Pay",
    description: "Order ahead, customize a favorite, and pick it up at a participating Starbucks store in the Philippines.",
    image: "/assets/cozy-cup.jpg",
    kind: "info",
    steps: [
      { title: "Sign in", body: "Use your Starbucks Rewards account to access Mobile Order & Pay." },
      { title: "Choose your order", body: "Browse drinks and food, then make your selections in the app." },
      { title: "Pick up", body: "Choose a participating store and collect your order when it is ready." },
    ],
    links: [
      { label: "Browse the Menu", href: "/menu" },
      { label: "Find a Store", href: "/stores" },
      { label: "Sign in", href: "/sign-in" },
    ],
  },
  "/delivery": {
    title: "Starbucks® Delivers",
    eyebrow: "",
    description: "Your Starbucks® run just got easier.",
    image: "/assets/fall-bites.jpg",
    kind: "delivery",
  },
  "/send-egifts": {
    title: "Send eGifts",
    eyebrow: "Share a coffee moment",
    description: "Send a thoughtful Starbucks eGift to celebrate, say thanks, or brighten someone's day.",
    image: "/assets/moon-cake.jpg",
    kind: "info",
    links: [
      { label: "Sign in to your account", href: "/sign-in" },
      { label: "Join Starbucks Rewards", href: "/join" },
      { label: "Explore Promotions", href: "/promos" },
    ],
  },
  "/grab": {
    title: "Delivery Partners",
    eyebrow: "Starbucks, your way",
    description: "Find Starbucks delivery options in your area. Availability, delivery fees, and menus are set by each service and location.",
    image: "/assets/hero.jpg",
    kind: "info",
    links: [
      { label: "Browse the Menu", href: "/menu" },
      { label: "Find a Store", href: "/stores" },
      { label: "Order on the App", href: "/order" },
    ],
  },
  "/account": {
    title: "My Account",
    eyebrow: "Your Starbucks Rewards account",
    description: "Sign in to review your account options.",
    image: "/assets/cozy-cup.jpg",
    kind: "signin",
  },
  "/transactions": {
    title: "View Transactions",
    eyebrow: "Your account activity",
    description: "Sign in to review your Starbucks Rewards account activity.",
    image: "/assets/hero.jpg",
    kind: "signin",
  },
  "/reload": {
    title: "Reload",
    eyebrow: "Keep your Starbucks Card ready",
    description: "Sign in to see your Starbucks Card options.",
    image: "/assets/moon-cake.jpg",
    kind: "signin",
  },
  "/faqs": {
    title: "Frequently Asked Questions",
    eyebrow: "Quick answers",
    description: "A few helpful answers about ordering, stores, and Starbucks Rewards.",
    image: "/assets/cozy-cup.jpg",
    kind: "faq",
  },
  "/social-impact": {
    title: "Social Impact",
    eyebrow: "Good matters",
    description: "We believe in creating positive connections with our partners, customers, and communities.",
    image: "/assets/moon-cake.jpg",
    kind: "info",
    links: [
      { label: "Our Company", href: "/about-us" },
      { label: "Stories and News", href: "/stories" },
      { label: "Find a Store", href: "/stores" },
    ],
  },
  "/promos": {
    title: "Promotions",
    eyebrow: "Promos and announcements",
    description: "Never miss a beat, or a drink.",
    image: "/assets/hero.jpg",
    kind: "promos",
  },
  "/accessibility": {
    title: "Web Accessibility",
    eyebrow: "A better experience for everyone",
    description: "This local preview is designed to work on mobile and desktop, with keyboard-friendly controls and clear focus states.",
    image: "/assets/hero.jpg",
    kind: "info",
    links: [
      { label: "Customer Service", href: "/customer-service" },
      { label: "Frequently Asked Questions", href: "/faqs" },
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Your privacy matters",
    description: "Cookie preferences for this local preview are stored only in your browser. This recreation does not send form or account data to Starbucks.",
    image: "/assets/cozy-cup.jpg",
    kind: "info",
    links: [
      { label: "Customer Service", href: "/customer-service" },
      { label: "Site Map", href: "/sitemap" },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    eyebrow: "Using this preview",
    description: "This is a local website recreation for browsing and demonstration. It is not connected to Starbucks account, ordering, or payment services.",
    image: "/assets/hero.jpg",
    kind: "info",
    links: [
      { label: "Browse the Menu", href: "/menu" },
      { label: "Customer Service", href: "/customer-service" },
    ],
  },
  "/sitemap": {
    title: "Site Map",
    eyebrow: "Explore Starbucks Philippines",
    description: "Use these links to move around the pages included in this local website preview.",
    image: "/assets/moon-cake.jpg",
    kind: "sitemap",
  },
};

type StoreRecord = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  hours: Record<string, string>;
  amenities: string[];
};

const storeWeekdays = [
  ["Monday", "mon"],
  ["Tuesday", "tue"],
  ["Wednesday", "wed"],
  ["Thursday", "thu"],
  ["Friday", "fri"],
  ["Saturday", "sat"],
  ["Sunday", "sun"],
] as const;

function PageAction({ href, children }: { href: string; children: string }) {
  return (
    <a className="pill-button pill-button--green" href={href}>
      {children} <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function StoreLocator() {
  const [stores, setStores] = useState<StoreRecord[]>([]);
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const [storesLoadError, setStoresLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("./stores.json")
      .then(({ default: data }) => {
        if (cancelled) return;
        setStores(data.stores);
        setSelectedStoreId(data.stores[0]?.id ?? "");
        setIsStoresLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setStoresLoadError(true);
        setIsStoresLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleStores = stores.filter((store) =>
    `${store.name} ${store.address}`.toLocaleLowerCase().includes(normalizedQuery),
  );
  const selectedStore = visibleStores.find((store) => store.id === selectedStoreId) ?? visibleStores[0];
  const mapQuery = selectedStore
    ? `${selectedStore.latitude},${selectedStore.longitude}`
    : `Starbucks ${query.trim() || "Philippines"}`;
  const mapEmbedUrl = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(mapQuery)}&z=${selectedStore ? 16 : 6}&output=embed`;
  const googleMapsSearchUrl = selectedStore
    ? `https://www.google.com/maps/search/?api=1&query=${selectedStore.latitude},${selectedStore.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Starbucks ${query.trim() || "Philippines"}`)}`;
  const directionsUrl = selectedStore
    ? `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitude},${selectedStore.longitude}`
    : googleMapsSearchUrl;

  const findNearestStore = () => {
    if (isStoresLoading || stores.length === 0) {
      setLocationStatus("Store locations are still loading. Please try again in a moment.");
      return;
    }
    if (!navigator.geolocation) {
      setLocationStatus("Location services are not available in this browser. Search by store, city, or address instead.");
      return;
    }
    setIsLocating(true);
    setLocationStatus("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const nearestStore = stores.reduce((nearest, store) => {
          const latDelta = toRadians(store.latitude - coords.latitude);
          const lngDelta = toRadians(store.longitude - coords.longitude);
          const a =
            Math.sin(latDelta / 2) ** 2 +
            Math.cos(toRadians(coords.latitude)) *
              Math.cos(toRadians(store.latitude)) *
              Math.sin(lngDelta / 2) ** 2;
          const distance = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return distance < nearest.distance ? { store, distance } : nearest;
        }, { store: stores[0], distance: Number.POSITIVE_INFINITY });
        setQuery("");
        setSelectedStoreId(nearestStore.store.id);
        setLocationStatus(`Nearest listed store: ${nearestStore.store.name} · ${nearestStore.distance.toFixed(1)} km away.`);
        setIsLocating(false);
      },
      (error) => {
        setLocationStatus(
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. Search by store, city, or address instead."
            : "We could not determine your location. Search by store, city, or address instead.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 12000 },
    );
  };

  return (
    <section className="store-locator" aria-label="Starbucks Philippines store locator">
      <div className="store-search-panel">
        <label className="catalog-search store-search">
          <Search size={18} aria-hidden="true" />
          <span className="visually-hidden">Search Starbucks locations</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setLocationStatus("");
            }}
            placeholder="Search by store, city, or address"
          />
        </label>
        <button
          className="store-locate-button"
          type="button"
          onClick={findNearestStore}
          disabled={isLocating || isStoresLoading || storesLoadError}
        >
          <MapPin size={16} aria-hidden="true" />
          {isStoresLoading ? "Loading locations…" : storesLoadError ? "Locations unavailable" : isLocating ? "Finding nearby stores…" : "Use my location"}
        </button>
        {locationStatus && <p className="store-location-status" role="status">{locationStatus}</p>}
        <p className="store-count">
          {isStoresLoading
            ? "Loading Starbucks Philippines store listings…"
            : storesLoadError
              ? "Store listings are temporarily unavailable."
              : `Showing ${visibleStores.length.toLocaleString()} of ${stores.length.toLocaleString()} Starbucks Philippines locations`}
        </p>
        <div className="store-result-list">
          {visibleStores.map((store) => (
            <button
              type="button"
              className={`store-result${selectedStore?.id === store.id ? " is-selected" : ""}`}
              key={store.id}
              onClick={() => {
                setSelectedStoreId(store.id);
                setLocationStatus("");
              }}
            >
              <span className="store-result-icon"><MapPin size={17} aria-hidden="true" /></span>
              <span className="store-result-copy">
                <strong>{store.name}</strong>
                <small>{store.address}</small>
                {store.amenities.length > 0 && <small className="store-result-amenities">{store.amenities.join(" · ")}</small>}
              </span>
              <ArrowUpRight className="store-result-arrow" size={16} aria-hidden="true" />
            </button>
          ))}
          {!isStoresLoading && (storesLoadError || visibleStores.length === 0) && (
            <p className="empty-state">
              {storesLoadError
                ? "Store listings could not be loaded. Please refresh the page to try again."
                : `No Starbucks locations match “${query}”. Try another store, city, or address.`}
            </p>
          )}
          {isStoresLoading && <p className="empty-state">Loading store locations…</p>}
        </div>
      </div>
      <aside className="store-detail-panel" aria-label="Selected store on Google Maps">
        <div className="store-map-frame">
          <iframe
            key={selectedStore?.id ?? `query-${query}`}
            src={mapEmbedUrl}
            title={selectedStore ? `Map showing Starbucks ${selectedStore.name}` : `Google Maps search for Starbucks ${query || "Philippines"}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="store-detail-copy" aria-live="polite">
          {selectedStore ? (
            <>
              <p className="section-kicker">Selected Starbucks location</p>
              <h2>{selectedStore.name}</h2>
              <address>{selectedStore.address}</address>
              {selectedStore.amenities.length > 0 && (
                <ul className="store-amenity-list">
                  {selectedStore.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}
                </ul>
              )}
              <div className="store-detail-actions">
                <a className="store-map-link" href={googleMapsSearchUrl} target="_blank" rel="noreferrer">
                  View in Google Maps <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a className="store-directions-link" href={directionsUrl} target="_blank" rel="noreferrer">
                  Get directions <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              {selectedStore.phone && (
                <a className="store-phone-link" href={`tel:${selectedStore.phone.replace(/[^+\d]/g, "")}`}>
                  {selectedStore.phone}
                </a>
              )}
              <details className="store-hours">
                <summary><span><Clock3 size={17} aria-hidden="true" /> Store hours</span><span className="store-hours-toggle">View hours</span></summary>
                <dl>
                  {storeWeekdays.map(([day, key]) => (
                    <div key={key}><dt>{day}</dt><dd>{selectedStore.hours[key] || "Hours unavailable"}</dd></div>
                  ))}
                </dl>
              </details>
              <p className="store-preview-note">Directory snapshot from Oct 16, 2026, sourced from the Starbucks Philippines Store Locator. Hours may change; Google Maps opens for live navigation.</p>
            </>
          ) : isStoresLoading ? (
            <>
              <p className="section-kicker">Google Maps</p>
              <h2>Loading store locations…</h2>
              <p>The map and store listings will appear in a moment.</p>
            </>
          ) : storesLoadError ? (
            <>
              <p className="section-kicker">Google Maps</p>
              <h2>Locations unavailable</h2>
              <p>We couldn’t load the store list. Please refresh the page and try again.</p>
            </>
          ) : (
            <>
              <p className="section-kicker">Google Maps</p>
              <h2>No matching store found</h2>
              <p>We couldn’t match that search to a listed Starbucks location. Try a nearby city or open the search in Google Maps.</p>
              <a className="store-map-link" href={googleMapsSearchUrl} target="_blank" rel="noreferrer">
                Search Google Maps <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </>
          )}
        </div>
      </aside>
    </section>
  );
}

function AccountForm({ join }: { join: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="account-area" aria-label={join ? "Join Starbucks Rewards" : "Sign in to Starbucks Rewards"}>
      <div className="account-card">
        <div className="demo-notice">
          <span className="demo-dot" aria-hidden="true" />
          Demo form — no real account connection
        </div>
        <p className="section-kicker">Starbucks Rewards</p>
        <h2>{join ? "Create your account" : "Sign in to your account"}</h2>
        <p className="account-intro">
          {join
            ? "Start your Starbucks Rewards journey with a few details."
            : "Enter your account details to continue."}
        </p>
        <form onSubmit={onSubmit}>
          {join && (
            <label className="form-field">
              <span>Full name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
          )}
          <label className="form-field">
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input name="password" type="password" autoComplete={join ? "new-password" : "current-password"} required />
          </label>
          {join && (
            <label className="form-consent">
              <input type="checkbox" required />
              <span>I agree to the local preview terms.</span>
            </label>
          )}
          <button className="pill-button pill-button--dark account-submit" type="submit">
            {join ? "Create account" : "Sign in"}
          </button>
        </form>
        {submitted && (
          <p className="form-feedback" role="status">
            This preview is not connected to Starbucks accounts, so no account details were sent or saved.
          </p>
        )}
        <p className="form-disclaimer">Demo only — do not enter a real password or payment details.</p>
        <p className="account-switch">
          {join ? "Already a member?" : "New to Starbucks Rewards?"}{" "}
          <a href={join ? "/sign-in" : "/join"}>{join ? "Sign in" : "Join now"}</a>
        </p>
      </div>
    </section>
  );
}

function FAQPage() {
  const faqs = [
    {
      question: "How can I order ahead?",
      answer: "Starbucks Philippines offers Mobile Order & Pay through its app for eligible Rewards members. See the Order on the App page for a quick overview.",
    },
    {
      question: "Where can I find a Starbucks store?",
      answer: "Search the Starbucks Philippines store listings by store name, city, or address. Select a location to view its map, hours, and Google Maps directions.",
    },
    {
      question: "Can I use the account form in this preview?",
      answer: "No. The sign-in and join forms are visual demos only and are not connected to Starbucks account services.",
    },
  ];
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <p className="section-kicker">Need a hand?</p>
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="faq-actions">
        <PageAction href="/stores">Find a Store</PageAction>
        <PageAction href="/order">Order on the App</PageAction>
      </div>
    </section>
  );
}

function InfoPage({ page }: { page: PageDefinition }) {
  const links = page.links ?? [
    { label: "Browse the Menu", href: "/menu" },
    { label: "Find a Store", href: "/stores" },
    { label: "Explore Rewards", href: "/rewards" },
  ];

  return (
    <section className="info-page-section">
      {page.steps && (
        <div className="step-grid">
          {page.steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      )}
      <div className="info-panel">
        <div className="info-panel-copy">
          <p className="section-kicker">Keep exploring</p>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          <div className="local-link-grid">
            {links.map((link) => (
              <a className="local-link-card" href={link.href} key={`${link.label}-${link.href}`}>
                <span>{link.label}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <img src={page.image} alt="" loading="lazy" />
      </div>
    </section>
  );
}

function SitemapPage() {
  const pages = Object.entries(pageDefinitions).map(([href, page]) => ({ href, title: page.title }));
  return (
    <section className="sitemap-grid" aria-label="Local website pages">
      {pages.map((page) => (
        <a className="local-link-card" href={page.href} key={page.href}>
          <span>{page.title}</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      ))}
    </section>
  );
}

const localPolicyPathAliases: Record<string, string> = {
  "/onlinepolicies/corp_web_accessibility": "/accessibility",
  "/onlinepolicies/corp_privacy_policy": "/privacy-policy",
  "/onlinepolicies/corp_terms_of_use": "/terms",
};

export function LocalDestinationPage({ path }: { path: string }) {
  if (path === "/about-us") return <AboutUsPage />;
  if (path === "/order") return <OrderPage />;
  if (path === "/social-impact") return <SocialImpactPage />;

  const localPagePath = localPolicyPathAliases[path] ?? path;
  const page = pageDefinitions[localPagePath] ?? {
    title: "Page not found",
    eyebrow: "Starbucks Philippines",
    description: "We couldn't find that page in this local preview. Head back home or choose a section from the navigation.",
    image: "/assets/hero.jpg",
    kind: "info" as const,
    links: [{ label: "Back to Home", href: "/home" }],
  };

  if (page.kind === "menu") return <MenuPage />;
  if (page.kind === "merchandise") return <MerchandisePage />;
  if (page.kind === "rewards") return <RewardsPage />;
  if (page.kind === "promos") return <PromotionsPage />;

  return (
    <main className="destination-page" id="top">
      <section
        className="destination-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(18 61 49 / 78%), rgb(18 61 49 / 10%)), url("${page.image}")` }}
      >
        <div className="destination-hero-inner">
          {page.eyebrow && <p>{page.eyebrow}</p>}
          <h1>{page.title}</h1>
          <span>{page.description}</span>
          {page.kind === "delivery" && (
            <a className="delivery-hero-link" href="#delivery-options">
              Browse delivery options <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </section>
      <div className="destination-content-width">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/home">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.title}</span>
        </nav>
        {page.kind === "stores" && <StoreLocator />}
        {page.kind === "delivery" && <DeliveryPage />}
        {page.kind === "signin" && <AccountForm join={false} />}
        {page.kind === "join" && <AccountForm join />}
        {page.kind === "faq" && <FAQPage />}
        {page.kind === "sitemap" && <SitemapPage />}
        {page.kind === "info" && <InfoPage page={page} />}
        <div className="destination-back-link">
          <a className="text-action" href="/home">← Back to Home</a>
        </div>
      </div>
    </main>
  );
}
