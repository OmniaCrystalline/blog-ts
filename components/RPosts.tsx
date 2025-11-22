
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PrevIcon = GrPrevious as React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const NextIcon = GrNext as React.ComponentType<any>;

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
                          <PrevIcon />Previous
                        </Link>
                        <Link href={`${path}?page=${page + 1 === last ? page : page + 1}`} className={page + 1 === last ? 'hidden' : 'flex place-items-center'}>
                          Next <NextIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RPosts