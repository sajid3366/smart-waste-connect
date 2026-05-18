import Image from 'next/image'
import Link from 'next/link'
import smartWasteLogo from '../../../public/images/smart-waste-small-logo.png'
import { MdKeyboardArrowRight } from 'react-icons/md'

export default function Footer () {
  const user = false
  return (
    //  <footer className="bg-[#f1fcec] text-[#2c3e50] px-6 md:px-20 py-12">
    //   <div className="flex flex-col lg:flex-row justify-between gap-10">
    //     {/* Logo and Brand */}
    //     <div>
    //       <div className="flex items-center gap-3 mb-6">
    //         <Image src={smartWasteLogo} alt="Logo" width={40} height={40} />
    //         <span className="text-2xl font-semibold">Smart Waste Connect</span>
    //       </div>
    //       <p className="text-sm text-gray-600">Creating cleaner cities, one connection at a time.</p>
    //     </div>

    //     {/* Quick Links */}
    //     <div>
    //       <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
    //       <ul className="space-y-2 text-sm">
    //         <li><Link href="/">Home</Link></li>
    //         <li><Link href="/about">About Us</Link></li>
    //         <li><Link href="/services">Services</Link></li>
    //         <li><Link href="/privacy">Privacy Policy</Link></li>
    //       </ul>
    //     </div>

    //     {/* Services / Help */}
    //     <div>
    //       <h3 className="font-semibold text-lg mb-3">Help</h3>
    //       <ul className="space-y-2 text-sm">
    //         <li><Link href="/faq">FAQs</Link></li>
    //         <li><Link href="/contact">Contact Us</Link></li>
    //       </ul>
    //     </div>

    //     {/* Newsletter */}
    //     <div className="w-full max-w-xs">
    //       <h3 className="font-semibold text-lg mb-3">Subscribe to our newsletter</h3>
    //       <form className="flex flex-col gap-3">
    //         <input
    //           type="text"
    //           placeholder="Your name"
    //           className="border-b border-gray-400 bg-transparent py-1 px-2 focus:outline-none"
    //         />
    //         <div className="relative">
    //           <input
    //             type="email"
    //             placeholder="Email address"
    //             className="w-full border-b border-gray-400 bg-transparent py-1 px-2 focus:outline-none"
    //           />
    //           <button
    //             type="submit"
    //             className="absolute right-0 top-0 mt-1 mr-1 rounded-full bg-[#A9DFBF] hover:bg-[#145A32] text-white w-8 h-8 flex items-center justify-center transition"
    //           >
    //             →
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    //   {/* CTA at bottom right (optional if needed) */}
    //   <div className="mt-10 flex flex-col md:flex-row justify-end items-center gap-4">
    //     <p className="text-sm">Ready to get started?</p>
    //     <Link
    //       href="/get-started"
    //       className="bg-gradient-to-br from-[#27ae60] to-[#2ecc71] text-white font-semibold py-2 px-6 rounded-md hover:from-[#3498db] hover:to-[#2980b9] transition"
    //     >
    //       Get Started
    //     </Link>
    //   </div>
    // </footer>

    <footer className='w-full bg-footerBg py-14 bottom-0'>
      <div className='max-w-[1400px] mx-auto'>
        <div className='grid grid-cols-4'>
          {/* For the logo */}
          <div className='col-span-3'>
              <div className='flex items- gap-x-1'>
                <Image
                  className='w-[40px] md:w-[50px]'
                  src={smartWasteLogo}
                  alt='smart waste logo'
                />
                <h1 className='text-xl md:text-3xl font-medium mt-5'>
                  Smart Waste
                </h1>
              </div>
          </div>
          <div className='flex gap-x-5 items-center'>
            <p className='md:mb-0 mb-6'>Ready to get started?</p>
            <Link href={`${user ? '/' : '/login'}`}>
              <p className='text-lg text-white bg-gradient-to-r from-primaryGreen to-secondaryGreen  rounded-sm px-4 py-[6px] cursor-pointer'>
                Get Started
              </p>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-4 mt-12'>
          <div className='opacity-70 space-y-3 mx-auto md:mx-0'>
            <h4 className='text-xl font-semibold'>Important Links</h4>
            <p className='text-sm '>
              <Link href={'/'}>Home</Link>
            </p>
            <p className='text-sm'>
              <Link href={'/about'}>About Us</Link>
            </p>
            <p className='text-sm '>
              <Link href={'/membership'}>Membership</Link>
            </p>
            <p className='text-sm '>
              <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </p>
          </div>
          <div className='opacity-70 space-y-3 mx-auto md:mx-0'>
            <h4 className='text-xl font-semibold'>Our Service</h4>
            <p className='text-sm '>
              <Link href={'/'}>Waste Management</Link>
            </p>
            <p className='text-sm'>
              <Link href={'/'}>Waste Pick Up</Link>
            </p>
           
          </div>
          <div className='opacity-70 space-y-3 mx-auto md:mx-0 '>
            <h4 className='text-xl font-semibold'>Help</h4>
            <p className='text-sm '>
              <Link href={'/'}>FAQs</Link>
            </p>
            <p className='text-sm'>
              <Link href={'/contact'}>Contact Us</Link>
            </p>
          </div>

          {/* Newsletter */}
          <div className='w-full max-w-xs '>
            <h3 className='font-semibold text-xl mb-3 opacity-70'>
              Subscribe to Our Newsletter
            </h3>
            <form className='flex flex-col gap-3 mt-5'>
              <input
                type='text'
                placeholder='Your Name'
                className='border-b border-gray-400 bg-transparent py-1 px-2 focus:outline-none'
              />
              <div className='relative'>
                <input
                  type='email'
                  placeholder='Email Address'
                  className='w-ful border-b border-gray-400 bg-transparent py-1 px-2 focus:outline-none'
                />
                <button
                  type='submit'
                  className='absolute right-0 top-0 mt-1  rounded-full bg-secondaryGreen text-white w-8 h-8 flex items-center justify-center transition cursor-pointer'
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
