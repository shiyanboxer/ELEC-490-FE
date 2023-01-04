import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { ResponseProvider } from './components/response/ResponseContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ResponseProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ResponseProvider>
    </ThemeProvider>
  );
}
