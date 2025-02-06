/** @format */
import React from "react";
import NavLinks from "./client-components/NavLinks";
import ToggleBtn from "./client-components/ToggleBtn";
import BurgerMenu from './client-components/BurgerMenu'

interface INav {
  theme: string
}

const Navigation: React.FC<INav> = ({ theme }) => {
  return (
    <nav className='flex gap-5 border-b-2 border-slate-500 px-5 py-5 place-items-center'>
      <span className='grid place-items-center'>Navigation</span>
      <ToggleBtn />
      <NavLinks />
      <BurgerMenu theme={theme} />
    </nav>
  );
};

export default Navigation;
