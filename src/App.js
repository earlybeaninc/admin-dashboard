import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropType from 'prop-types';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ThemeProvider from './theme';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import AppRouter from './routers/AppRouter';
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import LoadingScreen from './components/LoadingScreen';

// ----------------------------------------------------------------------

function App({ store, persistor }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen isDashboard={false} />} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider>
              <ThemeColorPresets>
                <RtlLayout>
                  <NotistackProvider>
                      <MotionLazyContainer>
                        <ScrollToTop />
                        <BaseOptionChartStyle />
                        <Settings />
                        <AppRouter />
                      </MotionLazyContainer>
                  </NotistackProvider>
                </RtlLayout>
              </ThemeColorPresets>
            </ThemeProvider>
          </LocalizationProvider>
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
