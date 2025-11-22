import React from 'react'

const BlogItem = () => (
  <div className='bg-neutral-800/50 rounded-xl border border-neutral-800/50 p-5 md:p-6 animate-pulse'>
    <div role="status" className="space-y-6">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-neutral-700/50 rounded-lg flex items-center justify-center">
        <svg className="w-12 h-12 text-neutral-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-6 bg-neutral-700/50 rounded-lg w-3/4"></div>
        <div className="h-4 bg-neutral-700/30 rounded w-24"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-2.5">
        <div className="h-3 bg-neutral-700/40 rounded-full w-full"></div>
        <div className="h-3 bg-neutral-700/40 rounded-full w-full"></div>
        <div className="h-3 bg-neutral-700/40 rounded-full w-5/6"></div>
        <div className="h-3 bg-neutral-700/40 rounded-full w-4/5"></div>
        <div className="h-3 bg-neutral-700/40 rounded-full w-full"></div>
        <div className="h-3 bg-neutral-700/40 rounded-full w-3/4"></div>
      </div>
      
      {/* Footer skeleton */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 bg-neutral-700/30 rounded w-20"></div>
        <div className="h-3 bg-neutral-700/30 rounded w-16"></div>
      </div>
      
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

export default BlogItem