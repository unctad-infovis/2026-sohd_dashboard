import { useEffect, useState } from 'react';
import heroPublications from '../config/heroPublications.js';
import BasePath from '../../../helpers/BasePath.js';

const path = BasePath();

function HeroPubs() {
  const [pubsOpen, setPubsOpen] = useState(false);
  const publicationCount = heroPublications.length;
  const publicationLabel = publicationCount === 1 ? 'publication' : 'publications';

  useEffect(() => {
    const handleClickOutside = () => setPubsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`hero-pubs${pubsOpen ? ' open' : ''}`} role="presentation">
      <button type="button" className="hero-pubs-trigger" onClick={() => setPubsOpen(prev => !prev)}>
        <span>Related publications</span>
        <span className="hero-pubs-count">{publicationCount}</span>

        <svg className="hero-pubs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className="hero-pubs-dropdown">
        <div className="hero-pubs-dropdown-header">
          <span className="hero-pubs-dropdown-label">{`${publicationCount} ${publicationLabel}`}</span>
        </div>

        <div className="hero-pubs-dropdown-grid">
          {heroPublications.map(publication => (
            <a key={publication.href} href={publication.href} className="pub-item" target="_blank" rel="noreferrer">
              <div className={`pub-item-cover ${publication.coverClassName}`}>
                <span className="pub-item-badge">
                  <span className="pub-item-dot" />
                  {publication.type}
                </span>

                <img src={`${path}${publication.image}`} alt={publication.imageAlt} className="pub-item-img" />
              </div>

              <div className="pub-item-title">{publication.title}</div>

              <div className="pub-item-meta">{publication.dateLabel}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroPubs;
