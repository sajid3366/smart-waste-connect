'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Spinner } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import loginBg from '../../../public/images/sign-bg.png'
import { IoArrowBackOutline } from 'react-icons/io5'
import useAxios from '@/hooks/useAxios'
import { useRouter } from 'next/navigation'
import { setToken } from '@/utils/tokenStorage'
import authService from '@/services/authService'
import Cookies from 'js-cookie'

type FormValues = {
  phone: string
  password: string
}

export default function Login () {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const axios = useAxios()
  const router = useRouter()
  const [checked, setChecked] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    const userData = {
      phone: data.phone,
      password: data.password
    }

    // console.log(userData, 'user data')

    try {
      const loginRes = await authService.login(userData)
      console.log(loginRes, 'login response')

      if (loginRes.status === 200) {
        setToken({
          accessToken: loginRes.data.tokens.accessToken,
          refreshToken: loginRes.data.tokens.refreshToken,
          role: loginRes.data.user.role
        })
        
        // if (loginRes?.data?.user?.role === 'admin') {
        //   router.push('/admin-dashboard')
        // } else if (loginRes?.data?.user?.role === 'household') {
        //   router.push('/household-dashboard')
        // } else if (loginRes?.data?.user?.role === 'serviceprovider') {
        //   router.push('/serviceprovider-dashboard')
        // } else if (loginRes?.data?.user?.role === 'buyer') {
        //   router.push('/buyer-dashboard')
        // } else if (loginRes?.data?.user?.role === 'driver') {
        //   router.push('/driver-dashboard')
        // }

        // Cookies.set('role', loginRes.data.user.role, { expires: 7 })
        toast.success('Successfully Logged in')
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-[#386641] h-screen grid grid-cols-9'>
      <div className='col-span-5 relative hidden md:block mx-auto'>
        <Image
          className='h-screen w-full object-cover'
          src={loginBg}
          alt='sign in background'
        ></Image>
        <div className='absolute top-20 right-0'>
          <Link href={'/'}>
            <span className=' bg-white py-3 px-6 text-sm font-medium'>
              <IoArrowBackOutline className='inline mb-0.5' /> Back to Home
            </span>
          </Link>
        </div>
      </div>

      <div className='col-span-9 md:col-span-4 flex flex-col justify-center px-6 md:px-16 lg:px-24'>
        <h1 className='text-4xl font-bold text-white mb-12'>Login</h1>
        {/* login form */}
        <form
          className='mt-'
          onSubmit={e => {
            handleSubmit(onSubmit)(e)
          }}
        >
          <label className='text-white md:text-lg'>Phone Number</label>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                // Valid formats:
                // 017XXXXXXXX or +88017XXXXXXXX
                value: /^(?:\+88)?01[3-9]\d{8}$/,
                message: 'Invalid phone number'
              }
            })}
            type='text'
            placeholder='Phone'
            className='placeholder:text-sm placeholder:text-[#666e78] w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-1'
            disabled={isLoading}
          />

          {errors.phone && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.phone.message}
            </span>
          )}

          <div className='relative mt-6'>
            <label className='text-white md:text-lg'>Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='placeholder:text-sm placeholder:text-[#666e78] w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-1'
              disabled={isLoading}
            />
            <button
              type='button'
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-[50px] cursor-pointer'
              disabled={isLoading}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {errors.password && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.password.message}
            </span>
          )}

          <div className='flex justify-between items-center mt-8'>
            <div className='flex gap-x-2 items-center'>
              <input
                className='cursor-pointer accent-[#7FC155] w-[17px]'
                type='checkbox'
                name='rememberme'
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />

              <p className='text-[14px] md:text-base font-medium text-[#7FC155]'>
                Remember Me
              </p>
            </div>
            <Link
              className=' text-[14px] text-[#7FC155] md:text-base font-medium'
              href='/forget-password'
            >
              Forgot Password?
            </Link>
          </div>

          <div className='flex justify-around mt-14'>
            <button
              type='submit'
              className={`md:text-lg lg:text-xl py-[5px] md:py-[8px] px-[30px] md:px-10 rounded-[8px] cursor-pointer bg-[#7FC155] text-white`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner aria-label='Default status example' />
              ) : (
                'Login'
              )}
            </button>
          </div>
          <p className='text-center mt-10 text-[#D9D9D9] text-sm md:text-base'>
            Don't have an account?{' '}
            <Link className='text-[#7FC155] font-medium' href='/signup'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
