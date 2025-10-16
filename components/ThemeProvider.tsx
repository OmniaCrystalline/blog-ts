'use client'
import { useState, useEffect } from 'react'
import { createContext } from "react";

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

import { ReactNode } from 'react';

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
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <body className="container px-5 ml-auto mr-auto grid min-h-screen max-w-6xl min-w-sm transition-all grid-rows-[auto_1fr_auto] dark">
        {children}
      </body>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} >
      <body
        className={`container px-5 ml-auto mr-auto grid min-h-screen max-w-6xl min-w-sm transition-all grid-rows-[auto_1fr_auto] ${theme}`}>
        {children}</body>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

