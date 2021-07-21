import {axiosInstans} from "../common";
import {AxiosResponse} from "axios";
import {ITask, ITaskCreateIntent, ITaskQueryParams, ITaskUpdateIntent} from "../../models";

export const getTasksApi = (queryParams: ITaskQueryParams): Promise<AxiosResponse<ITask[]>> => axiosInstans.get(`?sort_field=${queryParams.sort_field || 'id'}&sort_direction=${queryParams.sort_direction || 'asc'}&page=${queryParams.page || 1}`, );
export const createTaskApi = (data: ITaskCreateIntent): Promise<AxiosResponse<any>> => axiosInstans.post('/create/', data);
export const updateTaskApi = (id: number, data: ITaskUpdateIntent): Promise<AxiosResponse<any>> => axiosInstans.put(`/edit/${id}/`, data);