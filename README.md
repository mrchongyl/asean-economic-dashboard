# ASEAN World Bank Dashboard

<img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/da6f190e-7a45-48e5-9140-1f02361194b7/deploy-status">

A modern, Apple-inspired dashboard for visualizing ASEAN's economic data from the World Bank API. This project features visualization with interactive charts and tables for economics data.

## Features & Accomplishments

✅ **Data Integration & Visualization:**
- API integration with World Bank Data360
- Interactive data visualization with Chart.js
- Compare GDP, inflation, CPI, credit card usage, and mobile/internet banking
- Integrated Chart.js for interactive line charts and stacked comparisons
- Built custom visualization components for economic data
- Added statistical analysis with regression lines and R² values

✅ **User Interface & Experience:**
- Responsive design for all device sizes
- Data table with sorting and pagination
- CSV export functionality
- Time range filtering
- Summary statistics and regression analysis
- Implemented responsive UI with Tailwind CSS and Apple-inspired design
- Created reusable components for charts, tables, and navigation
- Added comprehensive error handling and loading states

✅ **Development & Architecture:**
- Built modern React + TypeScript application with Vite
- Migrated from Flask to Netlify serverless functions
- Created dedicated API endpoints for each economic indicator
- Optimized data fetching and error handling
- Configured CORS and proper HTTP response handling

✅ **Deployment & Infrastructure:**
- Successfully deployed to Netlify with continuous deployment
- Configured serverless functions for backend API endpoints
- Set up automatic redirects and build configuration

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Chart.js
- **Backend:** Netlify Serverless Functions (previously Flask)
- **Data fetching:** Axios, React Query
- **UI Components:** Tailwind CSS styled in Apple-inspired design
- **Build Tools:** Vite, ESLint, PostCSS
- **Deployment:** Netlify with continuous deployment
- **Statistics:** Simple Statistics, Regression.js

## Getting Started

### Prerequisites

- Node.js (v14+)

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the Application

**Development Mode:**

```bash
npm run dev
```

**Production Build:**

```bash
npm run build
npm run preview
```

Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

**Live Demo:** The application is deployed on Netlify and updates automatically with each commit.

## Project Structure

- `/src` - React frontend code
  - `/components` - UI components (Header, Footer, TabNavigation)
    - `/tabs` - Tab-specific components for each economic indicator
    - `/ui` - Reusable UI components (LoadingSpinner, ErrorMessage)
    - `/visualizations` - Chart and table components
  - `/services` - API service functions
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions for data processing
- `/netlify/functions` - Serverless backend functions
- `/dist` - Production build output

## API Endpoints

All endpoints are now served via Netlify serverless functions:

- `GET /api/gdp-per-capita` - Fetch GDP per capita data for Malaysia
- `GET /api/inflation` - Fetch annual inflation rate (CPI, %)
- `GET /api/cpi` - Fetch Consumer Price Index (CPI) data
- `GET /api/credit-card-usage?unit=10P3AD` - Fetch credit card usage per 1,000 adults
- `GET /api/mobile-internet-banking?unit=10P3AD` - Fetch mobile & internet banking usage per 1,000 adults

## Data Sources

This dashboard uses the World Bank Data360 API:
- GDP per capita (current US$): https://data360api.worldbank.org/data360/data?DATABASE_ID=WB_WDI&INDICATOR=WB_WDI_NY_GDP_PCAP_CD&REF_AREA=MYS
- Inflation, consumer prices (annual % growth): https://data360api.worldbank.org/data360/data?DATABASE_ID=WB_WDI&INDICATOR=WB_WDI_FP_CPI_TOTL_ZG&REF_AREA=MYS
- Consumer price index (2010 = 100): https://data360api.worldbank.org/data360/data?DATABASE_ID=WB_WDI&INDICATOR=WB_WDI_FP_CPI_TOTL&REF_AREA=MYS
- Use of Financial Services, Credit cards: https://data360api.worldbank.org/data360/data?DATABASE_ID=IMF_FAS&INDICATOR=IMF_FAS_FCCCC&REF_AREA=MYS
- Use of Financial Services, Mobile and internet banking: https://data360api.worldbank.org/data360/data?DATABASE_ID=IMF_FAS&INDICATOR=IMF_FAS_FCMIBT&REF_AREA=MYS

## Statistical Analysis

- The dashboard provides mean, median, standard deviation, and linear regression (trend line and R²) for each metric.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.

**You are free to:**
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- NonCommercial — You may not use the material for commercial purposes

For more details, see the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/)