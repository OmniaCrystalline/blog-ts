
'use client'
import React from 'react'
import { Post as IPost } from '@prisma/client'
import Post from './Post'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GrPrevious, GrNext } from 'react-icons/gr'

const RPosts = (props: { data: IPost[], last: number, page: number }) => {
    const { data, last, page } = props
    const path = usePathname()

    return (
        <div>
            <div className='grid gap-2 h-full'>
                <div className='gap-1 px-5 '>
                    <span className=''>What`s new</span><br />
                    <span className='bold text-xl'>Most recent</span>
                </div>
                {<ul className='grid'>{data.map(e => <li key={e.id}><Post post={e} parent={'a'} /></li>)}</ul>}
                <div className='flex justify-between gap-1 p-5 mt-auto'>
                    <div className='flex cont justify-between mt-auto' >
                        <Link href={`${path}?page=${page === 0 ? 0 : page - 1}`} className={page === 0 ? 'hidden' : 'flex place-items-center'}>
                          {/* @ts-expect-error - react-icons type compatibility issue with React 19 */}
                          <GrPrevious />Previous
                        </Link>
                        <Link href={`${path}?page=${page + 1 === last ? page : page + 1}`} className={page + 1 === last ? 'hidden' : 'flex place-items-center'}>
                          Next {/* @ts-expect-error - react-icons type compatibility issue with React 19 */}
                          <GrNext />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RPosts