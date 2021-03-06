import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: ['localPerformanceData', 'performerData'],
   // blacklist: 'performerData'
}

let persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
   let store = createStore(
      persistedReducer,
      {},
      applyMiddleware(thunk)
   );
   let persistor = persistStore(store);
   return { persistor, store };
}
