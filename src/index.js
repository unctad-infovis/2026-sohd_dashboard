import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';

const dashboard = document.getElementById('app-root-2026-sohd_dashboard');
if (dashboard) {
  const root = createRoot(dashboard);
  root.render(<App />);
}
