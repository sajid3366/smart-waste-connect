import axiosInstance from '@/hooks/useAxios'

interface SignupProps {
    phone: string;
    password: string;
    full_name: string;
    email: string;
    address: string;
    role: string;

}
interface LoginParams {
    phone: string;
    password: string;
}

const authService ={
    signup: async (payload: SignupProps) =>{
        return await axiosInstance.post(`/auth/signup`, payload)
    },
    login: async (payload: LoginParams) => {
        return await axiosInstance.post(`/auth/login`, payload)
    },

    logout: async () => {
        return await axiosInstance.post(`/auth/logout`)
    },

    getCurrentUserProfile: async () => {
        return await axiosInstance.get(`/auth/profile`)
    }

}

export default authService;