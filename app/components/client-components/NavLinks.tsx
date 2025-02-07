'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const NavLinks = () => {
    const [first, setfirst] = useState('login')
    const [user, setuser] = useState('')
    const { data, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            setfirst('logout')
            if (data.user && data.user.name) {
                setuser(data.user.name)
            }
            router.push('/')

        }
    }, [status, data, router])
    const path = usePathname()
    return (
        <div className='hidden md:flex rounded flex-1 justify-end gap-5'>
            <span className=' text-amber-700 border-l'>{user}</span>
            <Link
                href='/'
                className={path === "/" ? " text-amber-500" : ""}
            >
                home
            </Link>
            {first === 'login' ? <Link
                href='/login'
                className={path === "/login" ? " text-amber-500" : ""}
            >
                login
            </Link> : <button className=' bg-transparent hover:bg-inherit' onClick={() => signOut()}>logout</button>}
            <Link
                href='/write'
                className={path === "/write" ? " text-amber-500" : ""}
            >
                write
            </Link>

        </div>
    )
}

export default NavLinks