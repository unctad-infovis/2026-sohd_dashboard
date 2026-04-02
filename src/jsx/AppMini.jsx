import React, { useState, useEffect } from 'react';
import '../styles/styles.less';
import '../styles/styles_mini.less';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import Dashboard from './helpers/Dashboard.jsx';

const appID = '#app-root-2026-sohd_dashboard_mini';
// const path = './';
// const path = 'https://storage.unctad.org/2023-gcrg_dashboard/';
const path = process.env.PUBLIC_URL;

function App() {
  const [narrow, setNarrow] = useState('');

  // Data states.
  const [seriesBondSpread, setSeriesBondSpread] = useState([]);
  const [seriesClarkson, setSeriesClarkson] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);

  const cleanData = (data, type) => {
    if (data !== false) {
      switch (type) {
        case 'plot_2a1.csv':
          setSeriesFaoFoodPriceIndex(data);
          break;
        case 'plot_1d1.csv':
          setSeriesClarkson(data);
          break;
        case 'plot_3a1.csv':
          setSeriesEnergy(data);
          break;
        case 'plot_4c2.csv':
          setSeriesBondSpread(data);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const files = ['plot_4c2.csv', 'plot_1d1.csv', 'plot_3a1.csv',
      'plot_2a1.csv'];

    files.forEach(file => {
      const data_file = `${path}assets/data/${file}`;
      try {
        fetch(data_file, { method: 'GET' })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.text();
          })
          .then(body => cleanData(CSVtoJSON(body), file));
      } catch (error) {
        console.error(error);
      }
    });

    // eslint-disable-next-line no-unused-expressions,func-names
    !(function () {
      // eslint-disable-next-line no-restricted-syntax,no-void,guard-for-in
      window.addEventListener('message', ((e) => { if (void 0 !== e.data['datawrapper-height']) { const t = document.querySelectorAll(`${appID} iframe`); for (const a in e.data['datawrapper-height']) for (let r = 0; r < t.length; r++) { if (t[r].contentWindow === e.source)t[r].style.height = `${e.data['datawrapper-height'][a]}px`; } } }));
    }());
    window.addEventListener('resize', () => (document.querySelector(`${appID} .app`).offsetWidth < 361 ? setNarrow('narrow') : setNarrow('')));
    return document.querySelector(`${appID} .app`).offsetWidth < 361 ? setNarrow('narrow') : setNarrow('');
  }, []);

  return (
    <div className={`app ${narrow}`}>
      <div className="app_content">
        <Dashboard seriesFaoFoodPriceIndex={seriesFaoFoodPriceIndex} seriesEnergy={seriesEnergy} seriesClarkson={seriesClarkson} seriesBondSpread={seriesBondSpread} appID={appID} />
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
