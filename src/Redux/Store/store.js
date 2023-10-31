import { createStore } from 'redux';
import rootReducer from '../Reducer/reducer.js';
import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));