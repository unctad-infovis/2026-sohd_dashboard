# 2026-sohd_dashboard

**Live demo** https://unctad-infovis.github.io/2026-sohd_dashboard/

## About

Disruptions in the Strait of Hormuz affect global shipping, food, energy, and financial markets, with knock-on effects that fall hardest on vulnerable economies. This project is a live-tracking dashboard following key indicators related to these disruptions over time.

The page renders a date-driven dashboard with four indicator sections — Shipping, Food, Energy, and Finance — each showing headline stat cards and charts, with a calendar date picker letting users step through the data day by day. Content is rendered as a standalone React application embeddable within UNCTAD's Drupal platform.

## Embedding

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-sohd_dashboard/js/2026-sohd_dashboard.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-sohd_dashboard/css/2026-sohd_dashboard.min.css?v=1">
<div class="app-root-2026-sohd_dashboard" id="app-root-2026-sohd_dashboard">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

Update the `?v=` query parameter to match the current build version to bust the cache.

## Rights of usage

Contact Teemo Tebest.

## How to build and develop

This is a Vite + React project.

* `npm install`
* `npm run start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`

## Files and folders

All public assets go to folder `public`.

All source code goes to folder `src`.

## Packages

The following packages are used in this project by default.

### Project specific

* **react-datepicker** — Used to create the calendar

### Build & Dev Server

* **vite** — development server with hot module replacement and production bundler, replaces webpack
* **@vitejs/plugin-react** — adds React and JSX support to Vite

### React

* **react** — UI component library
* **react-dom** — renders React components to the DOM

### Formatter & Linter

* **@biomejs/biome** — formats and lints JS, JSX and CSS files on save, replaces ESLint + Prettier

### Minification

* **terser** — minifies the production JavaScript bundle, removes console.logs in production builds

### MDX

* **@mdx-js/rollup** — Vite/Rollup plugin that compiles MDX files into React components
* **@mdx-js/react** — provides React context for MDX components