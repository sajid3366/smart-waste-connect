
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'


export const setToken = ({ accessToken, refreshToken }: {
    accessToken: string; refreshToken: string
}) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
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
    }
}
