import {axiosInstans} from "../common";
import {AxiosResponse} from "axios";
import {IAuth} from "../../models";

export const loginApi = (data: IAuth): Promise<AxiosResponse<any>> => axiosInstans.post('login/', data);
export const isAuthorizedApi = (data: IAuth): Promise<AxiosResponse<any>> => axiosInstans.post('isAuthorized/', data);
export const unLoginApi = (token: string): Promise<AxiosResponse<any>> => axiosInstans.post('unlogin/', {token});