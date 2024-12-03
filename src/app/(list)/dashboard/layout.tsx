'use client'

import authStore from "@/zustand";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaDashcube, FaHouseDamage, FaSignOutAlt, FaUserCheck } from "react-icons/fa";

export default function Layout({ children }: { children: ReactNode }) {
    const nameUser = authStore((state) => state?.name)
    const tokenUser = authStore((state) => state?.token)
    const resetAuth = authStore((state) => state?.resetAuth)
    const role = authStore((state) => state?.role)
    const profileImg = authStore((state) => state?.profilePicture)
    const [isClose, setIsClose] = useState<boolean>(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('__rols');
        resetAuth()

        window.location.href = '/login'
    }
    useEffect(() => {
        if (role && role != 'ADMIN' && pathname.startsWith('/dashboard')) {
            router.push('/')
        }

        console.log('siapa yang ke trigger duluan')
    }, [role, pathname, tokenUser])


    const handleCloseSideBar = () => {
        setIsClose(!isClose)
    }

    return (
        <main className="w-full h-screen flex">
            <section className={`w-3/12 h-full bg-black ${isClose ? 'hidden' : 'flex'} flex-col px-2 text-white`}>
                <div className="h-fit py-10 gap-5 flex justify-start px-5 items-center w-full">
                    <div className="w-10 h-10 rounded-full">
                        <Image
                            src={profileImg ? profileImg : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                            width={600}
                            height={600}
                            alt="user-profile"
                            className="w-10 h-10 rounded-full border-[1px] border-white"
                        />
                    </div>
                    <div className="flex flex-col text-sm">
                        <h1>{nameUser ? nameUser : 'ADMIN'}</h1>
                        <h1>{role ? role : "ADMIN"}</h1>
                    </div>
                </div>
                <h1 className="px-4 text-sm text-neutral-600 py-2">Menu</h1>
                <div className="w-full h-full flex flex-col gap-4">

                    <Link href='/dashboard' className={`w-full flex ${pathname == '/dashboard' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaDashcube /> Dashboard</Link>
                    <Link href='/' className={`w-full flex ${pathname == '/dashboard/category' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaHouseDamage /> Home Page</Link>
                    <Link href='/dashboard/profile' className={`w-full flex ${pathname == '/dashboard/profile' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaUserCheck /> Profile</Link>
                    <span
                        onClick={handleLogout}
                        className={`w-full  cursor-pointer flex hover:bg-white items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaSignOutAlt /> Logout</span>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                </div>
            </section>
            <section className="w-full bg-black px-5 py-5 relative">
                <span onClick={handleCloseSideBar} className="absolute cursor-pointer top-16 left-14 z-20 text-white">
                    {isClose ? <FaArrowRight /> : <FaArrowLeft />}
                </span>
                {children}
            </section>
        </main>
    );
}