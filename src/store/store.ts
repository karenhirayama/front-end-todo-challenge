import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import todosReducer from "./reducers/Reducer";

export const store = createStore(todosReducer, applyMiddleware(thunk))