import computeGrowth from '../helpers/computeGrowth.js';

function CardValue({ series, valueName, selectedDate = null, frequency }) {
  if (!series || series.length === 0) {
    return <div className="ic-nodata">— No data available</div>;
  }

  const value = computeGrowth(series, valueName, selectedDate, frequency);

  if (value === null) {
    return <div className="ic-nodata">— No data available</div>;
  }

  if (value === 0) {
    return (
      <div className="ic-value-row neutral">
        <span className="ic-value">
          0<span className="ic-unit">%</span>
        </span>
      </div>
    );
  }

  const dir = value > 0 ? 'up' : 'down';
  const arrow = value > 0 ? '▲' : '▼';

  return (
    <div className={`ic-value-row ${dir}`}>
      <span className="ic-arrow">{arrow}</span>
      <span className="ic-value">
        {value}
        <span className="ic-unit">%</span>
      </span>
    </div>
  );
}

export default CardValue;
