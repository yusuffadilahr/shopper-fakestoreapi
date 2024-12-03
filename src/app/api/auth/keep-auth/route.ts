import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import prisma from "../../../../../lib";

const jwt_secret = process.env.JWT_SECRET || ''
interface IToken { data: { id: string, role: string } }
interface IError extends Error { msg: string, status: number }
export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value as string
        const tokenVerify = jwt.verify(token, jwt_secret)

        const userId = (tokenVerify as IToken)?.data?.id
        const role = (tokenVerify as IToken)?.data?.role

        const findUser = await prisma.user.findFirst({
            where: { id: userId }
        })

        if (!findUser) throw { msg: 'User tidak tersedia', status: 404 }

        return NextResponse.json({
            error: false,
            message: 'Berhasil mendapatkan data',
            data: {
                name: findUser?.name,
                email: findUser?.email,
                role,
                profilePicture: findUser?.profilePicture
            }
        })
    } catch (error) {
        const err = error as IError
        return NextResponse.json({
            error: true,
            message: err?.msg || 'Something went wrong',
            data: {}
        }, { status: err?.status || 500 })
    }
}