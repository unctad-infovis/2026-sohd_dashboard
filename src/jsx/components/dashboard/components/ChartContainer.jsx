import Tooltip from '@unctad-infovis/general-tools/components/Tooltip.jsx';
import BasePath from '@unctad-infovis/general-tools/helpers/BasePath.js';
import { useCallback, useEffect, useRef } from 'react';
import computeGrowth from '../helpers/computeGrowth.js';

function ChartContainer({ id, src, meta, series, title, selected_date = new Date(), frequency, methodology = '' }) {
  const iframeRef = useRef(null);

  const equalizeHeights = useCallback(() => {
    const iframeContainers = document.querySelectorAll('.iframe_container');

    let maxHeight = 0;
    iframeContainers.forEach(container => {
      const height = container.offsetHeight;
      maxHeight = height > maxHeight ? height : maxHeight;
    });

    iframeContainers.forEach(container => {
      container.style.height = `100%`;
    });
  }, []);

  useEffect(() => {
    equalizeHeights();
    window.addEventListener('resize', equalizeHeights);

    return () => window.removeEventListener('resize', equalizeHeights);
  }, [equalizeHeights]);

  useEffect(() => {}, []);

  const path = BasePath();

  let date = '';
  let growthDate = '';

  if (selected_date !== undefined && selected_date !== null) {
    date = selected_date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    growthDate = `Since ${date}`;
  } else if (series && series.length > 0) {
    date = new Date(series[0].date);
    growthDate = `Since ${date}`;
  }

  const displayMeta = meta.map(el => {
    if (!series || series.length === 0) return el;

    const pct = computeGrowth(series, el.value_name, selected_date, frequency);

    return {
      ...el,
      value: pct,
      date: `${date.toLocaleString('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}`
    };
  });

  return (
    <div className="frequency_tab">
      <div className="chart_container">
        <div className="iframe_container" ref={iframeRef}>
          <iframe loading="lazy" title={title} aria-label="Interactive line chart" id={id} data-src={src} src={null} scrolling="no" frameBorder="0" height="auto" />
        </div>
        <div className="chart_bottom_row">
          {methodology && (
            <div className="button_default_container btn-methodology">
              <Tooltip content={methodology}>
                <span>Methodology</span>
              </Tooltip>
            </div>
          )}
          <div className="growths_container">
            {date && (
              <div className="growth_date_container">
                <span className="growth_meta">{growthDate}</span>
              </div>
            )}
            {series &&
              series.length > 0 &&
              displayMeta.map(el => (
                <div key={el.label} className="growth_container">
                  <span className="growth_value">
                    {el.value !== null ? (
                      <div className="arrow_icon">
                        <span className="growth_label">{el.label}</span>
                        {el.value !== 0 && <img src={`${path}assets/img/icons/${el.value > 0 ? 'increase' : 'decrease'}.png`} alt="" />}
                        {`${el.value}%`}
                      </div>
                    ) : (
                      <div className="arrow_icon">
                        <span className="growth_label">{el.label}</span>
                        <Tooltip content="The date selected has no data for this Indicator. Please select another date.">
                          <span>
                            N/A
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '6px', verticalAlign: '-3px' }}>
                              <circle cx="12" cy="12" r="10" />
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                          </span>
                        </Tooltip>
                      </div>
                    )}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartContainer;
