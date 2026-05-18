'use client'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { removeToken } from '@/utils/tokenStorage'
import useAxios from '@/hooks/useAxios'

const useLogout = () => {
  const axios = useAxios()

  const logout = useCallback(async () => {
    try {
      const res = await axios.post('/auth/logout', {}, { withCredentials: true })

      console.log('Logout Response:', res)

      if (res.status === 200 && res.data.success) {
        toast.success('Logout successful')
        removeToken()
        window.location.href = '/login'
      } else {
        toast.error(res.data.message || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Something went wrong during logout')
    }
  }, [axios])

  return logout
}

export default useLogout
