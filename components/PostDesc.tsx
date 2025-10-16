'use client'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import SafeHTML from './SafeHTML'

const PostDesc = (props: { desc: string }) => {
    const { theme } = useContext(ThemeContext)
    const color = theme === 'light' ? 'to-neutral-50' : 'to-neutral-900'
    return (
        <div className='h-72 overflow-clip relative'>
            <SafeHTML content={props.desc} />
            <div className={`absolute bottom-0 left-0 w-full h-72 bg-gradient-to-b from-transparent ${color}`}></div>
        </div>
    )
}

export default PostDesc