'use client'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import Link from 'next/link'
import BlogItem from './BlogLoader'
import { GrPrevious, GrNext } from "react-icons/gr";
import { Post as IPost } from '@prisma/client'

const RecentPosts = () => {
  const [page, setpage] = useState<number>(0)
  const [posts, setposts] = useState<IPost[]>([])
  const [last, setlast] = useState<number | null>(null)
  const [pending, setpending] = useState<boolean>(true)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PrevIcon = GrPrevious as React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NextIcon = GrNext as React.ComponentType<any>;

  useEffect(() => {
    fetch('/api/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    }).then(res => res.json()).then(res => {
      setposts(res.posts)
      setlast(res.last)
      setpending(false)
    })
  }, [page])


  return (<div className='grid gap-5 h-full'>
    <div className='gap-1 px-5 md:px-6 pb-2'>
      <span className='text-sm text-neutral-400 block mb-1'>What`s new</span>
      <h2 className='font-bold text-xl md:text-2xl'>Most recent</h2>
    </div>
    {!pending && posts && <ul className='grid gap-5'>{posts.map(e => <li key={e.id}><Post post={e} parent={'a'} /></li>)}</ul>}
    {pending && <div className='grid gap-5'><BlogItem /><BlogItem /><BlogItem /></div>}
    <div className='flex justify-between gap-2 p-5 md:p-6 mt-4 border-t border-neutral-800'>
      <button
        className='px-5 py-2.5 text-inherit flex items-center gap-2 disabled:text-neutral-600 disabled:cursor-not-allowed bg-transparent hover:bg-neutral-800/50 rounded-lg transition-all font-medium'
        onClick={() => setpage(page - 1)}
        disabled={page === 0}><Link className='flex gap-2 items-center' href='#firstPost'>
          <PrevIcon />Previous
        </Link></button>
      <button
        className='px-5 py-2.5 text-inherit flex items-center gap-2 disabled:text-neutral-600 disabled:cursor-not-allowed bg-transparent hover:bg-neutral-800/50 rounded-lg transition-all font-medium'
        onClick={() => setpage(page + 1)}
        disabled={page + 1 === last}><Link href='#firstPost' className='flex gap-2 items-center'>
          Next <NextIcon />
        </Link></button>
    </div>
  </div>)
}

export default RecentPosts