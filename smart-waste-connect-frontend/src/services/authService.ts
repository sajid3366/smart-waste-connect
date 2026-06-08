import BASEURL from '@/hooks/useAxios'

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
        return await BASEURL.post(`/auth/signup`, payload)
    },
    login: async (payload: LoginParams) => {
        return await BASEURL.post(`/auth/login`, payload)
    },

    logout: async () => {
        return await BASEURL.post(`/auth/logout`)
    },

    getCurrentUserProfile: async () => {
        return await BASEURL.get(`/auth/profile`)
    },
    changePassword: async (current_password: string, new_password: string) => {
        return await BASEURL.patch(`/auth/change-password`, { current_password, new_password })
    }

}

export default authService;