import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import {thunk} from 'redux-thunk';

// Only include thunk middleware
const middleWares = [thunk];

const composedEnhancers = applyMiddleware(...middleWares);

// root reducer
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
