import Image from 'next/image'
import smartWasteLogo from '../../../public/images/smart-waste-small-logo.png'
import { IoIosArrowRoundForward } from 'react-icons/io'

export default function CustomerCoupon () {
  return (
    <div className='bg-slate-50 h-[380px]  flex gap-x-10 w-full p-10 justify-between'>
      <div className='w-[450px] text-[70px] bg-gradient-to-r from-primaryGreen to-secondaryGreen rounded-tl-[18px] rounded-br-[18px] py-5 px-8 text-white uppercase text-center'>
        Get 30% <br className='' /> Off
      </div>
      <div className='flex-col pr-5 max-w-[500px]'>
        <div className='flex justify-end'>
          <Image
            width={100}
            height={100}
            src={smartWasteLogo}
            alt='smart waste logo'
          />
        </div>
        <div className='flex-col mt-5'>
          <h1 className='text-6xl text-end'>Get Your 30% Off Today On</h1>
          <div className='flex justify-end mt-4'>
            <p className='text-center bg-secondaryGreen text-white text-xl py-2 px-5 rounded-tr-[8px] rounded-bl-[8px] w-[150px] flex items-center'>
              Pick Up <IoIosArrowRoundForward />

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
