import axios from "axios";

export const baseURL = 'http://localhost:3000/~pitaev/test-task-backend/v2/';
export const axiosInstans = axios.create({
    baseURL,
    responseType: 'json',
    params: {developer: 'pitaev'}
});