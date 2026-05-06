import React, { useState, useEffect } from 'react';

const path = process.env.PUBLIC_URL;

function HeroPubs() {
  const [pubsOpen, setPubsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setPubsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      className={`hero-pubs${pubsOpen ? ' open' : ''}`}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="hero-pubs-trigger"
        onClick={() => setPubsOpen((prev) => !prev)}
      >
        <span>Related publications</span>
        <span className="hero-pubs-count">2</span>

        <svg
          className="hero-pubs-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className="hero-pubs-dropdown">
        <div className="hero-pubs-dropdown-header">
          <span className="hero-pubs-dropdown-label">2 publications</span>
        </div>

        <div className="hero-pubs-dropdown-grid">
          <a
            href="https://unctad.org/publication/strait-hormuz-disruptions-growth-and-financial-implications"
            className="pub-item"
            target="_blank"
            rel="noreferrer"
          >
            <div className="pub-item-cover cover-maritime">
              <span className="pub-item-badge">
                <span className="pub-item-dot" />
                Report
              </span>

              <img
                src={`${path}assets/img/strait-of-hormuz-april.png`}
                alt="Strait of Hormuz April 2026"
                className="pub-item-img"
              />
            </div>

            <div className="pub-item-title">
              Growth and financial implications
            </div>

            <div className="pub-item-meta">April 2026</div>
          </a>

          <a
            href="https://unctad.org/publication/strait-hormuz-disruptions-implications-global-trade-and-development"
            className="pub-item"
            target="_blank"
            rel="noreferrer"
          >
            <div className="pub-item-cover cover-trade">
              <span className="pub-item-badge">
                <span className="pub-item-dot" />
                Brief
              </span>

              <img
                src={`${path}assets/img/strait-of-hormuz-march.png`}
                alt="Strait of Hormuz March 2026"
                className="pub-item-img"
              />
            </div>

            <div className="pub-item-title">
              Implications for global trade and development
            </div>

            <div className="pub-item-meta">March 2026</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroPubs;
