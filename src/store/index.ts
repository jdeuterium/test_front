import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {default as tasks} from './Task';
import {default as auth} from './Auth';
import {default as queryParams} from './QueryParams';

export {
    getTasks,
    selectTasks,
    selectTasksError,
    selectTasksState
} from './Task';
export {
    login,
    unLogin,
    selectAuth,
    selectAuthError,
    selectAuthState
} from './Auth';
export {setQueryParams, selectQueryParams} from './QueryParams';

const loggerMiddleware = createLogger();
const reducers = combineReducers({
    tasks,
    auth,
    queryParams
});

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;