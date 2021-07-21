export type IDataState = 'noFetched' | 'fetching' | 'fetched' | 'failed';
export enum dataState {
    NoFetched = 'noFetched',
    Fetching = 'fetching',
    Fetched = 'fetched',
    Failed = 'failed',
}