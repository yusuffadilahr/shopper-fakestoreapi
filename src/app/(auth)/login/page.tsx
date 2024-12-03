'use client'

import InputForm from "@/components/inputForm";
import { loginValidationSchema } from "@/utils/loginValidationSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import authStore from "@/zustand";

const secret_key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
export default function Page() {
    const setToken = authStore((state)=> state?.setAuth)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const { mutate: handleSubmitLogin, isPending } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            return await axios.post('http://localhost:3000/api/auth/login', {
                email, password
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.data?.message)
            setToken({
                token: res?.data?.data?.token,
                email: res?.data?.data?.email,
                role: res?.data?.data?.role,
                profilePicture: res?.data?.data?.profilePicture
            })
            const roleUser = CryptoJS.AES.encrypt(res?.data?.data?.role, secret_key).toString()

            Cookies.set('token', res?.data?.data?.token)
            Cookies.set('__rols', roleUser)
            
            setIsDisabled(true)
            window.location.href = '/dashboard'
        },
        onError: (err) => {
            toast.error('Login gagal, silahkan coba lagi!')
            console.log(err)
        }
    })

    const handleVisiblePassword = () => {
        setIsVisible(!isVisible)
    }
    return (
        <main className="lg:w-full h-[100svh] md:h-[100mvh] lg:h-[100lvh] bg-white flex justify-center items-center lg:px-20 px-5 lg:py-10 py-2">
            <section className="w-full h-full bg-white lg:flex">
                {/* <div className="w-full h-full bg-black"></div> */}
                <div className="w-full h-full bg-white border">
                    <div className="w-full h-full flex justify-center items-center">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={(values) => {
                                handleSubmitLogin({
                                    email: values?.email,
                                    password: values?.password
                                })
                                console.log(values)
                            }}
                        >
                            <Form className="w-full h-full flex flex-col justify-center items-center lg:px-10 px-2">
                                <InputForm htmlFor="email" name="email" type="email" labelname="E M A I L " id="email" placeholder="Masukan Email..." >
                                    <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="email" />
                                </InputForm>
                                <div className="relative w-full flex">
                                    <InputForm htmlFor="password" name="password" type={`${isVisible ? 'text' : 'password'}`} labelname="P A S S W O R D " id="password" placeholder="Masukan Password..." >
                                        <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="password" />
                                    </InputForm>
                                    <span onClick={handleVisiblePassword}>
                                        {isVisible ?
                                            <FaEyeSlash className="cursor-pointer hover:text-neutral-700 lg:text-sm absolute text-neutral-800 top-[53px] right-4" />
                                            :
                                            <FaEye className="cursor-pointer hover:text-neutral-700 lg:text-sm absolute text-neutral-800 top-[53px] right-4" />
                                        }
                                    </span>
                                </div>
                                <button disabled={isPending || isDisabled} className="disabled:bg-neutral-900 w-full py-2 text-sm mt-2 border bg-black text-white hover:bg-neutral-900" type="submit">S U B M I T</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    );
}