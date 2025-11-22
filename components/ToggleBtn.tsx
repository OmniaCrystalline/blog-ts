'use client'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import { GoSun, GoMoon } from "react-icons/go";

const ToggleBtn = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MoonIcon = GoMoon as React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SunIcon = GoSun as React.ComponentType<any>;
    
    return (
        <button
            className='p-2 border rounded bg-inherit'
            onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</button>
    )
}

export default ToggleBtn