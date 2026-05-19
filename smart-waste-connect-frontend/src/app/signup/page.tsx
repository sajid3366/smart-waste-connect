'use client'

import { Spinner } from 'flowbite-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import loginBg from '../../../public/images/sign-bg.png'
import Image from 'next/image'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import authService from '@/services/authService'

type FormValues = {
  full_name: string
  phone: string
  address: string
  email: string
  password: string
  registerAs: string
}

export default function Signup () {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    const userData = {
      full_name: data.full_name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      password: data.password,
      role: data.registerAs
    }

    // console.log(userData, 'user data')

    try {
      const signupRes = await authService.signup(userData)

      if (signupRes.status === 200) {
        toast.success('Signup successful!')
        router.push('/login')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as Error & {
          response?: { data?: { error?: string } }
        }
        console.log(axiosError?.response?.data)
        toast.error(axiosError?.response?.data?.error ?? 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-[#386641] grid grid-cols-9 h-screen'>
      <div className='col-span-5 relative hidden md:block mx-auto'>
        <Image
          className='h-screen w-full object-cover'
          src={loginBg}
          alt='sign in background'
        />
        <div className='absolute top-20 right-0'>
          <Link href={'/'}>
            <span className='bg-white py-3 px-6 text-sm font-medium'>
              <IoArrowBackOutline className='inline mb-0.5' /> Back to Home
            </span>
          </Link>
        </div>
      </div>

      <div className='col-span-9 md:col-span-4 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-10'>
        <h1 className='text-4xl font-bold text-white mb-12'>Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className='flex gap-x-5 justify-between items-center'>
            <div className='w-full'>
              <label className='text-white md:text-lg'>Name</label>
              <input
                {...register('full_name', { required: 'Name is required' })}
                type='text'
                placeholder='Enter your Name'
                className='placeholder:text-sm w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-2'
                disabled={isLoading}
              />
              {errors.full_name && (
                <span className='text-red-500 text-sm'>
                  {errors.full_name.message}
                </span>
              )}
            </div>
            <div className='w-full'>
              {/* Mobile Number */}
              <label className='text-white md:text-lg block'>
                Mobile Number
              </label>
              <input
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^(?:\+88)?01[3-9]\d{8}$/,
                    message: 'Invalid phone number'
                  }
                })}
                type='text'
                placeholder='Enter your Mobile Number'
                className='placeholder:text-sm w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-2'
                disabled={isLoading}
              />
              {errors.phone && (
                <span className='text-red-500 text-sm'>
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className='flex gap-x-5 justify-between items-center'>
            <div className='w-full'>
              {/* Address */}
              <label className='text-white md:text-lg mt-5 block'>
                Address
              </label>
              <input
                {...register('address', { required: 'Address is required' })}
                type='text'
                placeholder='Enter your Address'
                className='placeholder:text-sm w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-2'
                disabled={isLoading}
              />
              {errors.address && (
                <span className='text-red-500 text-sm'>
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className='w-full'>
              {/* Email */}
              <label className='text-white md:text-lg mt-5 block'>
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email'
                  }
                })}
                type='email'
                placeholder='Enter your Email Address'
                className='placeholder:text-sm w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-2'
                disabled={isLoading}
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className='flex gap-x-5 justify-between items-start'>
            <div className='w-full'>
              {/* Password */}
              <label className='text-white md:text-lg mt-5 block'>
                Password
              </label>
              <div className='relative'>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your Password'
                  className='placeholder:text-sm w-full px-3 py-4 bg-white outline-none rounded-[12px] mt-2'
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-6 text-gray-600'
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className='w-full'>
              {/* Register As */}
              <label className='text-white md:text-lg mt-5 block'>
                Register As
              </label>
              <select
                {...register('registerAs', { required: true })}
                className='w-full px-3 py-4 bg-white rounded-[12px] mt-2 outline-none'
                disabled={isLoading}
              >
                <option value='household'>Household</option>
                <option value='buyer'>Buyer</option>
                <option value='driver'>Driver</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-[#7FC155] text-white font-medium py-3 rounded-[12px] mt-8'
            disabled={isLoading}
          >
            {isLoading ? <Spinner aria-label='Loading' /> : 'Sign Up'}
          </button>

          {/* Login Redirect */}
          <p className='text-center mt-5 text-[#D9D9D9] text-sm md:text-base'>
            Already have an account?{' '}
            <Link href='/login' className='text-[#7FC155] font-medium'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
