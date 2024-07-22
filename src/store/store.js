import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage'
import {persistStore , persistReducer} from "redux-persist";


const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean)
const composeEnhancer = (process.env.NODEENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

//root reducer
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)