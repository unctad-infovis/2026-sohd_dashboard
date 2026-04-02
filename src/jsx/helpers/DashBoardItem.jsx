import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// https://www.npmjs.com/package/react-countup
// import CountUp from 'react-countup';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';

function DashBoardItem({
  /* appID, */ idx, image, series, series_value_name, title, unit, selected_date, frequency
}) {
  let date = '';
  let meta = '';
  let value = 0;
  let start_index = -1;

  const path = process.env.PUBLIC_URL;

  useEffect(() => {}, [selected_date]);

  const getMonthlyFrequency = (date1, date2) => {
    const formattedDate1 = moment(date1).format('YYYY-MM');
    const formattedDate2 = moment(date2).format('YYYY-MM');
    return formattedDate1 === formattedDate2;
  };

  const getDailyFrequency = (date1, date2) => {
    const formattedDate1 = moment(date1).format('DD/MM/YYYY');
    const formattedDate2 = moment(date2).format('DD/MM/YYYY');
    return formattedDate1 === formattedDate2;
  };

  const isSameWeek = (date1, date2) => moment(date1).isSame(date2, 'week');

  if (series && series.length > 0) {
    let validStartIndex = -1; let
      validEndIndex = -1;

    if (selected_date !== undefined && selected_date !== null) {
      date = selected_date;
      if (frequency === 'Monthly') {
        start_index = series.findIndex(entry => getMonthlyFrequency(entry.date, selected_date));
      } else if (frequency === 'Daily') {
        start_index = series.findIndex(entry => getDailyFrequency(entry.date, selected_date));
      } else if (frequency === 'Weekly') {
        start_index = series.findIndex(entry => isSameWeek(entry.date, selected_date));
      }

      // Find the last valid value before start_index if needed
      if (start_index !== -1) {
        for (let i = start_index; i >= 0; i--) {
          if (!Number.isNaN(series[i][series_value_name]) && series[i][series_value_name] !== 'NA') {
            validStartIndex = i;
            break;
          }
        }
      }
    } else {
      date = new Date(series[0].date);
      validStartIndex = 0; // Assuming the first value is always valid
    }

    // Find the first valid value from the end of the series
    for (let i = series.length - 1; i >= 0; i--) {
      if (!Number.isNaN(series[i][series_value_name]) && series[i][series_value_name] !== 'NA') {
        validEndIndex = i;
        break;
      }
    }

    if (validStartIndex !== -1 && validEndIndex !== -1 && validStartIndex < validEndIndex) {
      value = Math.round(((series[validEndIndex][series_value_name] - series[validStartIndex][series_value_name]) / series[validStartIndex][series_value_name]) * 100);
    } else {
      value = 0;
    }

    meta = `${date.toLocaleString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }

  return (
    <div className={`dashboard_item dashboard_item_${idx}`}>
      <div className="dashboard_item_image"><img src={image} alt="" /></div>
      <div className="dashboard_circle">
        <div className="dashboard_item_value">
          <div className="dashboard_item_title">{title}</div>
          <div className="dashboard_item_meta">
            { `Since ${meta}` }
          </div>
          <span className="value">
            {(value > 0) ? (
              <div className="arrow_icon">
                <img src={`${path}assets/img/icons/increase.png`} alt="" />
                {value}
              </div>
            ) : (value < 0) ? (
              <div className="arrow_icon">
                <img src={`${path}assets/img/icons/decrease.png`} alt="" />
                {(value)}
              </div>
            ) : (
              <div className="arrow_icon">
                <div className="dashboard_item_no_data">No data available</div>
              </div>
            )}
          </span>
          {(value !== 0) ? (
            <span className="unit">{unit}</span>) : ('') }
        </div>
      </div>
      <div className="dashboard_item_more">
        <div className="dashboard_item_more_text">
          more
        </div>
      </div>
    </div>
  );
}

DashBoardItem.propTypes = {
  idx: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  series_value_name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  selected_date: PropTypes.instanceOf(Date),
  frequency: PropTypes.string,
};

DashBoardItem.defaultProps = {
  selected_date: new Date(),
  frequency: 'Monthly',
};

export default DashBoardItem;
