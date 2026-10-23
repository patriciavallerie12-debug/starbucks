import orderFaqs from "./orderFaqs.json";
import "./order-page.css";

const orderSteps = [
  {
    title: "Login",
    body: "Register to Starbucks® Rewards or login to your account if you’re already a member. You’ll need a Starbucks® Rewards account to use Mobile Order & Pay.",
    image: "/assets/order/step-login.png",
    alt: "Starbucks PH app home screen with Rewards and an order-ahead banner",
  },
  {
    title: "Order",
    body: "Tap ORDER to choose and customize your favorite beverage and food then select the nearest store and pickup option.",
    image: "/assets/order/step-order.png",
    alt: "Starbucks PH order screen with a customized Caffè Latte and selected pickup store",
  },
  {
    title: "Pay",
    body: "Pay using your Starbucks® Rewards account and collect Stars on all mobile orders.",
    image: "/assets/order/step-pay.png",
    alt: "Starbucks PH app confirmation showing a ready mobile order and pickup details",
  },
  {
    title: "Pick-up",
    body: "Register to Starbucks® Rewards or log in to your account if you’re already a member. You’ll need a Starbucks® Rewards account to use Mobile Order & Pay.",
    image: "/assets/order/step-pickup.jpeg",
    alt: "A customer holding a phone displaying a Caffè Latte order in the Starbucks app",
  },
];

export default function OrderPage() {
  return (
    <main className="order-page" id="order-top">
      <section className="order-hero" aria-labelledby="order-hero-title">
        <div className="order-hero-shade" aria-hidden="true" />
        <div className="order-hero-inner">
          <div className="order-hero-copy">
            <h1 id="order-hero-title">Mobile Order &amp; Pay</h1>
            <p>No time? Download the Starbucks PH app and order ahead.</p>
            <div className="order-app-badges" aria-label="Download the Starbucks Philippines app">
              <a
                href="https://apps.apple.com/ph/app/starbucks-philippines/id1363216428"
                target="_blank"
                rel="noreferrer"
                aria-label="Download Starbucks Philippines on the App Store"
              >
                <img src="/assets/order/app-store-badge.png" alt="Download on the App Store" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.starbucks.ph"
                target="_blank"
                rel="noreferrer"
                aria-label="Get Starbucks Philippines on Google Play"
              >
                <img src="/assets/order/google-play-badge.png" alt="Get it on Google Play" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="order-intro" aria-label="Mobile Order and Pay introduction">
        <div className="order-content-width">
          <p>
            As a Starbucks Rewards member, you can now place an order and pay ahead with Mobile Order &amp; Pay.
            That means you can walk in and without waiting in line, ask a barista for your freshly made drink
            at the pickup area. You’ll also collect Stars on all mobile orders!
          </p>
        </div>
      </section>

      <section className="order-steps" aria-label="How Mobile Order and Pay works">
        {orderSteps.map((step, index) => (
          <article
            className={`order-step-row${index % 2 === 1 ? " order-step-row--reverse" : ""}`}
            key={step.title}
          >
            <div className="order-step-copy">
              <div className="order-step-copy-inner">
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </div>
            </div>
            <figure className="order-step-image">
              <img src={step.image} alt={step.alt} loading="lazy" />
            </figure>
          </article>
        ))}
      </section>

      <section className="order-faq-section" aria-labelledby="order-faq-title">
        <div className="order-content-width">
          <h2 id="order-faq-title">Frequently Asked Questions</h2>
          <div className="faq-list order-faq-list">
            {orderFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="order-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
