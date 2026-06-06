import axios from 'axios'

const BASEURL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default BASEURL