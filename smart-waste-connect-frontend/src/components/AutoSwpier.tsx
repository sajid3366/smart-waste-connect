// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import 'swiper/css'
// // import required modules
// import { Autoplay } from 'swiper/modules'
// import Image from 'next/image'
// import logo from '../../public/images/smart-waste-logo-1.png'

// export default function AutoSwpier () {
//   const categories = [
//     { title: 'eWallet & Shopping' },
//     { title: 'Grocery & Essentials' },
//     { title: 'Fast Food' },
//     { title: 'Casual Resto' },
//     { title: 'Bread & Dessert' },
//     { title: 'eWallet & Shopping' },
//     { title: 'Grocery & Essentials' },
//     { title: 'Fast Food' },
//     { title: 'Casual Resto' },
//     { title: 'Bread & Dessert' }
//   ]
//   return (
//     <>
//       <Swiper
//         slidesPerView={5}
//         // spaceBetween={30}
//         modules={[Autoplay]}
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         loop={true}
//         slidesPerGroup={1}
//         className='w-full'
//       >
//         {categories.map((cat, idx) => {
//           return (
//             <SwiperSlide>
//               <div className=' flex items-center justify-center'>
//                 <Image src={logo} alt='logo' width={80} />
//               </div>
//               <h1 className='text-center mt-1 text-darkGray'>{cat.title}</h1>
//             </SwiperSlide>
//           )
//         })}
        
//       </Swiper>
//     </>
//   )
// }
