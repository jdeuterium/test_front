export default interface ITask {
    id: number;
    username: string;
    email: string;
    text: string;
    status: 0 | 1 | 10 | 11
}