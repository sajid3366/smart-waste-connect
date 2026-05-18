import axios from 'axios'

// Create an Axios instance
const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  return instance
}

export default useAxios
