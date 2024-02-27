import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import Logo from './ui/Logo';

export default function Home() {
  return (
    <main className='p-6'>
      {/* logo  */}
      <div className='h-20 flex flex-shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52'>
        <Logo />
      </div>
      {/* welcome screen  */}
      <div className="mt-4 flex grow flex-col md:flex-row gap-4">
        {/* left side  */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-5 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal"><strong>Welcome to Acme.</strong> This is the example for the Next.js Learn Course, brought to you by Vercel.</p>
          <Link href={'/login'} className='bg-blue-500 flex items-center gap-0 self-start rounded-lg px-6 py-3 text-sm text-white font-medium transition-colors hover:bg-blue-400 md:text-base'>Log in <FaLongArrowAltRight className='w-10 h-5' /></Link>
        </div>
        {/* right side  */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* image  */}
          <Image src={'/hero-desktop.png'} alt='image' width={1000} height={760} className='hidden md:block' />
          <Image src={'/hero-mobile.png'} alt='image' width={560} height={620} className='md:hidden' />
        </div>

      </div>
    </main>
  )
}
