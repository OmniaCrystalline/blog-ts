'use client'

const loading = () => {
  return (
    <div className='flex items-center justify-center min-h-[400px]'>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-neutral-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-neutral-400 text-sm">Завантаження...</p>
      </div>
    </div>
  )
}

export default loading
