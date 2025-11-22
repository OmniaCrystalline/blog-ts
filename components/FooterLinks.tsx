import React from 'react'
import Link from 'next/link'
import prisma from '@/utils/prisma/prisma'
import { Category } from '@prisma/client'

const FooterLinks = async () => {
    const links: Category[] = await prisma.category.findMany()
    return (
        <div className='grid gap-1 place-items-center'>
            <span className='font-bold mb-2'>Categories</span>
            {links.map((link: Category) => <Link key={link.id} href={`/category/${link.slug}`}>{link.title}</Link>)}
        </div>
    )
}

export default FooterLinks