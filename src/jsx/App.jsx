import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';
import '../styles/styles_new_layout.less';

import scrollIntoView from 'scroll-into-view';
import useSeriesData from './hooks/useSeriesData.js';
import HeroPubs from './components/HeroPubs.jsx';
import CalendarDatePicker from './components/CalendarDatePicker.jsx';
import CardIndicator from './components/CardIndicator.jsx';
import CardDetails from './components/CardDetails.jsx';
import ChartContainer from './components/ChartContainer.jsx';
import {
  IconShipping,
  IconFood,
  IconEnergy,
  IconFinance,
} from './components/Icons.jsx';

const analytics = window.gtag || undefined;
const appID = '#app-root-2026-sohd_dashboard';
const path = process.env.PUBLIC_URL;

function App() {
  const {
    seriesTransit,
    seriesMarineFuel,
    seriesFreightOil,
    seriesFreightContainerBulk,
    seriesFaoFoodPriceIndex,
    seriesWheatAgriculture,
    seriesWBFertilizerIndex,
    seriesFoodPriceInflation,
    seriesEnergy,
    seriesNaturalgasPrices,
    seriesPetroleumgasPrices,
    serieBiofuelPrices,
    seriesExchangeRates,
    seriesStockPrices,
    seriesInternationalReserves,
    seriesInflationRegion,
  } = useSeriesData();

  const defaultDate = new Date('2026-02-27');
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [activeSection, setActiveSection] = useState(null);
  const [isFixed, setIsFixed] = useState(false);

  const datePickerRefScroll = useRef(null);

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data['datawrapper-height'] !== undefined) {
        const iframes = document.querySelectorAll(`${appID} iframe`);

        Object.keys(e.data['datawrapper-height']).forEach((key) => {
          for (let i = 0; i < iframes.length; i += 1) {
            if (iframes[i].contentWindow === e.source) {
              iframes[i].style.height = `${e.data['datawrapper-height'][key]}px`;
            }
          }
        });
      }
    });

    document
      .querySelectorAll(`${appID} .tab_content_food iframe`)
      .forEach((el) => {
        el.src = el.getAttribute('data-src');
      });
  }, []);

  const closeAll = (scroll) => {
    document.querySelectorAll(`${appID} .tab_content`).forEach((el) => {
      el.style.opacity = 0;
      el.style.display = 'none';
      el.classList.remove('selected');
    });

    document.querySelectorAll(`${appID} .tab_button`).forEach((el) => {
      el.classList.remove('selected');
      el.classList.remove('not_selected');
    });

    if (scroll === true) {
      scrollIntoView(document.querySelector(`${appID} .app`), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 100,
        },
        cancellable: false,
        time: 0,
      });
    }
  };

  const changeTab = (tabClass, tabName, section) => {
    if (activeSection === section) {
      setActiveSection(null);
      closeAll(false);
      return;
    }

    setActiveSection(section);

    document.querySelectorAll(`${appID} .tab_content`).forEach((el) => {
      el.style.opacity = 0;
      el.style.display = 'none';
      el.classList.remove('selected');
    });

    const tabEl = document.querySelector(`${appID} ${tabClass}`);

    if (tabEl) {
      tabEl.style.opacity = 1;
      tabEl.style.display = 'flex';
      tabEl.style.justifyContent = 'center';
      tabEl.style.rowGap = '10px';
      tabEl.style.columnGap = '10px';
      tabEl.style.paddingTop = '40px';
      tabEl.style.paddingBottom = '40px';

      document.querySelectorAll(`${appID} ${tabClass} iframe`).forEach((el) => {
        el.src = el.getAttribute('data-src');
      });

      if (window.innerWidth <= 768) {
        tabEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }

    if (typeof analytics !== 'undefined') {
      analytics('event', 'Tab Click', {
        event_category: '2026-sohd_dashboard',
        event_label: tabName,
        transport_type: 'beacon',
      });
    }
  };

  useEffect(() => {
    const adjustFlexDirection = () => {
      const tabContentElements = document.querySelectorAll(
        `${appID} .tab_content`,
      );

      tabContentElements.forEach((el) => {
        el.style.flexDirection = window.innerWidth <= 768 ? 'column' : '';
      });
    };

    adjustFlexDirection();
    window.addEventListener('resize', adjustFlexDirection);

    return () => window.removeEventListener('resize', adjustFlexDirection);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (datePickerRefScroll.current) {
        const datePickerTop = datePickerRefScroll.current.offsetTop;
        setIsFixed(window.scrollY > datePickerTop + 200);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setCustomDate = (customDate) => {
    setSelectedDate(new Date(customDate));

    if (window.innerWidth <= 768) {
      const el = document.querySelector('.indicators-grid')
      || document.querySelector('.tabs_content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : '—';

  return (
    <div className="app">
      <section className="hero-section">
        <img
          className="hero-img"
          src={`${path}assets/img/default-background-2.jpg`}
          alt="Satellite view of the Strait of Hormuz"
        />

        <div className="hero-grain" />

        <HeroPubs />

        <div className="hero-content">
          <h1>
            Strait of Hormuz
            <br />
            <span className="accent">Dashboard</span>
          </h1>

          <p className="text-center">
            Tracking the potential impact on global shipping, food, energy, and finance.
          </p>

          <div
            className={`datePickerContainer in-hero ${isFixed ? 'fixedDatePicker' : ''}`}
            ref={datePickerRefScroll}
          >
            <CalendarDatePicker
              selectedDate={selectedDate}
              onChange={setSelectedDate}
              onCustomDateSelect={setCustomDate}
            />
            ;
          </div>
        </div>
      </section>

      <div className="app_content">
        <section className="indicators-grid">
          <CardIndicator
            isActive={activeSection === 'shipping'}
            onClick={() => changeTab('.tab_content_global', 'Shipping', 'shipping')}
            icon={<IconShipping />}
            label="Shipping"
            metric="Ship transits"
            formattedDate={formattedSelectedDate}
            series={seriesTransit}
            valueName="transits"
            selectedDate={selectedDate}
            frequency="Daily"
          />

          <CardIndicator
            isActive={activeSection === 'food'}
            onClick={() => changeTab('.tab_content_food', 'Food', 'food')}
            icon={<IconFood />}
            label="Food"
            metric="Commodity food prices"
            formattedDate={formattedSelectedDate}
            series={seriesWheatAgriculture}
            valueName="index"
            selectedDate={selectedDate}
            frequency="Daily"
          />

          <CardIndicator
            isActive={activeSection === 'energy'}
            onClick={() => changeTab('.tab_content_energy', 'Energy', 'energy')}
            icon={<IconEnergy />}
            label="Energy"
            metric="Crude oil price, Europe"
            formattedDate={formattedSelectedDate}
            series={seriesEnergy}
            valueName="europe"
            selectedDate={selectedDate}
            frequency="Daily"
          />

          <CardIndicator
            isActive={activeSection === 'finance'}
            onClick={() => changeTab('.tab_content_finance', 'Finance', 'finance')}
            icon={<IconFinance />}
            label="Finance"
            metric="Stock prices for emerging markets"
            formattedDate={formattedSelectedDate}
            series={seriesStockPrices}
            valueName="emerging"
            selectedDate={selectedDate}
            frequency="Daily"
          />
        </section>

        <div className="tabs_content">
          <CardDetails
            tabContentClass="tab_content_global"
            icon={<IconShipping />}
            title="Shipping Indicators"
            subtitle="Maritime traffic and fuel costs through the Strait"
            downloadFile="bulk_data_shipping.xlsx"
            downloadLabel="Download shipping dataset"
            onClose={() => closeAll(true)}
          >
            <ChartContainer
              title="Transit through the Strait of Hormuz"
              id="datawrapper-chart-CtUz4"
              src="https://datawrapper.dwcdn.net/CtUz4"
              meta={[{ label: 'Transits', value_name: 'transits' }]}
              series={seriesTransit}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Cost of marine fuel"
              id="datawrapper-chart-nK6Hr"
              src="https://datawrapper.dwcdn.net/nK6Hr"
              meta={[
                { label: 'High sulphur', value_name: 'highsulfur' },
                { label: 'Low sulphur', value_name: 'lowsulfur' },
              ]}
              series={seriesMarineFuel}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Freight costs for shipping oil"
              id="datawrapper-chart-CwGjy"
              src="https://datawrapper.dwcdn.net/CwGjy"
              meta={[
                { label: 'Dirty tankers', value_name: 'dirty_tanker' },
                { label: ' Clean tankers', value_name: 'clean_tanker' },
              ]}
              series={seriesFreightOil}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Freight costs for containers and bulk"
              id="datawrapper-chart-RY0Fg"
              src="https://datawrapper.dwcdn.net/RY0Fg"
              meta={[
                { label: 'Containers', value_name: 'containers' },
                { label: ' Bulk', value_name: 'bulk' },
              ]}
              series={seriesFreightContainerBulk}
              frequency="Weekly"
              selected_date={selectedDate}
            />
          </CardDetails>

          <CardDetails
            tabContentClass="tab_content_food"
            icon={<IconFood />}
            title="Food Indicators"
            subtitle="Prices, inflation, and fertilizer costs worldwide"
            downloadFile="bulk_data_food.xlsx"
            downloadLabel="Download food dataset"
            onClose={() => closeAll(true)}
          >
            <ChartContainer
              title="FAO Food Price Index"
              id="datawrapper-chart-3spao"
              src="https://datawrapper.dwcdn.net/3spao"
              meta={[{ label: 'FAO Food Price Index', value_name: 'value' }]}
              series={seriesFaoFoodPriceIndex}
              frequency="Monthly"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Commodity food prices"
              id="datawrapper-chart-xe9L9"
              src="https://datawrapper.dwcdn.net/xe9L9"
              meta={[{ label: 'Agricultural and Livestock Index', value_name: 'index' }]}
              series={seriesWheatAgriculture}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Fertilizer prices"
              id="datawrapper-chart-E2VH4"
              src="https://datawrapper.dwcdn.net/E2VH4"
              meta={[
                { label: 'Diammonium Phosphate', value_name: 'diammonium' },
                { label: 'Urea', value_name: 'urea' },
              ]}
              series={seriesWBFertilizerIndex}
              frequency="Weekly"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Food price inflation"
              id="datawrapper-chart-pKWw6"
              src="https://datawrapper.dwcdn.net/pKWw6"
              meta={[{ label: 'Developing economies', value_name: 'med_developing' }]}
              series={seriesFoodPriceInflation}
              frequency="Monthly"
              selected_date={selectedDate}
              methodology="Data on year-on-year monthly food price inflation based on consumer price subindices across 139 countries. UN country group classifications. Group aggregates represent median values, with latest data points used when 80% of countries in the group have data available."
            />
          </CardDetails>

          <CardDetails
            tabContentClass="tab_content_energy"
            icon={<IconEnergy />}
            title="Energy Indicators"
            subtitle="Oil, gas, and biofuel prices globally"
            downloadFile="bulk_data_energy.xlsx"
            downloadLabel="Download energy dataset"
            onClose={() => closeAll(true)}
          >
            <ChartContainer
              title="Oil prices"
              id="datawrapper-chart-EYPxo"
              src="https://datawrapper.dwcdn.net/EYPxo"
              meta={[
                { label: 'Europe', value_name: 'europe' },
                { label: 'Middle East', value_name: 'middleeast' },
                { label: 'Russian Federation', value_name: 'russia' },
              ]}
              series={seriesEnergy}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Natural gas prices"
              id="datawrapper-chart-6oB41"
              src="https://datawrapper.dwcdn.net/6oB41"
              meta={[
                { label: 'Asia', value_name: 'asia' },
                { label: 'Europe', value_name: 'europe' },
                { label: 'North America', value_name: 'us' },
              ]}
              series={seriesNaturalgasPrices}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Petroleum gas prices"
              id="datawrapper-chart-74dPn"
              src="https://datawrapper.dwcdn.net/74dPn"
              meta={[
                { label: 'Middle East', value_name: 'pro_middleeast' },
                { label: 'Europe', value_name: 'pro_europe' },
                { label: 'North America', value_name: 'pro_america' },
              ]}
              series={seriesPetroleumgasPrices}
              frequency="Weekly"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="Biofuel prices"
              id="datawrapper-chart-awQuD"
              src="https://datawrapper.dwcdn.net/awQuD"
              meta={[{ label: 'Biofuel', value_name: 'biofuels' }]}
              series={serieBiofuelPrices}
              frequency="Daily"
              selected_date={selectedDate}
            />
          </CardDetails>

          <CardDetails
            tabContentClass="tab_content_finance"
            icon={<IconFinance />}
            title="Finance Indicators"
            subtitle="Exchange rates, reserves, and bond markets"
            downloadFile="bulk_data_finance.xlsx"
            downloadLabel="Download finance dataset"
            onClose={() => closeAll(true)}
          >
            <ChartContainer
              title="Exchange rates"
              id="datawrapper-chart-69yXd"
              src="https://datawrapper.dwcdn.net/69yXd"
              meta={[
                { label: 'Africa', value_name: 'Africa' },
                { label: 'Developing Asia and Oceania', value_name: 'Asia' },
                { label: 'Latin America and the Caribbean', value_name: 'America' },
              ]}
              series={seriesExchangeRates}
              frequency="Daily"
              selected_date={selectedDate}
              methodology="Data on daily exchange rate of 139 currencies against the US Dollar. UN country group classifications. Group aggregates represent the median value."
            />
            <ChartContainer
              title="Stock prices"
              id="datawrapper-chart-u7z7Q"
              src="https://datawrapper.dwcdn.net/u7z7Q"
              meta={[{ label: 'Emerging economies', value_name: 'emerging' }]}
              series={seriesStockPrices}
              frequency="Daily"
              selected_date={selectedDate}
            />
            <ChartContainer
              title="International reserves"
              id="datawrapper-chart-r91nz"
              src="https://datawrapper.dwcdn.net/r91nz"
              meta={[
                { label: 'Africa', value_name: 'Africa' },
                { label: 'Developing Asia and Oceania', value_name: 'Asia' },
                { label: 'Latin America and the Caribbean', value_name: 'America' },
              ]}
              series={seriesInternationalReserves}
              frequency="Monthly"
              selected_date={selectedDate}
              methodology="Data on international reserves for 189 economies. UN country group classifications. Group aggregates are the total sum of reserves, with latest data points used when 80% of countries in the group have data available."
            />
            <ChartContainer
              title="Inflation"
              id="datawrapper-chart-HJO3x"
              src="https://datawrapper.dwcdn.net/HJO3x"
              meta={[{ label: 'Developing economies', value_name: 'med_developing' }]}
              series={seriesInflationRegion}
              frequency="Monthly"
              selected_date={selectedDate}
              methodology="Data on monthly inflation rates of 163 economies. UN country group classifications. Group aggregates represent the median value, with latest data points used when 80% of countries in the group have data available."
            />
          </CardDetails>
        </div>

        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
