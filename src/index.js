import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Routes from "../routes";
const middlewares = [thunkMiddleware, createLogger()];
import ChatReducer from './reducers/chatReducer';
import GroupsReducer from './reducers/groupsReducer';
import DirectMessagesReducer from './reducers/directMessagesReducer';
import UserInfoReducer from './reducers/userInfoReducer';
import "./styles/styles.scss";

const initialStoreState = {
    groups: [],
    directMessages: [],
    userInfo: {},
    chat: []
};

const reducers = combineReducers({
    groups: GroupsReducer,
    directMessages: DirectMessagesReducer,
    userInfo: UserInfoReducer,
    chat: ChatReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialStoreState, composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('app')
);