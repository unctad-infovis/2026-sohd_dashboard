import { IconEnergy, IconFinance, IconFood, IconShipping } from '../components/Icons.jsx';

const dashboardSections = [
  {
    section: 'shipping',
    tabClass: '.tab_content_global',
    tabContentClass: 'tab_content_global',
    tabName: 'Shipping',
    label: 'Shipping',
    navLabel: 'Shipping indicators',
    detailTitle: 'Shipping Indicators',
    detailSubtitle: 'Maritime traffic and fuel costs through the Strait',
    indicatorMetric: 'Ship transits',
    indicatorValueName: 'transits',
    indicatorFrequency: 'Daily',
    indicatorSeriesKey: 'seriesTransit',
    Icon: IconShipping
  },
  {
    section: 'food',
    tabClass: '.tab_content_food',
    tabContentClass: 'tab_content_food',
    tabName: 'Food',
    label: 'Food',
    navLabel: 'Food indicators',
    detailTitle: 'Food Indicators',
    detailSubtitle: 'Prices, inflation, and fertilizer costs worldwide',
    indicatorMetric: 'Commodity food prices',
    indicatorValueName: 'index',
    indicatorFrequency: 'Daily',
    indicatorSeriesKey: 'seriesWheatAgriculture',
    Icon: IconFood
  },
  {
    section: 'energy',
    tabClass: '.tab_content_energy',
    tabContentClass: 'tab_content_energy',
    tabName: 'Energy',
    label: 'Energy',
    navLabel: 'Energy indicators',
    detailTitle: 'Energy Indicators',
    detailSubtitle: 'Oil, gas, and biofuel prices globally',
    indicatorMetric: 'Crude oil price, Europe',
    indicatorValueName: 'europe',
    indicatorFrequency: 'Daily',
    indicatorSeriesKey: 'seriesEnergy',
    Icon: IconEnergy
  },
  {
    section: 'finance',
    tabClass: '.tab_content_finance',
    tabContentClass: 'tab_content_finance',
    tabName: 'Finance',
    label: 'Finance',
    navLabel: 'Finance indicators',
    detailTitle: 'Finance Indicators',
    detailSubtitle: 'Exchange rates, reserves, and bond markets',
    indicatorMetric: 'Stock prices for emerging markets',
    indicatorValueName: 'emerging',
    indicatorFrequency: 'Daily',
    indicatorSeriesKey: 'seriesStockPrices',
    Icon: IconFinance
  }
];

export default dashboardSections;
