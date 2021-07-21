import {ITaskQueryParams} from "../../models";
import {Dispatch} from "redux";

const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export interface IObjState {
    data: ITaskQueryParams;
}

const initialState: IObjState = {
    data: {
        sort_field: 'id',
        sort_direction: 'asc',
        page: 1
    }
}

interface IAction {
    type: typeof SET_QUERY_PARAMS;
    data: ITaskQueryParams;
}

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case SET_QUERY_PARAMS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

export const setQueryParams = async (queryParams: ITaskQueryParams, dispatch: Dispatch): Promise<void> => {
    dispatch({type: SET_QUERY_PARAMS, data: queryParams});
}

export interface IState {
    queryParams: IObjState;
}

export const selectQueryParams = (state: IState) => state.queryParams.data;