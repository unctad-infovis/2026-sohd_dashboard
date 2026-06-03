import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import '../styles/styles.less';

import scrollIntoView from 'scroll-into-view';
import useSeriesData from './hooks/useSeriesData.js';
import HeroPubs from './components/HeroPubs.jsx';
import CalendarDatePicker from './components/CalendarDatePicker.jsx';
import CardIndicator from './components/CardIndicator.jsx';
import CardIndicatorMini from './components/CardIndicatorMini.jsx';
import CardDetails from './components/CardDetails.jsx';
import ChartContainer from './components/ChartContainer.jsx';
import dashboardCharts from './config/dashboardCharts.js';
import dashboardSections from './config/dashboardSections.js';
import useFixedOnScroll from './hooks/useFixedOnScroll.js';
import useMobileDetailMenuVisibility from './hooks/useCardIndicatorMini.js';

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

  const datePickerRefScroll = useRef(null);
  const isFixed = useFixedOnScroll(datePickerRefScroll, 200);
  const showMobileDetailMenu = useMobileDetailMenuVisibility({
    activeSection,
    items: dashboardSections,
    appSelector: appID,
  });

  const [
    shippingSection,
    foodSection,
    energySection,
    financeSection,
  ] = dashboardSections;

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

  const selectSection = (section) => {
    changeTab(section.tabClass, section.tabName, section.section);
  };

  const setDashboardDate = (date) => {
    setSelectedDate(new Date(date));

    if (window.innerWidth <= 768 && !activeSection) {
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

  const indicatorSeriesByKey = {
    seriesTransit,
    seriesWheatAgriculture,
    seriesEnergy,
    seriesStockPrices,
  };

  const chartSeriesByKey = {
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
  };

  const renderChartsForSection = (section) => dashboardCharts
    .filter((chart) => chart.section === section && chart.enabled !== false)
    .map((chart) => (
      <ChartContainer
        key={chart.id}
        title={chart.title}
        id={chart.id}
        src={chart.src}
        meta={chart.meta}
        series={chartSeriesByKey[chart.seriesKey]}
        frequency={chart.frequency}
        selected_date={selectedDate}
        methodology={chart.methodology}
      />
    ));

  const ShippingIcon = shippingSection.Icon;
  const FoodIcon = foodSection.Icon;
  const EnergyIcon = energySection.Icon;
  const FinanceIcon = financeSection.Icon;

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
            Tracking the impact on global shipping, food, energy, and finance.
          </p>

          <div
            className={`datePickerContainer in-hero ${isFixed ? 'fixedDatePicker' : ''}`}
            ref={datePickerRefScroll}
          >
            <CalendarDatePicker
              selectedDate={selectedDate}
              onChange={setDashboardDate}
              onCustomDateSelect={setDashboardDate}
            />
          </div>
        </div>
      </section>

      <div className="app_content">
        <section className="indicators-grid">
          {dashboardSections.map((section) => {
            const { Icon } = section;

            return (
              <CardIndicator
                key={section.section}
                isActive={activeSection === section.section}
                onClick={() => selectSection(section)}
                icon={<Icon />}
                label={section.label}
                metric={section.indicatorMetric}
                formattedDate={formattedSelectedDate}
                series={indicatorSeriesByKey[section.indicatorSeriesKey]}
                valueName={section.indicatorValueName}
                selectedDate={selectedDate}
                frequency={section.indicatorFrequency}
              />
            );
          })}
        </section>

        <CardIndicatorMini
          items={dashboardSections}
          activeSection={activeSection}
          visible={showMobileDetailMenu}
          onSelect={selectSection}
        />

        <div
          className={`mobile-date-bar${isFixed ? ' visible' : ''}`}
          aria-label="Selected reference date"
        >
          <CalendarDatePicker
            selectedDate={selectedDate}
            onChange={setDashboardDate}
            onCustomDateSelect={setDashboardDate}
          />
        </div>

        <div className="tabs_content">
          <CardDetails
            tabContentClass={shippingSection.tabContentClass}
            icon={<ShippingIcon />}
            title={shippingSection.detailTitle}
            subtitle={shippingSection.detailSubtitle}
            onClose={() => closeAll(true)}
          >
            {renderChartsForSection(shippingSection.section)}
          </CardDetails>

          <CardDetails
            tabContentClass={foodSection.tabContentClass}
            icon={<FoodIcon />}
            title={foodSection.detailTitle}
            subtitle={foodSection.detailSubtitle}
            onClose={() => closeAll(true)}
          >
            {renderChartsForSection(foodSection.section)}
          </CardDetails>

          <CardDetails
            tabContentClass={energySection.tabContentClass}
            icon={<EnergyIcon />}
            title={energySection.detailTitle}
            subtitle={energySection.detailSubtitle}
            onClose={() => closeAll(true)}
          >
            {renderChartsForSection(energySection.section)}
          </CardDetails>

          <CardDetails
            tabContentClass={financeSection.tabContentClass}
            icon={<FinanceIcon />}
            title={financeSection.detailTitle}
            subtitle={financeSection.detailSubtitle}
            onClose={() => closeAll(true)}
          >
            {renderChartsForSection(financeSection.section)}
          </CardDetails>
        </div>
        <p className="dashboard-note">
          The dashboard tracks key market indicators since the Strait of Hormuz disruptions began on 27 February 2026. Trends may reflect wider global conditions.
        </p>

        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
