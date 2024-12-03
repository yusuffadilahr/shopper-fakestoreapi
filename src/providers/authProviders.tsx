'use client'

import authStore from "@/zustand";
import axios from "axios";
import { ReactNode, useEffect } from "react";

export default function AuthProviders({ children }: { children: ReactNode }) {

    const token = authStore((state) => state?.token)
    const keepAuth = authStore((state) => state?.setKeepAuth)

    const displayDataUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/auth/keep-auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            keepAuth({
                email: res?.data?.data?.email,
                role: res?.data?.data?.role,
                name: res?.data?.data?.name,
                profilePicture: res?.data?.data?.profilePicture
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            displayDataUser()
        }

    }, [token])

    return (
        <>
            {children}
        </>
    );
}