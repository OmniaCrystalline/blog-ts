'use client'
import { useState, useEffect } from 'react'
import { createContext } from "react";
import { ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: (prevTheme) => {
    return prevTheme === 'dark' ? 'light' : 'dark';
  },
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme)
      // Apply theme class to body element
      const body = document.body
      body.classList.remove('dark', 'light')
      body.classList.add(theme)
    }
  }, [theme, mounted])

  // Apply initial theme class on mount
  useEffect(() => {
    const body = document.body
    const baseClasses = "container px-5 ml-auto mr-auto grid min-h-screen max-w-6xl min-w-sm transition-all grid-rows-[auto_1fr_auto]"
    body.className = `${baseClasses} ${mounted ? theme : 'dark'}`
  }, [mounted, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

