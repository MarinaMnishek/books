import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { commonReducer } from './reducers/commonReducer';
import { getListOfBooksReducer } from './reducers/getListOfBooksReducer';

const rootReducer = combineReducers({
    search: getListOfBooksReducer,
    common: commonReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)