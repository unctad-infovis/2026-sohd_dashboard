import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { QuestionCircle } from 'react-bootstrap-icons';
import computeGrowth from '../helpers/computeGrowth.js';

function ChartContainer({
  id,
  src,
  meta,
  series,
  title,
  selected_date,
  frequency,
  methodology,
}) {
  const iframeRef = useRef(null);

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

  useEffect(() => {
    equalizeHeights();
    window.addEventListener('resize', equalizeHeights);

    return () => window.removeEventListener('resize', equalizeHeights);
  }, [selected_date, series, meta, frequency]);

  useEffect(() => {}, [selected_date]);

  const path = process.env.PUBLIC_URL;

  let date = '';
  let growthDate = '';

  if (selected_date !== undefined && selected_date !== null) {
    date = selected_date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    growthDate = `Since ${date}`;
  } else if (series && series.length > 0) {
    date = new Date(series[0].date);
    growthDate = `Since ${date}`;
  }

  if (series && series.length > 0) {
    meta.forEach((el) => {
      const pct = computeGrowth(series, el.value_name, selected_date, frequency);
      el.value = pct;
      el.date = `${date.toLocaleString('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
    });
  }

  return (
    <div className="frequency_tab">
      <div className="chart_container">
        <div className="iframe_container" ref={iframeRef}>
          <iframe
            loading="lazy"
            title={title}
            aria-label="Interactive line chart"
            id={id}
            data-src={src}
            src={null}
            scrolling="no"
            frameBorder="0"
            height="auto"
          />
        </div>
        <div className="chart_bottom_row">
          {methodology ? (
            <div className="button_default_container btn-methodology">
              <OverlayTrigger
                placement="top"
                overlay={(
                  <Tooltip id="tooltip-methodology">
                    {methodology}
                  </Tooltip>
                )}
              >
                <span>Methodology</span>
              </OverlayTrigger>
            </div>
          ) : (
            ''
          )}
          <div className="growths_container">
            {date && (
              <div className="growth_date_container">
                <span className="growth_meta">{growthDate}</span>
              </div>
            )}
            {series
              && series.length > 0
              && meta.map(
                (el) => (
                  <div key={el.label} className="growth_container">
                    <span className="growth_value">
                      {el.value !== null ? (
                        <div className="arrow_icon">
                          <span className="growth_label">{el.label}</span>
                          {el.value !== 0 && (
                            <img
                              src={`${path}assets/img/icons/${el.value > 0 ? 'increase' : 'decrease'}.png`}
                              alt=""
                            />
                          )}
                          {`${el.value}%`}
                        </div>
                      ) : (
                        <div className="arrow_icon">
                          <span className="growth_label">{el.label}</span>
                          <OverlayTrigger
                            placement="top"
                            overlay={(
                              <Tooltip id="tooltip-na">
                                The date selected has no data for this
                                Indicator. Please select another date.
                              </Tooltip>
                            )}
                          >
                            <span>
                              N/A
                              <QuestionCircle
                                size={20}
                                className="ms-2 cursor-pointer"
                              />
                            </span>
                          </OverlayTrigger>
                        </div>
                      )}
                    </span>
                  </div>
                ),
              )}
          </div>
        </div>
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
