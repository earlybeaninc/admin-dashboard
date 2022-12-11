import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropType from 'prop-types';

import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import AppRouter from './routers/AppRouter';

// ----------------------------------------------------------------------

function App({ store, persistor }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ScrollToTop />
            <BaseOptionChartStyle />
            <AppRouter />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>  
  );
};

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired
};

export default App;
