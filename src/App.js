import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropType from 'prop-types';

import ThemeProvider from './theme';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import AppRouter from './routers/AppRouter';
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';

// ----------------------------------------------------------------------

function App({ store, persistor }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <NotistackProvider>
              <ScrollToTop />
              <BaseOptionChartStyle />
              <AppRouter />
            </NotistackProvider>
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
