import {dataState, IDataState} from "../common";
import {ITask, ITaskQueryParams} from "../../models";
import {getTasksApi} from "../../api";
import {Dispatch} from "redux";

const GET_TASKS_REQUEST_START = 'GET_TASKS_REQUEST_START';
const GET_TASKS_REQUEST_ERROR = 'GET_TASKS_REQUEST_ERROR';
const GET_TASKS_REQUEST_SUCCESS = 'GET_TASKS_REQUEST_SUCCESS';

export interface IObjState {
    data: {
        tasks: ITask[],
        total_task_count: number | null;
    };
    state: IDataState;
    error?: {};
}

const initialState: IObjState = {
    data: {
        tasks: [],
        total_task_count: null
    },
    state: dataState.NoFetched,
    error: {}
}

interface IAction {
    type: typeof GET_TASKS_REQUEST_START
        | typeof GET_TASKS_REQUEST_ERROR
        | typeof GET_TASKS_REQUEST_SUCCESS;
    data: {
        message: {
            tasks: ITask[],
            total_task_count: number;
        },
        status: "ok" | "error"
    };
    error?: {};
}

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case GET_TASKS_REQUEST_START:
            return {
                ...state,
                state: dataState.Fetching
            };
        case GET_TASKS_REQUEST_ERROR:
            return {
                ...state,
                state: dataState.Failed,
                error: action.error
            };
        case GET_TASKS_REQUEST_SUCCESS:
            return {
                ...state,
                state: dataState.Fetched,
                data: action.data.message
            };
        default:
            return state;
    }
}

export const getTasks = async (queryParams: ITaskQueryParams, dispatch: Dispatch): Promise<void> => {
    dispatch({type: GET_TASKS_REQUEST_START});

    try {
        const response = await getTasksApi(queryParams);
        dispatch({type: GET_TASKS_REQUEST_SUCCESS, data: response.data});
    } catch (error) {
        dispatch({type: GET_TASKS_REQUEST_ERROR, errorText: error.message})
    }
}

export interface IState {
    tasks: IObjState;
}

export const selectTasks = (state: IState) => state.tasks.data;
export const selectTasksState = (state: IState) => state.tasks.state;
export const selectTasksError = (state: IState) => state.tasks.error ? state.tasks.error : null;