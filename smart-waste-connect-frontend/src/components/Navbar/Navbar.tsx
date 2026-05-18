'use client'
import Image from 'next/image'
import smartWasteLogo from '../../../public/images/smart-waste-small-logo.png'
// import smartWasteLogo from '../../../public/images/smart-waste-logo-wih-text.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { RiMenuFold2Line } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
export default function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { route: 'Home', url: '/' },
    { route: 'Membership', url: '/membership' },
    { route: 'Pricing', url: '/pricing' },
    { route: 'About Us', url: '/about' },
    { route: 'Contact Us', url: '/contact' },
  ]
  const pathName = usePathname()
  const user = false

  return (
    <nav className='px-8 2xl:px-0'>
      <div className='max-w-[1400px] mx-auto my-5 flex justify-between items-center'>
        {/* For the logo */}
        <Link href={'/'}>
          <div className='flex items- gap-x-1'>
            <Image
              className='w-[40px] md:w-[50px]'
              src={smartWasteLogo}
              alt='smart waste logo'
            />
            <h1 className='text-xl md:text-3xl font-medium mt-5'>Smart Waste</h1>
          </div>
        </Link>

        {/* The routes are here */}
        <div className='md:flex items-center justify-between gap-x-5 hidden '>
          {navLinks.map((link, idx) => {
            return (
              <Link
                key={idx}
                href={link.url}
                className={`text-lg   ${
                  pathName === link.url
                    ? 'text-secondaryGreen'
                    : 'text-secondaryText hover:text-secondaryGreen transition-all ease-in-out duration-300'
                }`}
              >
                {link.route}
              </Link>
            )
          })}
        </div>

        {/* the get started button */}
        <div className='hidden md:block'>
          <Link href={`${user ? '/' : '/login'}`}>
            <p className='text-lg text-white bg-gradient-to-r from-primaryGreen to-secondaryGreen  rounded-sm px-4 py-[6px] cursor-pointer'>
              Get Started
            </p>
          </Link>
        </div>

        {/* menu button */}
        <div
          tabIndex={0}
          role='button'
          className='btn btn-ghost md:hidden cursor-pointer'
        >
          <RiMenuFold2Line size={30} onClick={() => setIsMenuOpen(true)} className={`transition-all duration-300 ${isMenuOpen? "rotate-180": ""}`} />
          <div>
            {/* Drawer Overlay */}
            {isMenuOpen && (
              <div
                className='fixed inset-0 bg-transparent bg-opacity-50 z-40'
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            {/* Drawer */}
            <div
              className={`fixed top-0 left-0 h-full w-[290px] bg-white shadow-lg z-50 transform transition-transform duration-300 px-8 ${
                isMenuOpen ? 'translate-x-0 ' : '-translate-x-full'
              }`}
            >
              {/* Close Button */}
              <div className='flex justify-between mt-8'>
                <Image src={smartWasteLogo} alt='smart waste logo' className='w-[50px]'/>
                <button onClick={() => setIsMenuOpen(false)}>
                  <IoClose
                    size={50}
                    className='text-secondaryText hover:text-iconPrimary transition-all duration-300 ease-in-out cursor-pointer'
                  />
                </button>
              </div>
              <div className=''>
                {/* Navigation Links */}
                <div className='flex flex-col gap-5 items-start  mt-10'>
                  {navLinks.map((link, idx) => {
                    return (
                      <Link
                        key={idx}
                        href={link.url}
                        className={`text-lg   ${
                          pathName === link.url
                            ? 'text-secondaryGreen'
                            : 'text-secondaryText hover:text-secondaryGreen transition-all ease-in-out duration-300'
                        }`}
                      >
                        {link.route}
                      </Link>
                    )
                  })}
                  <Link href={`${user ? '/' : '/login'}`}>
                    <p className='text-lg text-white bg-gradient-to-r from-primaryGreen to-secondaryGreen  rounded-sm px-4 py-[6px] cursor-pointer'>
                      Get Started
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile menu */}
    </nav>
  )
}
