import { createStore, applyMiddleware, compose } from 'redux';
import MainReducer from './reducers/mainReducer';

const store = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(MainReducer)

export default store;