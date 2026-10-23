import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pageIntroSelectors = [
  ".hero-copy",
  ".destination-hero-inner",
  ".menu-page-header",
  ".merchandise-page-header",
  ".promotions-hero-copy",
  ".order-hero-copy",
  ".impact-hero-copy",
  ".about-mission-copy",
  ".about-mission-visual",
  ".rewards-sticky-inner",
  ".cookie-dialog",
];

const revealSelectors = [
  ".seasonal-section-heading",
  ".feature-card",
  ".campaign-card",
  ".store-callout",
  ".breadcrumbs",
  ".about-section-heading",
  ".about-story-photo",
  ".about-philippines-copy",
  ".about-beyond-copy",
  ".about-store-callout-inner",
  ".impact-featured-lead",
  ".impact-articles-heading",
  ".order-intro",
  ".order-faq-section > .order-content-width > h2",
  ".store-search-panel",
  ".store-detail-panel",
  ".account-card",
  ".faq-section > .section-kicker",
  ".faq-section > h2",
  ".faq-actions",
  ".step-card",
  ".info-panel",
  ".sitemap-grid > .local-link-card",
  ".menu-overview-section > h2",
  ".menu-category-section > h3",
  ".merchandise-collection > h2",
  ".rewards-section-heading",
  ".rewards-faq-item",
  ".promotions-section-header",
  ".promotions-rewards-cta",
  ".footer-group",
  ".social-row",
  ".legal-row",
];

const staggerGridSelectors = [
  ".menu-overview-grid",
  ".menu-product-grid",
  ".merchandise-product-grid",
  ".rewards-tier-grid",
  ".rewards-carryover-grid",
  ".redemption-step-grid",
  ".campaign-grid",
  ".promotions-grid",
  ".about-timeline",
  ".about-principles-grid",
  ".impact-featured-grid",
  ".impact-article-grid--desktop",
  ".impact-article-grid--mobile",
  ".order-steps",
];

function animateModal(node: HTMLElement) {
  gsap.fromTo(
    node,
    { autoAlpha: 0, y: 18, scale: 0.985 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out", clearProps: "transform,opacity,visibility" },
  );
}

export function useGsapPageAnimations(route: string) {
  useLayoutEffect(() => {
    const root = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const faqListeners: Array<{ item: HTMLDetailsElement; handler: EventListener }> = [];
    const context = gsap.context(() => {
      const header = document.querySelector<HTMLElement>(".site-header");
      if (header) {
        gsap.fromTo(
          header,
          { y: -14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out", clearProps: "transform,opacity,visibility" },
        );
      }

      pageIntroSelectors.forEach((selector) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, root);
        elements.forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              delay: Math.min(index * 0.045, 0.15),
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            },
          );
        });
      });

      revealSelectors.forEach((selector) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, root);
        elements.forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.66,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: element,
                start: "top 89%",
                once: true,
              },
            },
          );
        });
      });

      staggerGridSelectors.forEach((selector) => {
        const grids = gsap.utils.toArray<HTMLElement>(selector, root);
        grids.forEach((grid) => {
          const children = Array.from(grid.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
          if (!children.length) return;
          const stagger = Math.min(0.075, 0.36 / Math.max(children.length, 1));
          gsap.fromTo(
            children,
            { autoAlpha: 0, y: 20, scale: 0.985 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.58,
              stagger,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: grid,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });

      const parallaxImages = gsap.utils.toArray<HTMLElement>(
        ".promotions-hero-image > img, .feature-image",
        root,
      );
      parallaxImages.forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -2 },
          {
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement ?? image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.45,
            },
          },
        );
      });

      const faqItems = gsap.utils.toArray<HTMLDetailsElement>(".rewards-faq-item, .faq-list details", root);
      faqItems.forEach((item) => {
        const handler: EventListener = () => {
          if (!item.open) return;
          const answer = item.querySelector<HTMLElement>("p");
          if (!answer) return;
          gsap.fromTo(answer, { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out", clearProps: "transform,opacity,visibility" });
        };
        item.addEventListener("toggle", handler);
        faqListeners.push({ item, handler });
      });

      ScrollTrigger.refresh();
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    const observer = new MutationObserver((mutations) => {
      const dynamicCards: HTMLElement[] = [];
      const dynamicPanels: HTMLElement[] = [];
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const cardSelector = ".promotion-card, .menu-product-card, .merchandise-product-card";
          const panelSelector = ".menu-product-modal, .merchandise-product-modal, .menu-no-results, .merchandise-no-results, .form-feedback";
          if (node.matches(cardSelector)) dynamicCards.push(node);
          if (node.matches(panelSelector)) dynamicPanels.push(node);
          dynamicCards.push(...Array.from(node.querySelectorAll<HTMLElement>(cardSelector)));
          dynamicPanels.push(...Array.from(node.querySelectorAll<HTMLElement>(panelSelector)));
        });
      });
      if (dynamicCards.length) {
        gsap.fromTo(
          dynamicCards,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.035, ease: "power2.out", clearProps: "transform,opacity,visibility" },
        );
      }
      dynamicPanels.forEach(animateModal);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshOnLoad, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("load", refreshOnLoad);
      faqListeners.forEach(({ item, handler }) => item.removeEventListener("toggle", handler));
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [route]);
}
