"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Header() {
  return (
    <Card className="rounded-none border-b border-gray-200/60 bg-gradient-to-r from-white to-orange-50/30 shadow-lg shadow-orange-500/5 border-x-0 border-t-0 backdrop-blur-sm">
      <CardHeader className="py-4 sm:py-5 md:py-6">
        <div className="w-full px-4 sm:px-6">
          {/* Logo Section - Force Centered */}
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center space-x-4 sm:space-x-5 mx-auto">
              <div className={cn(
                "relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14",
                "bg-gradient-to-br from-orange-400 to-orange-600",
                "rounded-2xl flex items-center justify-center",
                "shadow-2xl shadow-orange-500/40 border-2 border-orange-300/50",
                "transition-all duration-300 hover:scale-105 hover:shadow-orange-500/60",
                "group"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-5 mb-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                    Course<span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Maker</span>
                  </h1>
                  
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-light tracking-wide">
                  Intelligent <span className="font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">AI-Powered</span> Learning Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}