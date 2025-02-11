'use client'
import React, { useContext, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link';
import { ThemeContext } from './ThemeProvider';

interface BurgerMenuProps {
    theme: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = () => {
    const [open, setopen] = useState(false)
    return (<>
        <div className='md:hidden h-full ml-auto'>
            <button className='bg-inherit p-0 hover:bg-slate-500' onClick={() => setopen(!open)}>
                <RxHamburgerMenu className='w-10 h-10 text-inherit' />
            </button>
        </div>
        {open && <MobileMenu setopen={setopen} open={open} />}
    </>
    )
}

export default BurgerMenu

interface MobileMenuProps {
    setopen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setopen, open }) => {
    const { theme } = useContext(ThemeContext)
    return (<div onClick={() => setopen(!open)} className={`w-screen h-screen absolute ${theme} top-0 left-0 grid z-50 place-content-center`}>
        <button className='absolute border-none right-5 top-5 bg-transparent p-1 hover:bg-inherit'>X</button>
        <div className='grid gap-5 text-2xl text-center text-inherit bg-inherit'>
            <Link href='/' className='hover:scale-105 transition-all'>home</Link>
            <Link href='/login' className='hover:scale-105 transition-all'>login</Link>
            <Link href='/write' className='hover:scale-105 transition-all'>write</Link>
        </div>
    </div>)
}

