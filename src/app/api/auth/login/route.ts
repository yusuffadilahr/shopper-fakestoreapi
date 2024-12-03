import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateEmail } from "@/utils/helper";

interface IError extends Error {
  msg: string,
  status: number
}

const jwt_secret = process.env.JWT_SECRET || ''

export async function POST(req: NextRequest) {
  try {
    const { email, password }: { email: string, password: string } = await req.json()
    if (!email || !password) throw { msg: 'Harap diisi terlebih dahulu', status: 400 }
    if (!validateEmail(email)) throw { msg: 'Harap masukan format dengan benar', status: 400 }

    const findUser = await prisma.user.findFirst({
      where: { email }
    })

    if (!findUser) throw { msg: 'User tidak tersedia!', status: 401 }

    const matched = await bcrypt.compare(password, findUser?.password)
    if (!matched) throw { msg: 'Passowrd salah', status: 401 }

    const token = jwt.sign({ data: { id: findUser?.id, role: findUser?.role } }, jwt_secret, { expiresIn: '24h' })

    return NextResponse.json({
      error: false,
      message: 'Berhasil, silahkan masuk',
      data: { token, email, name: findUser?.name, role: findUser?.role }
    },
      { status: 200 })

  } catch (error: unknown) {
    const err = error as IError
    return NextResponse.json({
      error: true,
      message: err?.msg || err.message,
      data: {}
    }, { status: err?.status })
  }
}