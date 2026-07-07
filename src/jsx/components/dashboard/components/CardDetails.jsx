import { IconClose } from './Icons.jsx';

function CardDetails({ tabContentClass, icon, title, subtitle, onClose, children }) {
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
          <button type="button" className="btn-close-circle" onClick={onClose}>
            <IconClose />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

export default CardDetails;
