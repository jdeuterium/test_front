import {dataState, IDataState} from "../common";
import {IAuth} from "../../models";
import {loginApi, unLoginApi} from "../../api";
import {Dispatch} from "redux";

const LOGIN_REQUEST_START = 'LOGIN_REQUEST_START';
const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';
const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';

const UNLOGIN_REQUEST_START = 'UNLOGIN_REQUEST_START';
const UNLOGIN_REQUEST_SUCCESS = 'UNLOGIN_REQUEST_SUCCESS';
const UNLOGIN_REQUEST_ERROR = 'UNLOGIN_REQUEST_ERROR';

export interface IObjState {
    token: string;
    state: IDataState;
    error?: {};
}

const initialState: IObjState = {
    token: '',
    state: dataState.NoFetched,
    error: {}
}

interface IAction {
    type: typeof LOGIN_REQUEST_START
        | typeof LOGIN_REQUEST_ERROR
        | typeof LOGIN_REQUEST_SUCCESS
        | typeof UNLOGIN_REQUEST_START
        | typeof UNLOGIN_REQUEST_SUCCESS
        | typeof UNLOGIN_REQUEST_ERROR;
    data: string;
    error?: {};
}

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_REQUEST_START:
        case UNLOGIN_REQUEST_START:
            return {
                ...state,
                state: dataState.Fetching
            };
        case LOGIN_REQUEST_ERROR:
        case UNLOGIN_REQUEST_ERROR:
            return {
                ...state,
                state: dataState.Failed,
                error: action.error
            };
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                state: dataState.Fetched,
                token: action.data
            };
        case UNLOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                state: dataState.NoFetched,
                token: action.data
            };
        default:
            return state;
    }
}

export const login = async (data: IAuth, dispatch: Dispatch): Promise<void> => {
    dispatch({type: LOGIN_REQUEST_START});

    const response = await loginApi(data);

    if (response.data.status === 'ok') {
        dispatch({type: LOGIN_REQUEST_SUCCESS, data: response.data.token});
    }

    if (response.data.status === 'error') {
        dispatch({type: LOGIN_REQUEST_ERROR, error: response.data.message})
    }
}

export const unLogin = async (token: string, dispatch: Dispatch): Promise<void> => {
    dispatch({type: UNLOGIN_REQUEST_START});

    const response = await unLoginApi(token);

    if (response.data.status === 'ok') {
        dispatch({type: UNLOGIN_REQUEST_SUCCESS, data: response.data.token});
    }

    if (response.data.status === 'error') {
        dispatch({type: UNLOGIN_REQUEST_ERROR, error: response.data.message})
    }
}

export interface IState {
    auth: IObjState;
}

export const selectAuth = (state: IState) => state.auth.token;
export const selectAuthState = (state: IState) => state.auth.state;
export const selectAuthError = (state: IState) => state.auth.error ? state.auth.error : null;