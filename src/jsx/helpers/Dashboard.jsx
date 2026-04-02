import React from 'react';
import PropTypes from 'prop-types';

import DashBoardItem from './DashBoardItem.jsx';

function DashBoard({
  appID, seriesFaoFoodPriceIndex, seriesEnergy, seriesClarkson, seriesBondSpread
}) {
  const path = process.env.PUBLIC_URL;

  return (
    <div className="dashboard_items">
      <DashBoardItem idx="0" image={`${path}/assets/img/icons/sohd-2026-shipping-w.svg`} series={seriesFaoFoodPriceIndex} series_value_name="value" title="Food price" unit="%" appID={appID} />
      <DashBoardItem idx="1" image={`${path}/assets/img/icons/sohd-2026-food-w.png`} series={seriesEnergy} series_value_name="crude_oil_price" title="Crude oil price" unit="%" appID={appID} />
      <DashBoardItem idx="2" image={`${path}/assets/img/icons/sohd-2026-energy-w.png`} series={seriesClarkson} series_value_name="clarksea_index" title="Shipping prices" unit="%" appID={appID} />
      <DashBoardItem idx="3" image={`${path}/assets/img/icons/sohd-2026-finance-w.png`} series={seriesBondSpread} series_value_name="bond_spread_sovereign" title="Emerging markets: Sovereign bond spread" unit="%" appID={appID} />
    </div>
  );
}

DashBoard.propTypes = {
  appID: PropTypes.string.isRequired,
  seriesFaoFoodPriceIndex: PropTypes.instanceOf(Array).isRequired,
  seriesEnergy: PropTypes.instanceOf(Array).isRequired,
  seriesClarkson: PropTypes.instanceOf(Array).isRequired,
  seriesBondSpread: PropTypes.instanceOf(Array).isRequired
};

DashBoard.defaultProps = {
};

export default DashBoard;
