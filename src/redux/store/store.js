import {
	applyMiddleware,
	compose, createStore
  } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSaga';
  
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const authPersistConfig = {
	key: process.env.NODE_ENV === 'production' ? 'early_bean_root' : 'early_bean_root_local',
	storage,
	whitelist: ['auth', 'profile'] // only auth and profile will be persisted
};
  
export default () => {
	const store = createStore(
		persistCombineReducers(authPersistConfig, rootReducer),
		composeEnhancer(applyMiddleware(sagaMiddleware))
	);
	const persistor = persistStore(store);
	sagaMiddleware.run(rootSaga);
	return { store, persistor };
};
  