import React from 'react'
import Link from 'next/link'
import prisma from '@/utils/prisma/prisma'
import { Category } from '@prisma/client'

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
  const categories: Category[] = await prisma.category.findMany()
  return (<div className='p-5 md:p-6 mb-6'>
    <span className='text-sm text-neutral-400 block mb-2'>Popular categories</span>
    <h2 className='font-bold text-xl md:text-2xl mb-5'>Browse by topic</h2>
    <div className='flex flex-wrap gap-3 md:gap-4'>
      {categories && categories.map((e) => <Link 
        href={`/category/${e.slug}?page=0`} 
        key={e.id} 
        className={`px-4 py-2.5 md:px-5 md:py-3 text-center flex-shrink-0 ${e.color} rounded-lg hover:opacity-90 hover:scale-105 transition-all text-white font-medium shadow-md shadow-black/20 whitespace-nowrap`}
      >
        {e.title}
      </Link>)
      }
    </div>
  </div>
  )
}

export default Categories


