import React from 'react';
import PropTypes from 'prop-types';
import CardValue from './CardValue.jsx';

function CardIndicator({
  isActive,
  onClick,
  icon,
  label,
  metric,
  formattedDate,
  series,
  valueName,
  selectedDate,
  frequency,
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`indicator-card${isActive ? ' active' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="ic-head">
        <div>
          <div className="ic-label">{label}</div>
          <div className="ic-label-sub">Indicators</div>
        </div>

        <div className="ic-icon">{icon}</div>
      </div>

      <div className="ic-metric">{metric}</div>
      <div className="ic-since">{`Since ${formattedDate}`}</div>

      <CardValue
        series={series}
        valueName={valueName}
        selectedDate={selectedDate}
        frequency={frequency}
      />

      <div className="ic-footer">
        <span className="ic-more">View details →</span>
      </div>
    </div>
  );
}

CardIndicator.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  valueName: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  frequency: PropTypes.string.isRequired,
};

CardIndicator.defaultProps = {
  selectedDate: null,
};

export default CardIndicator;
