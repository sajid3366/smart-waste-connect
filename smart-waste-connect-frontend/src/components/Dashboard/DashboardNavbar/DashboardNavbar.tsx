'use client'
import { User } from "lucide-react";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";

export function DashboardNavbar() {
    const user = {
        name: 'Ahtesham',
        image: 'https://avatars.githubusercontent.com/u/12345678?v=4'
    }

    return (
        <div className="bg-sidenav w-full h-[80px] shadow-lg flex items-center justify-between px-5">
            <h1 className="text-2xl font-extrabold">Welcome Back {'Ahtesham'}</h1>
            <div className="flex gap-x-5">
                <div className="bg-[#287883] w-10 h-10 p-2 flex justify-center items-center rounded-full">
                    <FaRegBell size={22} />
                </div>
                {
                    user?.image ? <div className="w-10 h-10 rounded-full">
                        <Image src={user?.image} alt="user-image" width={40} height={40} className="rounded-full"/>
                    </div> :
                        <div className="bg-[#287883] w-10 h-10 p-2 flex justify-center items-center rounded-full">
                            <User size={22} />
                        </div>
                }

            </div>
        </div>
    )
}