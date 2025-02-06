'use client'
import { useState } from 'react'
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} >
      <body
        className={`container px-5 ml-auto mr-auto grid min-h-screen max-w-6xl min-w-sm transition-all grid-rows-[auto_1fr_auto] ${theme}`}>
        {children}</body>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

