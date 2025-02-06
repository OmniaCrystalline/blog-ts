/** @format */
import SideMenu2 from "./components/SideMenu2";
import SideMenu from "./components/SideMenu1";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import { Suspense } from "react";
import RecentPosts from "./components/client-components/RecentPosts";

export default function Home() {
  return (
    <main>
      <div>
        <Hero />
        <Categories />
      </div>
      <div className='grid lg:flex'>
        <div className='lg:w-2/3'>
          <span className='hidden' id='firstPost'></span>
          <Suspense fallback={<div>loading...</div>}>
            <RecentPosts />
          </Suspense>
        </div>
        <div className='lg:w-1/3 grid'>
          <SideMenu />
          <SideMenu2 />
        </div>
      </div>
    </main >
  );
}
