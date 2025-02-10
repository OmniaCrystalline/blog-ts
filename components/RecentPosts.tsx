'use client'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import { Post as IPost } from '@prisma/client'
import Link from 'next/link'
import BlogItem from './BlogLoader'
import { GrPrevious, GrNext } from "react-icons/gr";

const RecentPosts = () => {
  const [page, setpage] = useState<number>(0)
  const [posts, setposts] = useState<IPost[]>([])
  const [last, setlast] = useState<number | null>(null)
  const [pending, setpending] = useState<boolean>(true)

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


  return (<div className='grid gap-2 h-full'>
    <div className='gap-1 px-5 '>
      <span className=''>What`s new</span><br />
      <span className='bold text-xl'>Most recent</span>
    </div>
    {!pending && posts && <ul className='grid'>{posts.map(e => <li key={e.id}><Post post={e} parent={'a'} /></li>)}</ul>}
    {pending && <><BlogItem /><BlogItem /><BlogItem /></>}
    <div className='flex justify-between gap-1 p-5 mt-auto'>
      <button
        className='px-2 text-inherit flex disabled:text-transparent bg-transparent'
        onClick={() => setpage(page - 1)}
        disabled={page === 0}><Link className='flex gap-2 place-items-center' href='#firstPost'><GrPrevious />Previous</Link></button>
      <button
        className='px-2 text-inherit flex disabled:text-transparent bg-transparent'
        onClick={() => setpage(page + 1)}
        disabled={page + 1 === last}><Link href='#firsPost' className='flex gap-2 place-items-center'>Next <GrNext /></Link></button>
    </div>
  </div>)
}

export default RecentPosts