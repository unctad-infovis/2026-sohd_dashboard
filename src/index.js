import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';
import AppMini from './jsx/AppMini.jsx';

const dashboard = document.getElementById('app-root-2026-sohd_dashboard');
if (dashboard) {
  const root = createRoot(dashboard);
  root.render(<App />);
}

const dashboardMini = document.getElementById('app-root-2026-sohd_dashboard_mini');
if (dashboardMini) {
  const root = createRoot(dashboardMini);
  root.render(<AppMini />);
}
