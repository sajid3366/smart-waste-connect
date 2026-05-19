import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const ROLE_KEY = 'role'


export const setToken = ({ accessToken, refreshToken, role }: {
    accessToken: string; refreshToken: string; role: string
}) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        Cookies.set(ROLE_KEY, role, { expires: 7 })
    }
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        }
    }
    return null
}

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        Cookies.remove(ROLE_KEY)
    }
}
