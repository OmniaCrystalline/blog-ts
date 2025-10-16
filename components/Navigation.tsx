/** @format */
import React from "react";
import NavLinks from "./NavLinks";
import ToggleBtn from "./ToggleBtn";
import BurgerMenu from './BurgerMenu'

interface INav {
  theme: string
}

const Navigation: React.FC<INav> = ({ theme }) => {
  return (
    <nav className='flex gap-5 border-b-2 border-slate-500 px-5 py-5 place-items-center'>
      <span className='grid place-items-center'>YourBlog</span>
      <ToggleBtn />
      <NavLinks />
      <BurgerMenu theme={theme} />
    </nav>
  );
};

export default Navigation;
