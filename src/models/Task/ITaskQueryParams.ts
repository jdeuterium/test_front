export default interface ITaskQueryParams {
    sort_field: 'id' | 'username' | 'email' | 'status';
    sort_direction: 'asc' | 'desc';
    page: number;
}