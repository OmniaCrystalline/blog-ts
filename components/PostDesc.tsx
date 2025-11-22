'use client'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import SafeHTML from './SafeHTML'

const PostDesc = (props: { desc: string }) => {
    const { theme } = useContext(ThemeContext)
    const color = theme === 'light' ? 'to-neutral-50' : 'to-neutral-900'
    return (
        <div className='relative'>
            <div className='min-h-48 max-h-72 overflow-hidden p-4'>
                <SafeHTML content={props.desc} />
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent ${color} pointer-events-none`}></div>
        </div>
    )
}

export default PostDesc