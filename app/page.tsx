/** @format */
import SideMenu2 from "../components/SideMenu2";
import SideMenu from "../components/SideMenu1";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import { Suspense } from "react";
import RecentPosts from "../components/RecentPosts";
import BlogItem from "../components/BlogLoader";


export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Suspense fallback={<BlogItem />}>
            <Hero />
            <Categories />
          </Suspense>
        </div>
        <div className="md:flex">
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
      </Suspense>
    </main>
  );
}
