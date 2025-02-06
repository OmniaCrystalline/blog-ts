'use client'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import { GoSun, GoMoon } from "react-icons/go";

const ToggleBtn = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <button
            className='p-2 border rounded bg-inherit'
            onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }}>{theme === 'light' ? <GoMoon /> : <GoSun />}</button>
    )
}

export default ToggleBtn