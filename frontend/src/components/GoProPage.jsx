import React from "react";
import "./GoProPage.css";

const FEATURES = [
  "AI insights that flag unusual spending before it snowballs",
  "Unlimited PDF & Excel exports, no watermarks",
  "Custom budget categories across multiple accounts",
  "Priority support — real replies within a few hours",
];

const GoProPage = () => (
  <div className="gopro-page">
    <div className="gopro-container">
      <div className="gopro-hero">
        <span className="gopro-eyebrow">FinAI Pro</span>
        <h1 className="gopro-headline">
          Your money deserves{" "}
          <span className="gopro-highlight">a second opinion.</span>
        </h1>
        <p className="gopro-subtext">
          Free tracks what you spend. Pro tells you what to do about it — before
          the month gets away from you.
        </p>
      </div>

      <div className="gopro-grid">
        {/* Pricing Card */}
        <div className="gopro-price-card">
          <div className="gopro-price-row">
            <span className="gopro-price">₹199</span>
            <span className="gopro-price-period">/ month</span>
          </div>
          <p className="gopro-trial">7-day free trial · cancel anytime</p>

          <ul className="gopro-features">
            {FEATURES.map((feature, index) => (
              <li key={index}>
                <span className="gopro-check">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button className="gopro-cta">Start free trial</button>
          <p className="gopro-fineprint">No card needed to start.</p>
        </div>

        {/* Live Insight Preview Card — signature element */}
        <div className="gopro-preview-card">
          <div className="gopro-preview-tag">Live preview</div>

          <div className="gopro-preview-header">
            <span className="gopro-preview-dot" />
            AI Insight
          </div>

          <p className="gopro-preview-text">
            You're spending 23% more on dining out this month than your 3-month
            average. Trim ₹1,200 from weekend orders to land back under budget.
          </p>

          <div className="gopro-preview-bar">
            <div className="gopro-preview-fill" />
          </div>
          <span className="gopro-preview-caption">
            Dining · 78% of category budget used
          </span>
        </div>
      </div>

      <div className="gopro-trust">
        <span>Secure payments</span>
        <span className="gopro-dot">·</span>
        <span>Cancel anytime</span>
        <span className="gopro-dot">·</span>
        <span>10,000+ users tracking smarter</span>
      </div>
    </div>
  </div>
);

export default GoProPage;
