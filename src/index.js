// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import configureStore from './redux/store/store';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { onAuthStateFail, onAuthStateSuccess } from './redux/actions/authActions';

// ----------------------------------------------------------------------

const { store, persistor } = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
const authToken = JSON.parse(localStorage.getItem('authToken'));
const user = JSON.parse(localStorage.getItem('user'));

if (user && authToken) {
  store.dispatch(onAuthStateSuccess(user));
} else {
  store.dispatch(onAuthStateFail('Failed to authenticate'));
}

root.render(
  <HelmetProvider>
    <App store={store} persistor={persistor} />
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
