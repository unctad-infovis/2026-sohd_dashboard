import { useEffect, useState } from 'react';
import BasePath from '../../../helpers/BasePath.js';
import CSVtoJSON from '../../../helpers/CsvToJson.js';

const path = BasePath();
const DATA_CACHE_MINUTES = 10;

const files = ['plot_1a1.csv', 'plot_1b1.csv', 'plot_1c1.csv', 'plot_1d1.csv', 'plot_2a1.csv', 'plot_2b1.csv', 'plot_2c1.csv', 'plot_2d1.csv', 'plot_3a1.csv', 'plot_3b1.csv', 'plot_3c1.csv', 'plot_3d1.csv', 'plot_4a1.csv', 'plot_4b1.csv', 'plot_4c1.csv', 'plot_4d1.csv'];

function useSeriesData() {
  const [seriesTransit, setSeriesTransit] = useState([]);
  const [seriesMarineFuel, setSeriesMarineFuel] = useState([]);
  const [seriesFreightOil, setSeriesFreightOil] = useState([]);
  const [seriesFreightContainerBulk, setSeriesFreightContainerBulk] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);
  const [seriesWheatAgriculture, setSeriesWheatAgriculture] = useState([]);
  const [seriesWBFertilizerIndex, setSeriesWBFertilizerIndex] = useState([]);
  const [seriesFoodPriceInflation, setSeriesFoodPriceInflation] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesNaturalgasPrices, setSeriesNaturalgasPrices] = useState([]);
  const [seriesPetroleumgasPrices, setSeriesPetroleumgasPrices] = useState([]);
  const [serieBiofuelPrices, setSeriesBiofuelPrices] = useState([]);
  const [seriesExchangeRates, setSeriesExchangeRates] = useState([]);
  const [seriesStockPrices, setSeriesStockPrices] = useState([]);
  const [seriesInternationalReserves, setSeriesInternationalReserves] = useState([]);
  const [seriesInflationRegion, setSeriesInflationRegion] = useState([]);

  useEffect(() => {
    const setterMap = {
      'plot_1a1.csv': setSeriesTransit,
      'plot_1b1.csv': setSeriesMarineFuel,
      'plot_1c1.csv': setSeriesFreightOil,
      'plot_1d1.csv': setSeriesFreightContainerBulk,
      'plot_2a1.csv': setSeriesFaoFoodPriceIndex,
      'plot_2b1.csv': setSeriesWheatAgriculture,
      'plot_2c1.csv': setSeriesWBFertilizerIndex,
      'plot_2d1.csv': setSeriesFoodPriceInflation,
      'plot_3a1.csv': setSeriesEnergy,
      'plot_3b1.csv': setSeriesNaturalgasPrices,
      'plot_3c1.csv': setSeriesPetroleumgasPrices,
      'plot_3d1.csv': setSeriesBiofuelPrices,
      'plot_4a1.csv': setSeriesExchangeRates,
      'plot_4b1.csv': setSeriesStockPrices,
      'plot_4c1.csv': setSeriesInternationalReserves,
      'plot_4d1.csv': setSeriesInflationRegion
    };

    files.forEach(file => {
      const dataVersion = Math.floor(Date.now() / (DATA_CACHE_MINUTES * 60 * 1000));
      const dataFile = `${path}assets/data/${file}?v=${dataVersion}`;

      fetch(dataFile, { method: 'GET', cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.text();
        })
        .then(body => {
          const data = CSVtoJSON(body);
          if (data !== false) setterMap[file](data);
        });
    });
  }, []);

  return {
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
    seriesInflationRegion
  };
}

export default useSeriesData;
