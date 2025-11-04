"use client"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 border border-orange-300">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-khula tracking-tight">
              Course<span className="text-orange-500">Maker</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-khula font-light tracking-wide mt-0.5 sm:mt-1">
              Intelligent <span className="text-orange-500">Learning Platform</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}