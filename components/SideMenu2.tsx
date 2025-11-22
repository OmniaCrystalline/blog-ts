import React from 'react'
import Categories from './Categories'

const SideMenu2 = () => {
  return (
      <div className='hidden md:grid md:align-bottom bg-neutral-800/50 rounded-xl border border-neutral-700/50'>
          <div className='grid gap-1 px-5 pt-5 pb-2'>
              <span className='text-sm text-neutral-400'>Discover by type</span>
              <h2 className='font-bold text-xl md:text-2xl'>Categories</h2>
          </div>
      <Categories />
    </div>
  )
}

export default SideMenu2