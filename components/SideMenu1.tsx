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
        <div className='grid gap-5 p-5 md:p-6 bg-neutral-800/50 rounded-xl border border-neutral-700/50'>
            <div className='grid gap-1 pb-2'>
                <span className='text-sm text-neutral-400'>What`s hot</span>
                <h2 className='font-bold text-xl md:text-2xl'>Most popular</h2>
            </div>
            <div className='grid gap-4'>
                {posts?.map((e) => <div className='grid gap-3 p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-900/70 transition-all border border-neutral-800/50 hover:border-neutral-700' key={e.id + 'sidemenu'}>
                    <div className='flex justify-between items-center'>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${e.cat.color} text-white shadow-sm`}>{e.catSlag}</span>
                    </div>
                    <h3 className='font-semibold text-lg leading-tight'>{e.title}</h3>
                    <p className='text-sm text-neutral-300 line-clamp-3'>{e.desc.slice(0, 140) + '...'}</p>
                    <div className='flex justify-between items-center text-xs text-neutral-400 pt-3 border-t border-neutral-800'>
                        <span>{datestring(e.createdAt)} • {e.views} views</span>
                        <Link href={`/${e.slug}`} className='text-blue-400 hover:text-blue-300 underline transition-colors font-medium'>more</Link>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default SideMenu

