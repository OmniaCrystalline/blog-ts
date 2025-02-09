import React from 'react'
import Link from 'next/link'
import prisma from '@/utils/prisma/prisma'
import { Category as ICategory } from '@prisma/client'


export const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500']
export const Btns = () => {
  return (<>
    <button className='bg-red-500/50'></button>
    <button className='bg-blue-500/50'></button>
    <button className='bg-green-500/50'></button>
    <button className='bg-pink-500/50'></button>
    <button className='bg-purple-500/50'></button>
    <button className='bg-indigo-500/50'></button>
    <button className='bg-orange-500/50'></button>
    <button className='bg-sky-500/50'></button>
    <button className='bg-rose-500/50'></button>
    <button className='bg-violet-500/50'></button>
  </>)
}

const Categories = async () => {
  const categories: ICategory[] = await prisma.category.findMany()
  return (<div className='p-5'>
    <span className='bold text-xl block mb-2'>Popular categories</span>
    <div className='flex flex-wrap gap-5 justify-evenly'>
      {categories && categories.map(e => <Link href={`/category/${e.slug}?page=0`} key={e.id} className={`px-5 py-2 text-center flex-grow ${e.color} rounded`}>{e.title}</Link>)
      }
    </div>
  </div>
  )
}

export default Categories


