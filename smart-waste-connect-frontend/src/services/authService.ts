import useAxios from "@/hooks/useAxios";
import { get } from "http";

const Axios = useAxios();
interface LoginParams {
    phone: string;
    password: string;
}

const authService ={
    signup: async (payload: any) =>{
        return await Axios.post(`/auth/signup`, payload)
    },
    login: async (payload: LoginParams) => {
        return await Axios.post(`/auth/login`, payload)
    },

    logout: async () => {
        return await Axios.post(`/auth/logout`)
    },

    getCurrentUserProfile: async () => {
        return await Axios.get(`/auth/profile`)
    }

}

export default authService;