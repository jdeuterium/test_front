export default interface ITaskUpdateIntent {
    text?: string;
    status?: 0 | 1 | 10 | 11;
    token: string;
}