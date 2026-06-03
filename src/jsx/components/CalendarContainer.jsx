import React from 'react';
import PropTypes from 'prop-types';
import { referenceDatePresets } from '../config/referenceDates.js';

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ReferenceDateContainer({
  className, children, setCustomDate, onClose,
}) {
  return (
    <div className="dm-root">

      {/* ── Header ── */}
      <div className="dm-header">
        <div className="dm-header-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="18"
            height="18"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="dm-header-text">
          <h3>Select a reference date for analysis</h3>
          <p>
            If data for the chosen date is unavailable, the dashboard
            automatically displays the closest available prior date.
          </p>
        </div>
        <button
          type="button"
          className="dm-close-btn"
          onClick={onClose}
          aria-label="Close date picker"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            width="14"
            height="14"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      <div className={`dm-body ${className}`}>

        {/* Left — presets */}
        <div className="dm-col dm-col-presets">
          <div className="dm-col-label">Preset dates</div>
          <div className="dm-preset-list">
            {referenceDatePresets.map((p) => (
              <button
                key={p.date}
                type="button"
                className="dm-preset-item"
                onClick={() => setCustomDate(p.date)}
              >
                <span className="dm-preset-icon"><CalendarIcon /></span>
                <span className="dm-preset-info">
                  <span className="dm-preset-title">{p.title}</span>
                  <span className="dm-preset-date">{p.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right — calendar */}
        <div className="dm-col dm-col-calendar">
          <div className="dm-col-label">Custom date</div>
          <div className="dm-calendar-wrap">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

ReferenceDateContainer.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setCustomDate: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

ReferenceDateContainer.defaultProps = {
  onClose: null,
};

export default ReferenceDateContainer;
