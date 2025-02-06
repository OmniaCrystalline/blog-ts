import React from 'react'
import Link from 'next/link'
import { datestring } from './helpers/functions'
import prisma from '@/utils/prisma/prisma'

const SideMenu = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            views: 'desc'
        },
        take: 6,
        include: {
            cat: true
        }
    })

    return (
        <div className='grid gap-1 p-5'>
            <div className='grid'>
                <span className=''>What`s hot</span>
                <span className='bold text-xl'>Most popular</span></div>
            <div className='grid gap-4'>
                {posts?.map((e) => <div className='grid gap-2' key={e.id + 'sidemenu'}>
                    <div className='flex justify-between'>
                        <span className={` rounded-full px-4 py-1 w-fit  ${e.cat.color}`}>{e.catSlag}</span>
                    </div><h2>{e.title}</h2>
                    <p className=''>{e.desc.slice(0, 140) + '...'}</p>
                    <div className='flex justify-between'>
                        <span>date: {datestring(e.createdAt)} - views:{e.views}</span>
                        <Link href={`/${e.slug}`} className='underline'>more</Link>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default SideMenu

