'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { GrPrevious, GrNext } from "react-icons/gr";


const Pagination = (props: { last: number, page: number }) => {
    const { last } = props
    const path = usePathname()
    const q = useSearchParams()
    const page = Number(q.get('page')) || 0

    return (
        <div className='flex cont justify-between mt-auto' >
            {last !== 0 && (<><span className=''>
                <Link href={`${path}?page=${page === 0 ? 0 : page - 1}`} className={page === 0 ? 'hidden' : 'flex place-items-center'}><GrPrevious />Previous</Link>
            </span><span className=''>
                    <Link href={`${path}?page=${page + 1 === last ? page : page + 1}`} className={page + 1 === last ? 'hidden' : 'flex place-items-center'}>Next <GrNext /></Link>
                </span></>)}
            {last === 0 && <div>Add your own blog - it will become first for this theme</div>}
        </div>
    )
}

export default Pagination