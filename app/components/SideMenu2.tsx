import React from 'react'
import Categories from './Categories'

const SideMenu2 = () => {
  return (
      <div className='hidden md:grid md:align-bottom'>
          <div className='grid px-5'>
              <span className=''>Discover by type</span>
              <span className='bold text-xl'>Categories</span>
          </div>
      <Categories />
    </div>
  )
}

export default SideMenu2