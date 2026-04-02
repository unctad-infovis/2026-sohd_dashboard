import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { QuestionCircle } from 'react-bootstrap-icons';

function ChartContainer({
  id, src, meta, series, title, selected_date, frequency, methodology
}) {
  const iframeRef = useRef(null);

  // Function to equalize heights of all .iframe_container containers
  const equalizeHeights = () => {
    const iframeContainers = document.querySelectorAll('.iframe_container');

    let maxHeight = 0;
    iframeContainers.forEach((container) => {
      const height = container.offsetHeight;
      maxHeight = height > maxHeight ? height : maxHeight;
    });

    iframeContainers.forEach((container) => {
      container.style.height = `${maxHeight}px`;
    });
  };

  // useEffect hook to run on mount and whenever dependencies change
  useEffect(() => {
    equalizeHeights();
    // Add a resize event listener to ensure heights are equalized on window resize
    window.addEventListener('resize', equalizeHeights);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', equalizeHeights);
  }, [selected_date, series, meta, frequency]);

  useEffect(() => {}, [selected_date]);
  let date = '';
  let growthDate = '';
  let start_index = -1;

  const path = process.env.PUBLIC_URL;

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
    meta.forEach(el => {
      let validStartIndex = -1;
      let validEndIndex = -1;

      if (selected_date !== undefined && selected_date !== null) {
        date = selected_date.toLocaleString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
        growthDate = `Since ${date}`;
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
            if (!Number.isNaN(series[i][el.value_name]) && series[i][el.value_name] !== 'NA') {
              validStartIndex = i;
              break;
            }
          }
        }
      } else {
        date = new Date(series[0].date);
        growthDate = `Since ${date}`;
        validStartIndex = 0; // Assuming the first value is always valid
      }

      // Find the first valid value from the end of the series
      for (let i = series.length - 1; i >= 0; i--) {
        if (!Number.isNaN(series[i][el.value_name]) && series[i][el.value_name] !== 'NA') {
          validEndIndex = i;
          break;
        }
      }

      if (validStartIndex !== -1 && validEndIndex !== -1 && validStartIndex < validEndIndex) {
        el.value = Math.round(((series[validEndIndex][el.value_name] - series[validStartIndex][el.value_name]) / series[validStartIndex][el.value_name]) * 100);
      } else {
        el.value = 0;
      }

      el.date = `${date.toLocaleString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    });
  }

  return (
    <div className="frequency_tab">
      <div className="chart_container">
        <div className="tabs">
          <div htmlFor="tabone" className="tabItem" />
          <span className="frequency_text">{frequency}</span>
        </div>
        <div className="iframe_container" ref={iframeRef}>
          <iframe loading="lazy" title={title} aria-label="Interactive line chart" id={id} data-src={src} src={null} scrolling="no" frameBorder="0" height="auto" />
        </div>
        <div className="growths_container">
          {date && (
          <div className="growth_date_container">
            <span className="growth_meta">{growthDate}</span>
          </div>
          )}
          {series && series.length > 0 && meta.map((el) => (
            !Number.isNaN(el.value) && (
            <div key={el.label} className="growth_container">

              <span className="growth_value">
                {el.value !== 0 && Number.isFinite(el.value) ? (
                  <div className="arrow_icon">
                    <span className="growth_label">{el.label}</span>
                    <img src={`${path}assets/img/icons/${el.value > 0 ? 'increase' : 'decrease'}.png`} alt="" />
                    {el.value}
                    %
                  </div>
                ) : (
                  <div className="arrow_icon">
                    <span className="growth_label">{el.label}</span>
                    <OverlayTrigger
                      placement="top"
                      overlay={(
                        <Tooltip id="tooltip-na">
                          The date selected has no data for this Indicator. Please select another date.
                        </Tooltip>
                      )}
                    >
                      <span>
                        N/A
                        <QuestionCircle size={20} className="ms-2 cursor-pointer" />
                      </span>
                    </OverlayTrigger>
                  </div>
                )}
              </span>
            </div>
            )
          ))}
        </div>
        {methodology ? (
          <div className="button_default_container btn-methodology">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-methodology">{methodology}</Tooltip>}
            >
              <span>Methodology</span>
            </OverlayTrigger>
          </div>
        ) : (
          <div className="methodology-placeholder" />
        )}
      </div>
    </div>
  );
}

ChartContainer.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Array).isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
  selected_date: PropTypes.instanceOf(Date),
  methodology: PropTypes.string,
};

ChartContainer.defaultProps = {
  selected_date: new Date(),
  methodology: '',
};

export default ChartContainer;
