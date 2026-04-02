import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

import scrollIntoView from 'scroll-into-view';
import DatePicker from 'react-datepicker';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartContainer from './helpers/ChartContainer.jsx';
import CalendarContainer from './helpers/CalendarContainer.jsx';
import DashBoardItem from './helpers/DashBoardItem.jsx';

const analytics = window.gtag || undefined;
const appID = '#app-root-2026-sohd_dashboard';
const path = process.env.PUBLIC_URL;

function App() {
  // Data states
  const [seriesGDPNowCast, setSeriesGDPNowCast] = useState([]);
  const [seriesInflationRegion, setSeriesInflationRegion] = useState([]);
  const [seriesInterestRates, setSeriesInterestRates] = useState([]);
  const [seriesClarkson, setSeriesClarkson] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);
  const [seriesWheatAgriculture, setSeriesWheatAgriculture] = useState([]);
  const [seriesWBFertilizerIndex, setSeriesWBFertilizerIndex] = useState([]);
  const [seriesFoodPriceInflation, setSeriesFoodPriceInflation] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesNaturalgasPrices, setSeriesNaturalgasPrices] = useState([]);
  const [seriesExchangeRates, setSeriesExchangeRates] = useState([]);
  const [seriesInternationalReserves, setSeriesInternationalReserves] = useState([]);
  const [seriesInternationalReservesMonth, setSeriesInternationalReservesMonth] = useState([]);
  const [seriesBondYields, setSeriesBondYields] = useState([]);

  // Default date on page load
  const defaultDate = new Date('2026-02-28');
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const cleanData = (data, type) => {
    if (data !== false) {
      switch (type) {
        case 'plot_1a1.csv':
          setSeriesGDPNowCast(data);
          break;
        case 'plot_1b1.csv':
          setSeriesInflationRegion(data);
          break;
        case 'plot_1c1.csv':
          setSeriesInterestRates(data);
          break;
        case 'plot_1d1.csv':
          setSeriesClarkson(data);
          break;
        case 'plot_2a1.csv':
          setSeriesFaoFoodPriceIndex(data);
          break;
        case 'plot_2b1.csv':
          setSeriesWheatAgriculture(data);
          break;
        case 'plot_2c1.csv':
          setSeriesWBFertilizerIndex(data);
          break;
        case 'plot_2d1.csv':
          setSeriesFoodPriceInflation(data);
          break;
        case 'plot_3a1.csv':
          setSeriesEnergy(data);
          break;
        case 'plot_3b1.csv':
          setSeriesNaturalgasPrices(data);
          break;
        case 'plot_4a1.csv':
          setSeriesExchangeRates(data);
          break;
        case 'plot_4b1.csv':
          setSeriesInternationalReserves(data);
          break;
        case 'plot_4b2.csv':
          setSeriesInternationalReservesMonth(data);
          break;
        case 'plot_4c1.csv':
          setSeriesBondYields(data);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const files = ['plot_1a1.csv', 'plot_1b1.csv', 'plot_1c1.csv', 'plot_1d1.csv',
      'plot_2a1.csv', 'plot_2b1.csv', 'plot_2c1.csv', 'plot_2d1.csv', 'plot_3a1.csv', 'plot_3b1.csv', 'plot_4a1.csv', 'plot_4b1.csv', 'plot_4b2.csv', 'plot_4c1.csv', 'plot_4c2.csv'];
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
    document.querySelectorAll(`${appID} .tab_content_food iframe`).forEach(el => {
      el.src = el.getAttribute('data-src');
    });
  }, []);

  const closeAll = (scroll) => {
    document.querySelectorAll(`${appID} .tab_content`).forEach(el => {
      el.style.opacity = 0;
      el.style.display = 'none';
      el.classList.remove('selected');
    });
    document.querySelectorAll(`${appID} .tab_button`).forEach(el => {
      el.classList.remove('selected');
      el.classList.remove('not_selected');
    });

    document.querySelector('.app_content').style.backgroundImage = `url(${path}assets/img/default-background.jpg)`;
    document.querySelector('.app_content').style.backgroundSize = 'cover';
    document.querySelector('.app_content').style.paddingBottom = '40px';

    if (scroll === true) {
      scrollIntoView(document.querySelector(`${appID} .app`), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 100
        },
        cancellable: false,
        time: 0
      });
    }
  };

  const changeTab = (event, tab_class, tab_name, background_image) => {
    if (event.currentTarget.classList.contains('selected') === true) {
      closeAll(false);
    } else {
      document.querySelectorAll(`${appID} .tab_content`).forEach(el => {
        el.style.opacity = 0;
        el.style.display = 'none';
        el.classList.remove('selected');
      });
      document.querySelectorAll(`${appID} .tab_button`).forEach(el => {
        el.classList.remove('selected');
        el.classList.add('not_selected');
      });
      document.querySelector(`${appID} ${tab_class}`).style.opacity = 1;
      document.querySelector(`${appID} ${tab_class}`).style.display = 'flex';
      document.querySelector(`${appID} ${tab_class}`).style.justifyContent = 'center';
      document.querySelector(`${appID} ${tab_class}`).style.rowGap = '40px';
      document.querySelector(`${appID} ${tab_class}`).style.columnGap = '40px';
      document.querySelector(`${appID} ${tab_class}`).style.paddingTop = '20px';
      document.querySelector(`${appID} ${tab_class}`).style.paddingBottom = '40px';
      document.querySelector('.app_content').style.paddingBottom = '0';
      document.querySelector('.app_content').style.backgroundImage = `url(${path}assets/img/${background_image})`;
      document.querySelector('.app_content').style.backgroundSize = 'contain';

      event.currentTarget.classList.add('selected');
      document.querySelectorAll(`${appID} ${tab_class} iframe`).forEach(el => {
        el.src = el.getAttribute('data-src');
      });
      const tabContentElement = document.querySelector(`${appID} ${tab_class}`);
      tabContentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Tab Click', {
          event_category: '2022-ukraine_brief_3_dashboard',
          event_label: tab_name,
          transport_type: 'beacon'
        });
      }
    }
  };

  useEffect(() => {
    // Define a function to adjust flex-direction based on screen width
    const adjustFlexDirection = () => {
      const tabContentElements = document.querySelectorAll(`${appID} .tab_content`);
      if (window.innerWidth <= 768) {
        tabContentElements.forEach(el => {
          el.style.flexDirection = 'column';
        });
      } else {
        tabContentElements.forEach(el => {
          el.style.flexDirection = '';
        });
      }
    };

    // Call the function on component mount and window resize
    adjustFlexDirection();
    window.addEventListener('resize', adjustFlexDirection);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', adjustFlexDirection);
    };
  }, []);

  const [isFixed, setIsFixed] = useState(false);
  const datePickerRef_Scroll = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (datePickerRef_Scroll.current) {
        const datePickerTop = datePickerRef_Scroll.current.offsetTop;
        const isBeyondOriginalPosition = window.scrollY > datePickerTop + 200;

        setIsFixed(isBeyondOriginalPosition);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const datePickerRef_Close = useRef(null);

  const setCustomDate = (customDate) => {
    setSelectedDate(new Date(customDate));
    if (datePickerRef_Close && datePickerRef_Close.current) {
      datePickerRef_Close.current.setOpen(false);
    }
    document.querySelector('.tabs_container').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const calendarContainer = ({ className, children }) => (
    <CalendarContainer className={className} setCustomDate={setCustomDate}>
      {children}
    </CalendarContainer>
  );

  const range = (start, end, step) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  };

  // Define the getYear and getMonth functions
  const getYear = (date) => date.getFullYear();
  const getMonth = (date) => date.getMonth();
  const years = range(2019, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="app">
      <div className="app_content">
        <div className="title_container">
          <h1>Strait of Hormuz dashboard</h1>
          <h2>Tracking impact on global shipping, energy, food and finance</h2>
          <div className={`datePickerContainer ${isFixed ? 'fixedDatePicker' : ''}`} ref={datePickerRef_Scroll}>
            <DatePicker
              ref={datePickerRef_Close}
              className="mb-3"
              showIcon
              showPreviousMonths
              withPortal
              isClearable
              monthsShown={1}
              selected={selectedDate}
              onChange={handleDateChange}
              calendarContainer={calendarContainer}
              dateFormat="MMMM d, yyyy"
              showTimeSelect={false}
              peekNextMonth
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {'<'}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {'>'}
                  </button>
                </div>
              )}
              holidays={[
                { date: '2019-01-01', holidayName: 'Beginning of pre-COVID year' },
                { date: '2020-03-11', holidayName: 'WHO declares COVID 19 Pandemic' },
                { date: '2022-02-24', holidayName: 'Onset War in Ukraine' },
                { date: '2023-05-05', holidayName: 'WHO declares end of COVID-19 pandemic' },
                { date: '2023-10-07', holidayName: 'Onset Israel-Palestine conflict' },
                { date: '2026-02-28', holidayName: 'Start of military escalation in the Middle East' },
              ]}
              minDate={new Date('2019-01-01')}
              maxDate={new Date()}
              placeholderText="Select Reference Date"
              icon={(
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 50 50"
                >
                  <path
                    id="ic_today_24px"
                    className="st0"
                    fill="white"
                    d="M42.5,5H40V0h-5v5H15V0h-5v5H7.5c-2.7,0-5,2.2-5,5c0,0,0,0,0,0l0,35c0,2.8,2.2,5,5,5c0,0,0,0,0,0h35c2.8,0,5-2.2,5-5V10C47.5,7.2,45.3,5,42.5,5z M42.5,45h-35V17.5h35V45z M12.5,22.5H25V35H12.5V22.5z"
                  />
                </svg>
        )}
            />
          </div>
        </div>
        <div className="tabs_container">
          <div className="tab_container tab_container">
            <button type="button" className="tab_button button_global" onClick={(event) => changeTab(event, '.tab_content_global', 'Global', 'default-background.jpg')}>
              <div className="label label_title">Shipping</div>
              <div className="label label_subtitle">Indicators</div>
              <DashBoardItem idx="0" image={`${path}assets/img/icons/sohd-2026-shipping-w.svg`} series={seriesGDPNowCast} series_value_name="transits" title="Ship transits" unit="%" appID={appID} selected_date={selectedDate} frequency="Daily" />
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_food not_selected" onClick={(event) => changeTab(event, '.tab_content_food', 'Food', 'default-background.jpg')}>
              <span className="label label_title">Food</span>
              <div className="label label_subtitle">Indicators</div>
              <DashBoardItem idx="1" image={`${path}assets/img/icons/sohd-2026-food-w.png`} series={seriesWheatAgriculture} series_value_name="index" title="Commodity food prices" unit="%" appID={appID} selected_date={selectedDate} frequency="Monthly" />
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_energy not_selected" onClick={(event) => changeTab(event, '.tab_content_energy', 'Energy', 'default-background.jpg')}>
              <span className="label label_title">Energy</span>
              <div className="label label_subtitle">Indicators</div>
              <DashBoardItem idx="2" image={`${path}assets/img/icons/sohd-2026-energy-w.png`} series={seriesEnergy} series_value_name="europe" title="Crude oil price, Europe" unit="%" appID={appID} selected_date={selectedDate} frequency="Daily" />
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_finance not_selected" onClick={(event) => changeTab(event, '.tab_content_finance', 'Finance', 'default-background.jpg')}>
              <span className="label label_title">Finance</span>
              <div className="label label_subtitle">Indicators</div>
              <DashBoardItem idx="3" image={`${path}assets/img/icons/sohd-2026-finance-w.png`} series={seriesInternationalReserves} series_value_name="emerging" title="Emerging markets: sovereign bond spread" unit="%" appID={appID} selected_date={selectedDate} frequency="Daily" />
            </button>
          </div>
        </div>
        <div className="tabs_content">
          <div className="tab_content tab_content_global">
            <div className="tab_content_title">
              <img src={`${path}assets/img/icons/sohd-2026-shipping-b.svg`} alt="" />
              <h3>Shipping</h3>
              <div className="close_container"><button type="button" onClick={() => closeAll(true)}>x</button></div>
              <div className="tab_content_title justify-content-around mt-3">
                <a href={`${path}assets/data/bulk_data_shipping.xlsx`} download className="button_default_container btn-download"><span>Download Shipping Dataset</span></a>
              </div>
            </div>
            <ChartContainer title="Transit through the Strait of Hormuz" id="datawrapper-chart-CtUz4" src="https://datawrapper.dwcdn.net/CtUz4" meta={[{ label: 'Transits', value_name: 'transits' }]} series={seriesGDPNowCast} frequency="Daily" selected_date={selectedDate} />
            <ChartContainer title="Cost of marine fuel" id="datawrapper-chart-nK6Hr" src="https://datawrapper.dwcdn.net/nK6Hr" meta={[{ label: 'High sulphur', value_name: 'highsulfur' }, { label: 'Low sulphur', value_name: 'lowsulfur' }]} series={seriesInflationRegion} frequency="Daily" selected_date={selectedDate} />
            <ChartContainer title="Freight costs for shipping oil" id="datawrapper-chart-CwGjy" src="https://datawrapper.dwcdn.net/CwGjy" meta={[{ label: 'Dirty tankers', value_name: 'dirty_tanker' }, { label: ' Clean tankers', value_name: 'clean_tanker' }]} series={seriesInterestRates} frequency="Daily" selected_date={selectedDate} methodology="UN GCRG calculations based on Refinitiv. Data on central bank policy rates for 159 countries. UN country group classifications. Group aggregates are estimated as the median value. Latest data point estimated once 80% of countries in a group have reported data." />
            <ChartContainer title="Price of shipping" id="datawrapper-chart-RY0Fg" src="https://datawrapper.dwcdn.net/RY0Fg" meta={[{ label: 'Containers', value_name: 'containers' }, { label: ' Bulk', value_name: 'bulk' }]} series={seriesClarkson} frequency="Weekly" selected_date={selectedDate} />
          </div>
          <div className="tab_content tab_content_food">
            <div className="tab_content_title">
              <img src={`${path}assets/img/icons/sohd-2026-food-b.png`} alt="" />
              <h3>Food Indicators</h3>
              <div className="close_container"><button type="button" onClick={() => closeAll(true)}>x</button></div>
              <div className="tab_content_title justify-content-around mt-3">
                <a href={`${path}assets/data/bulk_data_food.xlsx`} download className="button_default_container btn-download"><span>Download Food Dataset</span></a>
              </div>
            </div>
            <ChartContainer title="FAO Food Price Index" id="datawrapper-chart-3spao" src="https://datawrapper.dwcdn.net/3spao" meta={[{ label: 'FAO Food Price Index', value_name: 'value' }]} series={seriesFaoFoodPriceIndex} frequency="Monthly" selected_date={selectedDate} />
            <ChartContainer title="Commodity food prices" id="datawrapper-chart-xe9L9" src="https://datawrapper.dwcdn.net/xe9L9" meta={[{ label: 'Agricultural and Livestock Index', value_name: 'index' }]} series={seriesWheatAgriculture} frequency="Daily" selected_date={selectedDate} />
            <ChartContainer title="Fertilizer prices" id="datawrapper-chart-E2VH4" src="https://datawrapper.dwcdn.net/E2VH4" meta={[{ label: 'Diammonium Phosphate', value_name: 'diammonium' }, { label: 'Urea', value_name: 'urea' }]} series={seriesWBFertilizerIndex} frequency="Weekly" selected_date={selectedDate} />
            <ChartContainer title="Food price inflation" id="datawrapper-chart-pKWw6" src="https://datawrapper.dwcdn.net/pKWw6" meta={[{ label: 'Developed Economies', value_name: 'med_developed' }, { label: 'Developing Economies', value_name: 'med_developing' }]} series={seriesFoodPriceInflation} frequency="Monthly" selected_date={selectedDate} methodology="Data on Year-on-Year CPI Food variation for 139 countries. UN country group classifications. Group aggregates are estimated as the median value. Latest data point estimated once 80% of countries in a group have reported data." />
          </div>
          <div className="tab_content tab_content_energy">
            <div className="tab_content_title">
              <img src={`${path}assets/img/icons/sohd-2026-energy-b.png`} alt="" />
              <h3>Energy Indicators</h3>
              <div className="close_container"><button type="button" onClick={() => closeAll(true)}>x</button></div>
              <div className="tab_content_title justify-content-around mt-3">
                <a href={`${path}assets/data/bulk_data_energy.xlsx`} download className="button_default_container btn-download"><span>Download Energy Dataset</span></a>
              </div>
            </div>
            <ChartContainer title="Oil prices" id="datawrapper-chart-EYPxo" src="https://datawrapper.dwcdn.net/EYPxo" meta={[{ label: 'Europe', value_name: 'europe' }, { label: 'Middle East', value_name: 'middleeast' }, { label: 'Russia', value_name: 'russia' }]} series={seriesEnergy} frequency="Daily" selected_date={selectedDate} />
            <ChartContainer title="Gas prices" id="datawrapper-chart-6oB41" src="https://datawrapper.dwcdn.net/6oB41" meta={[{ label: 'Asia (LNG)', value_name: 'asia' }, { label: 'Europe', value_name: 'europe' }, { label: 'US', value_name: 'us' }]} series={seriesNaturalgasPrices} frequency="Daily" selected_date={selectedDate} />
            <ChartContainer title="Petroleum gas prices" id="datawrapper-chart-74dPn" src="https://datawrapper.dwcdn.net/74dPn" meta={[{ label: 'Asia (LNG)', value_name: 'asia' }, { label: 'Europe', value_name: 'europe' }, { label: 'US', value_name: 'us' }]} series={seriesNaturalgasPrices} frequency="Weekly" selected_date={selectedDate} />
            <ChartContainer title="Biofuel prices" id="datawrapper-chart-awQuD" src="https://datawrapper.dwcdn.net/awQuD" meta={[{ label: 'Asia (LNG)', value_name: 'asia' }, { label: 'Europe', value_name: 'europe' }, { label: 'US', value_name: 'us' }]} series={seriesNaturalgasPrices} frequency="Daily" selected_date={selectedDate} />
          </div>
          <div className="tab_content tab_content_finance">
            <div className="tab_content_title">
              <img src={`${path}assets/img/icons/sohd-2026-finance-b.png`} alt="" />
              <h3>Finance Indicators</h3>
              <div className="close_container"><button type="button" onClick={() => closeAll(true)}>x</button></div>
              <div className="tab_content_title justify-content-around mt-3">
                <a href={`${path}assets/data/bulk_data_finance.xlsx`} download className="button_default_container btn-download"><span>Download Finance Dataset</span></a>
              </div>
            </div>
            <ChartContainer title="Exchange rates of developing countries" id="datawrapper-chart-69yXd" src="https://datawrapper.dwcdn.net/69yXd" meta={[{ label: 'Developed Countries', value_name: 'developedcountries' }, { label: 'Developing Countries', value_name: 'developingcountries' }]} series={seriesExchangeRates} frequency="Daily" selected_date={selectedDate} methodology="Data on daily exchange rate of 142 currencies against the US Dollar. UN country group classifications. Group aggregates are estimated as the median value." />
            <ChartContainer title="International reserves of developing countries" id="datawrapper-chart-r91nz" src="https://datawrapper.dwcdn.net/r91nz" meta={[{ label: 'Developed Countries', value_name: 'developed_4b1' }, { label: 'Developing Countries', value_name: 'developing_4b1' }]} series={seriesInternationalReserves} frequency="Daily" selected_date={selectedDate} methodology="Data on international reserves for 183 countries. UN country group classifications. Group aggregates are the total sum of reserves. Latest data point estimated once 80% of countries in a group have reported data." />
            <ChartContainer title="Evolution of international reserves of developing countries" id="datawrapper-chart-u7z7Q" src="https://datawrapper.dwcdn.net/u7z7Q" meta={[{ label: 'Developed Countries', value_name: 'developed_4b2' }, { label: 'Developing Countries', value_name: 'developing_4b2' }]} series={seriesInternationalReservesMonth} frequency="Monthly" selected_date={selectedDate} methodology="Data on international reserves for 183 countries. UN country group classifications. Group aggregates are estimated as the median value. Latest data point estimated once 80% of countries in a group have reported data." />
            <ChartContainer title="Bond yields of emerging markets" id="datawrapper-chart-HJO3x" src="https://datawrapper.dwcdn.net/HJO3x" meta={[{ label: 'Emerging Markets', value_name: 'emergingmarkets_4c1' }]} series={seriesBondYields} frequency="Monthly" selected_date={selectedDate} methodology="JP EMBI Global Diversified index data. Emerging market and regional country groupings based on JP Morgan classifications." />
          </div>
        </div>
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>

  );
}

export default App;
