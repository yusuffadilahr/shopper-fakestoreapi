import { NextRequest, NextResponse } from "next/server"
import { RateLimiterMemory } from "rate-limiter-flexible"
import CryptoJS from "crypto-js"

const rateLimit = new RateLimiterMemory({
    points: 20,
    duration: 1000 /** */
})

const secret_key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
export const middleware = async (req: NextRequest) => {
    const limitByIp = req.headers.get('X-Forwarded-For') as string /**ngebaca ip user */

    const roleUser = req.cookies.get('__rols')?.value
    const tokenUser = req.cookies.get('token')?.value
    const pathname = req.nextUrl.pathname

    let role = ''
    if (roleUser) {
        role = CryptoJS.AES.decrypt(roleUser, secret_key).toString(CryptoJS.enc.Utf8)
    }

    if ((role == 'ADMIN' || role == 'USER') && tokenUser && (pathname.startsWith('/login'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (role != 'ADMIN' && tokenUser && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    try {
        await rateLimit.consume((limitByIp))
        return NextResponse.next()

    } catch (error: unknown) {
        const err = error as Error
        console.log(err)

        return NextResponse.json({
            error: true,
            message: 'Terlalu banyak melakukan request',
            data: {}
        }, { status: 400 })
    }
}

export const config = {
    matcher: ['/login', '/dashboard']
};