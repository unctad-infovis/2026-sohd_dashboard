import React from 'react';
import PropTypes from 'prop-types';
import { IconDownload, IconClose } from './Icons.jsx';

const path = process.env.PUBLIC_URL;

function CardDetails({
  tabContentClass,
  icon,
  title,
  subtitle,
  downloadFile,
  downloadLabel,
  onClose,
  children,
}) {
  return (
    <div className={`tab_content ${tabContentClass}`}>
      <div className="tab_content_title detail-header">
        <div className="detail-title-group">
          <div className="detail-icon">{icon}</div>

          <div className="detail-title-text">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="detail-actions">
          <a
            href={`${path}assets/data/${downloadFile}`}
            download
            className="btn-new primary"
          >
            <IconDownload />
            {downloadLabel}
          </a>

          <button type="button" className="btn-close-circle" onClick={onClose}>
            <IconClose />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

CardDetails.propTypes = {
  tabContentClass: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  downloadFile: PropTypes.string.isRequired,
  downloadLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CardDetails;
