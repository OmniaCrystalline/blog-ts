'use client'
import React from 'react'
import Link from 'next/link'

const Pagination = (props: { current: number, last: number }) => {
    let {current} = props
  return (
      <div className='flex cont justify-between mt-auto' >
          <button
              onClick={()=>current--}
              disabled={current === 0}
              className=''><Link href='#firstPost'>Previous</Link>
          </button>
          <span>current: {current + 1} - last: {props.last}</span>
          <button
              onClick={()=>current++}
              disabled={current + 1 === props.last}
              className=''><Link href='#firstPost'>Next</Link></button>
      </div>
  )
}

export default Pagination