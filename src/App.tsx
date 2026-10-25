import { useEffect, useState } from "react";
import { LocalDestinationPage } from "./LocalPages";
import ThemeControl from "./ThemeControl";
import { useThemePreference, type ResolvedTheme, type ThemePreference } from "./useThemePreference";
import { useGsapPageAnimations } from "./useGsapPageAnimations";
import {
  ArrowUpRight,
  ChevronDown,
  Coffee,
  Download,
  Home as HomeIcon,
  MapPin,
  Menu as MenuIcon,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

const menuLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Rewards", href: "/rewards" },
  { label: "About Us", href: "/about-us" }
];

const footerGroups = [
  {
    title: "About Us",
    href: "/about-us",
    items: [
      { label: "Our Company", href: "/about-us" },
      { label: "Stories and News", href: "/stories" },
      { label: "Customer Service", href: "/customer-service" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Order Online",
    href: "/order",
    items: [
      { label: "Order on the App", href: "/order" },
      { label: "Delivery", href: "/delivery" },
      { label: "Send eGifts", href: "/send-egifts" },
      { label: "Grab Partnership", href: "/grab" },
    ],
  },
  {
    title: "Rewards",
    href: "/rewards",
    items: [
      { label: "My Account", href: "/account" },
      { label: "View Transactions", href: "/transactions" },
      { label: "Reload", href: "/reload" },
      { label: "FAQs", href: "/rewards#rewards-faq" },
    ],
  },
  {
    title: "Social Impact",
    href: "/social-impact",
    items: [],
  },
  {
    title: "Promotions",
    href: "/promos",
    items: [],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/StarbucksPhilippines",
    image: "/assets/facebook.svg",
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/starbucksph",
    image: "/assets/twitter.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/starbucksph",
    image: "/assets/instagram.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UColvYenSJ5Lc4cKrlb0Ajrw",
    image: "/assets/youtube.svg",
  },
];

function PhilippineRegionBadge() {
  return (
    <span className="philippine-region-badge" role="img" aria-label="Starbucks Philippines" title="Starbucks Philippines">
      <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false">
        <rect width="48" height="16" fill="#0038A8" />
        <rect y="16" width="48" height="16" fill="#CE1126" />
        <path d="M0 0 19 16 0 32Z" fill="#fff" />
        <g fill="#FCD116">
          <circle cx="6.6" cy="16" r="2.05" />
          <path d="M6.6 10.6 7.25 13.5 5.95 13.5ZM6.6 21.4 7.25 18.5 5.95 18.5ZM1.2 16 4.1 15.35 4.1 16.65ZM12 16 9.1 15.35 9.1 16.65ZM2.8 12.2 5.1 14.35 4.15 14.95ZM10.4 19.8 8.1 17.65 9.05 17.05ZM2.8 19.8 5.1 17.65 4.15 17.05ZM10.4 12.2 8.1 14.35 9.05 14.95Z" />
          <path d="m3.1 1.3.72 1.58 1.72.16-1.3 1.13.39 1.69L3.1 4.96 1.57 5.86l.39-1.69L.66 3.04l1.72-.16ZM3.1 26.14l1.53-.9-.39 1.69 1.3 1.13-1.72.16-.72 1.58-.72-1.58-1.72-.16 1.3-1.13-.39-1.69ZM14.8 13.1l.72 1.58 1.72.16-1.3 1.13.39 1.69-1.53-.9-1.53.9.39-1.69-1.3-1.13 1.72-.16Z" />
        </g>
      </svg>
    </span>
  );
}

type HeaderProps = {
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  onThemeChange: (preference: ThemePreference) => void;
};

function Header({ themePreference, resolvedTheme, onThemeChange }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activePath = window.location.pathname.replace(/\/+$/, "").toLowerCase() || "/";

  useEffect(() => {
    document.body.classList.toggle("drawer-is-open", drawerOpen);
    return () => document.body.classList.remove("drawer-is-open");
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-logo" href="/home" aria-label="Starbucks home">
          <img src="/assets/logo.svg" alt="Starbucks Coffee" />
        </a>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {menuLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              className={activePath === link.href ? "is-active" : undefined}
              aria-current={activePath === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className={`store-link${activePath === "/stores" ? " is-active" : ""}`} href="/stores" aria-current={activePath === "/stores" ? "page" : undefined}>
            <MapPin aria-hidden="true" size={17} strokeWidth={1.9} />
            <span>Find a Store</span>
          </a>
          <a className="pill-button pill-button--outline" href="/sign-in">
            Sign in
          </a>
          <a className="pill-button pill-button--dark" href="/join">
            Join Now
          </a>
        </div>

        <div className="header-control-group">
          <ThemeControl
            preference={themePreference}
            resolvedTheme={resolvedTheme}
            onChange={onThemeChange}
          />
          <PhilippineRegionBadge />
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {drawerOpen ? <X size={25} /> : <MenuIcon size={25} />}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="mobile-navigation-wrap" id="mobile-navigation">
          <button
            className="drawer-scrim"
            type="button"
            aria-label="Close navigation"
            onClick={closeDrawer}
          />
          <nav className="mobile-navigation" aria-label="Mobile navigation">
            <div className="mobile-sidebar-region"><PhilippineRegionBadge /></div>
            <div className="mobile-primary-links">
              {menuLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  onClick={closeDrawer}
                  className={activePath === link.href ? "is-active" : undefined}
                  aria-current={activePath === link.href ? "page" : undefined}
                >
                  {link.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="mobile-nav-divider" />
            <ThemeControl
              preference={themePreference}
              resolvedTheme={resolvedTheme}
              onChange={onThemeChange}
              placement="drawer"
            />
            <div className="mobile-nav-divider" />
            <a className="mobile-store-link" href="/stores" onClick={closeDrawer}>
              <MapPin size={18} aria-hidden="true" /> Find a Store
            </a>
            <div className="mobile-account-links">
              <a className="pill-button pill-button--outline" href="/sign-in">
                Sign in
              </a>
              <a className="pill-button pill-button--dark" href="/join">
                Join Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-banner" aria-label="Discover Starbucks seasonal flavors">
      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-eyebrow">Seasonal highlights</p>
          <h1>Cozy Up With Every Cup</h1>
          <p className="hero-description">Autumn’s warmest flavors, sip by sip</p>
          <a className="pill-button pill-button--hero" href="/menu">
            Discover the Flavors
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureCard() {
  return (
    <article className="feature-card" aria-labelledby="moon-cake-title">
      <div className="feature-image-wrap">
        <a className="feature-image-link" href="/merchandise" aria-label="Explore Starbucks merchandise">
          <img
            className="feature-image"
            src="/assets/moon-cake.jpg"
            alt="Starbucks seasonal tumblers and mug with playful bunny toppers beneath a full moon"
          />
        </a>
      </div>
      <div className="feature-copy">
        <p className="feature-eyebrow">Collection spotlight</p>
        <a className="feature-title-link" href="/merchandise">
          <h2 id="moon-cake-title">The Bunny Mooncake Feast Collection</h2>
        </a>
        <p>A playful, collectible way to celebrate Mid-Autumn</p>
        <a className="pill-button pill-button--green" href="/merchandise">
          Explore <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function CampaignCard({
  image,
  imageAlt,
  title,
  description,
  href,
  action,
  id,
  eyebrow,
}: {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  href?: string;
  action?: string;
  id: string;
  eyebrow?: string;
}) {
  return (
    <article className="campaign-card" aria-labelledby={id}>
      <div className="campaign-image-wrap">
        <a className="campaign-image-link" href={href ?? "/menu"} aria-label={`Explore ${title}`}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </a>
      </div>
      <div className="campaign-copy">
        {eyebrow && <p className="campaign-eyebrow">{eyebrow}</p>}
        <a className="campaign-title-link" href={href ?? "/menu"}>
          <h2 id={id}>{title}</h2>
        </a>
        <p>{description}</p>
        {href && action && (
          <a className="pill-button pill-button--green" href={href}>
            {action} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function SeasonalStories() {
  return (
    <main id="top">
      <Hero />
      <section className="seasonal-content" aria-label="Seasonal Starbucks collections">
        <div className="content-width">
          <div className="seasonal-section-heading">
            <div>
              <p className="section-kicker">What’s new</p>
              <h2>Good things are in season.</h2>
            </div>
            <p>From playful collectibles to comforting bites and sips, find a new favorite.</p>
          </div>
          <FeatureCard />
          <div className="campaign-grid">
            <CampaignCard
              id="fall-bites-title"
              image="/assets/fall-bites.jpg"
              imageAlt="A seasonal spread of cakes, sandwiches, pastries, and savory Starbucks bites"
              eyebrow="Seasonal bites"
              title="Fall Flavors, First Bite"
              description="Hearty, satisfying eats for the season ahead"
              action="Discover More"
              href="/menu"
            />
            <CampaignCard
              id="cozy-cup-title"
              image="/assets/cozy-cup.jpg"
              imageAlt="Two warm autumn drinks topped with whipped cream against a sunlit orange backdrop"
              eyebrow="Seasonal sips"
              title="Cozy Up With Every Cup"
              description="Autumn’s warmest flavors, sip by sip"
              href="/menu"
            />
          </div>
          <div className="store-callout">
            <div className="store-callout-icon"><MapPin size={23} aria-hidden="true" /></div>
            <div className="store-callout-copy">
              <p className="store-callout-eyebrow">Find your coffeehouse</p>
              <h2>Your next Starbucks moment is close.</h2>
              <p>Search nearby locations and plan your next coffee break.</p>
            </div>
            <a className="pill-button store-callout-button" href="/stores">
              Find a Store <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer({ onCookiePreferences }: { onCookiePreferences: () => void }) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-groups">
          {footerGroups.map((group) => {
            const expanded = expandedGroup === group.title;
            return (
              <section
                className={`footer-group${group.title === "Social Impact" ? " footer-group--social-impact" : ""}`}
                key={group.title}
              >
                {group.title === "Social Impact" ? (
                  <a className="footer-impact-link" href={group.href}>
                    <span>{group.title}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <div className="footer-group-heading">
                    {group.href ? (
                      <a className="footer-heading-link" href={group.href}>
                        {group.title}
                      </a>
                    ) : (
                      <h2>{group.title}</h2>
                    )}
                    {group.items.length > 0 && (
                      <button
                        className="footer-expand-button"
                        type="button"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${group.title}`}
                        aria-expanded={expanded}
                        onClick={() => setExpandedGroup(expanded ? null : group.title)}
                      >
                        <ChevronDown size={19} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}
                {group.items.length > 0 && (
                  <ul className={`footer-links${expanded ? " is-expanded" : ""}`}>
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
          <span className="footer-brand-word" aria-hidden="true">
            STARBUCKS®
          </span>
        </div>

        <div className="footer-rule" />

        <div className="social-row" aria-label="Starbucks Philippines social media">
          {socialLinks.map((social) => (
            <a href={social.href} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer">
              <img src={social.image} alt="" loading="lazy" />
            </a>
          ))}
        </div>

      </div>
      <div className="footer-legal-band">
        <div className="footer-legal-inner">
          <div className="legal-row">
            <nav className="legal-links" aria-label="Legal and policy links">
              <a href="/onlinepolicies/corp_web_accessibility">Web Accessibility</a>
              <a href="/onlinepolicies/corp_privacy_policy">Privacy Policy</a>
              <a href="/onlinepolicies/corp_terms_of_use">Terms of Use</a>
              <a href="/sitemap">Site Map</a>
              <button type="button" onClick={onCookiePreferences}>
                Cookie Preferences
              </button>
            </nav>
            <p className="copyright">© {currentYear} Starbucks Coffee Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const appTabs = [
  { label: "Home", href: "/home", Icon: HomeIcon },
  { label: "Menu", href: "/menu", Icon: Coffee },
  { label: "Merch", href: "/merchandise", Icon: ShoppingBag },
  { label: "Rewards", href: "/rewards", Icon: Star },
  { label: "Stores", href: "/stores", Icon: MapPin },
];

function MobileAppNavigation() {
  const activePath = window.location.pathname.replace(/\/+$/, "").toLowerCase() || "/";
  const homeIsActive = activePath === "/" || activePath === "/home";

  return (
    <nav className="app-bottom-nav" aria-label="Quick app navigation">
      {appTabs.map(({ label, href, Icon }) => {
        const active = label === "Home" ? homeIsActive : activePath === href;
        return (
          <a
            href={href}
            key={href}
            className={active ? "is-active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" />
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (isOnline) return null;
  return (
    <div className="offline-banner" role="status">
      You’re offline. Previously viewed pages and saved images may still be available.
    </div>
  );
}

function InstallAppPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIosInstall, setIsIosInstall] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.sessionStorage.getItem("sb-ph-pwa-prompt-dismissed") === "true";
    } catch {
      return false;
    }
  });
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

    setIsIosInstall(isIos && !isStandalone);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const hidePrompt = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem("sb-ph-pwa-prompt-dismissed", "true");
    } catch {
      // Keep the current visit tidy even when session storage is unavailable.
    }
  };

  const install = async () => {
    if (!installEvent) {
      setShowInstructions((show) => !show);
      return;
    }
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
    hidePrompt();
  };

  if (dismissed || installed || (!installEvent && !isIosInstall)) return null;

  return (
    <aside className="install-app-prompt" aria-label="Install Starbucks Philippines app">
      <button
        className="install-app-dismiss"
        type="button"
        aria-label="Dismiss install app suggestion"
        onClick={hidePrompt}
      >
        <X size={17} aria-hidden="true" />
      </button>
      <div className="install-app-icon"><img src="/icons/app-icon-192.png" alt="" /></div>
      <div className="install-app-copy">
        <p className="install-app-eyebrow">Take Starbucks with you</p>
        <p className="install-app-title">Add Starbucks PH to your home screen</p>
        {showInstructions && isIosInstall && (
          <p className="install-app-instructions">Tap Share, then choose “Add to Home Screen.”</p>
        )}
      </div>
      <button className="install-app-action" type="button" onClick={install}>
        {installEvent ? <Download size={16} aria-hidden="true" /> : null}
        {installEvent ? "Install" : showInstructions ? "Got it" : "How to add"}
      </button>
    </aside>
  );
}

function CookiePreferences({ onAgree }: { onAgree: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onAgree();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onAgree]);

  return (
    <div className="cookie-overlay">
      <section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        <button className="cookie-close" type="button" aria-label="Close cookie preferences" onClick={onAgree}>
          <X size={21} aria-hidden="true" />
        </button>
        <div className="cookie-copy">
          <p className="cookie-eyebrow">Starbucks Philippines</p>
          <h2 id="cookie-title">Cookie Preferences</h2>
          <p>
            This site uses cookies, but not the kind you eat. These cookies are used to collect
            information about how you interact with our website and allow us to remember you. We use
            this information to improve and customize your browsing experience and for analytics and
            metrics about our visitors both on this website and other media. To find out more about
            the cookies we use, see our Privacy Policy{" "}
            <a href="/privacy-policy">here</a>.
          </p>
          <div className="cookie-actions">
            <button className="pill-button pill-button--dark cookie-agree" type="button" onClick={onAgree}>
              I agree
            </button>
            <a
              className="privacy-seal-link"
              href="/privacy-policy"
              target="_blank"
              rel="noreferrer"
              aria-label="View National Privacy Commission registration"
            >
              <img src="/assets/privacy-seal.png" alt="National Privacy Commission registered" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [cookieOpen, setCookieOpen] = useState(() => {
    try {
      return window.localStorage.getItem("sb-ph-cookie-accepted") !== "true";
    } catch {
      return true;
    }
  });

  const { preference: themePreference, setPreference: setThemePreference, resolvedTheme } = useThemePreference();

  const acceptCookies = () => {
    try {
      window.localStorage.setItem("sb-ph-cookie-accepted", "true");
    } catch {
      // The preference still closes for this visit if storage is unavailable.
    }
    setCookieOpen(false);
  };
  const currentPath = window.location.pathname.replace(/\/+$/, "").toLowerCase() || "/";
  const isHome = currentPath === "/" || currentPath === "/home";
  useGsapPageAnimations(currentPath);

  useEffect(() => {
    document.title = currentPath === "/order"
      ? "Order on the App | Starbucks Coffee Company"
      : currentPath === "/rewards"
      ? "New Starbucks® Rewards — redeem from 50 Stars"
      : currentPath === "/menu"
        ? "Starbucks Menu | Starbucks Coffee Company"
        : currentPath === "/merchandise"
          ? "Starbucks Merchandise | Starbucks Coffee Company"
          : currentPath === "/social-impact"
            ? "Social Impact | Starbucks Coffee Company"
            : currentPath === "/promos"
              ? "Promos | Starbucks Coffee Company"
            : currentPath === "/onlinepolicies/corp_web_accessibility"
              ? "Web Accessibility | Starbucks Philippines"
              : currentPath === "/onlinepolicies/corp_privacy_policy"
                ? "Privacy Policy | Starbucks Philippines"
                : currentPath === "/onlinepolicies/corp_terms_of_use"
                  ? "Terms of Use | Starbucks Philippines"
                  : isHome
        ? "Home | Starbucks Coffee Company"
        : `${currentPath.slice(1).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())} | Starbucks Philippines`;
  }, [currentPath, isHome]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header
        themePreference={themePreference}
        resolvedTheme={resolvedTheme}
        onThemeChange={setThemePreference}
      />
      <NetworkStatus />
      <div id="main-content">
        {isHome ? <SeasonalStories /> : <LocalDestinationPage path={currentPath} />}
      </div>
      <Footer onCookiePreferences={() => setCookieOpen(true)} />
      <MobileAppNavigation />
      <InstallAppPrompt />
      {cookieOpen && <CookiePreferences onAgree={acceptCookies} />}
    </>
  );
}

export default App;
