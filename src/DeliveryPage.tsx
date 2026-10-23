import { ArrowUpRight } from "lucide-react";
import "./delivery-page.css";

type DeliveryFaq = {
  question: string;
  answer: string;
  steps?: string[];
};

const deliveryFaqs: DeliveryFaq[] = [
  {
    question: "How do I order Starbucks® Delivers?",
    answer: "To get started, place your order through the GrabFood, foodpanda, or Pick.A.Roo app.",
  },
  {
    question: "Can I get the full menu from my local Starbucks store delivered?",
    answer: "To maintain the high standards of quality and consistency you expect, we’ve optimized our menu for delivery. As a result, select food and beverage items are currently unavailable for delivery.",
  },
  {
    question: "Can I pay for delivery with my Starbucks Card or the Starbucks® app?",
    answer: "Paying for delivery with a Starbucks Card or the Starbucks® app isn’t supported at this time. Please use GrabFood, foodpanda, or Pick.A.Roo to place your delivery order.",
  },
  {
    question: "Will I earn Stars when I order through Starbucks® Delivers?",
    answer: "Starbucks Rewards members can earn 1 Star for every ₱40 spent on Starbucks orders through GrabFood. Link your Starbucks Rewards account to your Grab account to start collecting Stars. To link your accounts for the first time:",
    steps: [
      "Open the Food tile in the Grab app and search for Starbucks to place an order.",
      "After your order, open the Loyalty and Membership section on the Order Summary page. Select Add Account and enter your Starbucks Rewards login details.",
      "Once you receive confirmation that your accounts are linked, you’ll collect Stars on paid and completed GrabFood deliveries. You won’t need to link your accounts again for future orders.",
    ],
  },
  {
    question: "Is Starbucks® Delivers available near me?",
    answer: "To check delivery availability, enter your location in the GrabFood, foodpanda, or Pick.A.Roo app.",
  },
  {
    question: "What should I do if I have an issue with my delivery?",
    answer: "Please contact GrabFood, foodpanda, or Pick.A.Roo customer service for help with your delivery.",
  },
];

const deliveryPartners = [
  { name: "GrabFood", image: "/assets/delivery/grabfood.png" },
  { name: "foodpanda", image: "/assets/delivery/foodpanda.png" },
  { name: "Pick.A.Roo", image: "/assets/delivery/pickaroo.jpeg" },
];

export default function DeliveryPage() {
  return (
    <div className="delivery-page-content">
      <section className="delivery-options-section" id="delivery-options" aria-labelledby="delivery-options-heading">
        <div className="delivery-options-copy">
          <p className="section-kicker">Delivery options</p>
          <h2 id="delivery-options-heading">Starbucks® Coffee Delivered to Your Doorstep</h2>
          <p>
            Find out if delivery is available near you through our partners’ apps. Start your day and order to get your Starbucks® favourites delivered to you via GrabFood, foodpanda, and Pick.A.Roo.
          </p>
        </div>
        <div className="delivery-partner-grid" aria-label="Starbucks delivery partners">
          {deliveryPartners.map((partner) => (
            <figure className="delivery-partner-card" key={partner.name}>
              <img src={partner.image} alt="" loading="lazy" />
              <figcaption>{partner.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="faq-section delivery-faq-section" aria-labelledby="delivery-faq-heading">
        <p className="section-kicker">Need a hand?</p>
        <h2 id="delivery-faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list delivery-faq-list">
          {deliveryFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
              {faq.steps && (
                <ol>
                  {faq.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
            </details>
          ))}
        </div>
        <p className="delivery-footer-note">
          Delivery areas, menus, fees, and availability are managed by each delivery partner and may vary by location.
        </p>
        <a className="delivery-menu-link" href="/menu">
          Explore the menu <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
