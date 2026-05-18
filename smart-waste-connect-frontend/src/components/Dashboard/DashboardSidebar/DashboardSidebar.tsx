'use client'
import Image from 'next/image'
import wasteLogo from '../../../../public/images/smart-waste-small-logo.png'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
export function DashboardSidebar() {
    return (
        <div className="w-[300px] h-screen bg-sidenav  shadow-lg flex flex-col justify-between">
            <div className='flex justify-center mt-5'>
                <Image src={wasteLogo} alt='waste-logo' width={100} height={100} />
            </div>

            <Link href="/logout" className="flex items-center gap-2 text-2xl font-extrabold pb-5">
                <LogOut size={24} /> Logout
            </Link>
        </div>
    )
}