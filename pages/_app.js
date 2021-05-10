import '../styles/App.scss'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { Provider } from "react-redux";
import rootReducer from '../redux/reducers/reducers'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer)
let persistor = persistStore(store)
function MyApp({ Component, pageProps }) {
return (
  <Provider store={store}>
    <PersistGate   persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
);
}

export default MyApp
