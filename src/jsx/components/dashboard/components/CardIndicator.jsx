import CardValue from './CardValue.jsx';

function CardIndicator({ isActive, onClick, icon, label, metric, formattedDate, series, valueName, selectedDate = null, frequency }) {
  return (
    <button className={`indicator-card${isActive ? ' active' : ''}`} type="button" onClick={onClick}>
      <div className="ic-head">
        <div>
          <div className="ic-label">{label}</div>
          <div className="ic-label-sub">Indicators</div>
        </div>

        <div className="ic-icon">{icon}</div>
      </div>

      <div className="ic-metric">{metric}</div>
      <div className="ic-since">{`Since ${formattedDate}`}</div>

      <CardValue series={series} valueName={valueName} selectedDate={selectedDate} frequency={frequency} />

      <div className="ic-footer">
        <span className="ic-more">View details →</span>
      </div>
    </button>
  );
}

export default CardIndicator;
