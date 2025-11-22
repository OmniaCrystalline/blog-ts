/** @format */
import SideMenu2 from "../components/SideMenu2";
import SideMenu from "../components/SideMenu1";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import { Suspense } from "react";
import RecentPosts from "../components/RecentPosts";
import BlogItem from "../components/BlogLoader";

export const metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px] py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-neutral-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-neutral-400 text-sm">Завантаження...</p>
          </div>
        </div>
      }>
        <div className="w-full mb-8">
          <Suspense fallback={<BlogItem />}>
            <Hero />
            <Categories />
          </Suspense>
        </div>
        <div className="lg:flex lg:gap-8 w-full pb-8">
          <div className='lg:w-2/3 lg:min-w-0'>
            <span className='hidden' id='firstPost'></span>
            <Suspense fallback={
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-10 h-10">
                      <div className="absolute top-0 left-0 w-full h-full border-3 border-neutral-700 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-neutral-500 text-xs">Завантаження...</p>
                  </div>
                </div>
              </div>
            }>
              <RecentPosts />
            </Suspense>
          </div>
          <div className='lg:w-1/3 lg:min-w-[320px] grid gap-6 mt-6 lg:mt-0'>
            <SideMenu />
            <SideMenu2 />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
