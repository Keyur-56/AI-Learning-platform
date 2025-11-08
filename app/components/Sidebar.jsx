"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Sidebar({ isCollapsed, onToggle, onCreateNewCourse }) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/' },
    { id: 'courses', label: 'My Courses', icon: '📚', href: '/courses' },
    { id: 'create', label: 'Create Course', icon: '✨', href: '#' },
    { id: 'progress', label: 'Progress', icon: '📈', href: '#' },
  ]

  const handleCreateClick = (e) => {
    e.preventDefault()
    onCreateNewCourse?.()
    setActiveItem('create')
  }

  const getIcon = (iconName) => {
    const icons = {
      '📊': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      '📚': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      '✨': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      '📈': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
    return icons[iconName] || <span>{iconName}</span>
  }

  return (
    <>
      {/* Toggle Button - Only visible when sidebar is collapsed */}
      {isCollapsed && (
        <Button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 bg-gradient-to-br from-orange-400 to-orange-500 text-white p-2 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 border border-orange-300"
          size="icon"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </Button>
      )}

      {/* Expanded Sidebar */}
      <aside className={cn(
        "bg-white border-r border-gray-200 min-h-screen transition-all duration-300 shadow-xl",
        isCollapsed ? "w-0 -translate-x-full opacity-0" : "w-64 translate-x-0 opacity-100"
      )}>
        <div className="p-6">
          {/* Header with toggle button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 border border-orange-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Course<span className="text-orange-500">Maker</span></h2>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start space-x-3 px-4 py-3 rounded-lg transition-all",
                  activeItem === item.id
                    ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 shadow-md border-l-4 border-orange-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={(e) => {
                  if (item.id === 'create') {
                    handleCreateClick(e)
                  } else {
                    setActiveItem(item.id)
                  }
                }}
                asChild
              >
                <a href={item.href}>
                  {getIcon(item.icon)}
                  <span className="font-medium">{item.label}</span>
                </a>
              </Button>
            ))}
          </nav>

          <br />

          <Card className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 shadow-md">
            <CardContent className="p-4">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md"
                asChild
              >
                <a 
                  href="https://ebon-adventure-website.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  My Game
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Collapsed Sidebar - Completely hidden like DeepSeek */}
      <aside className={cn(
        "bg-white border-r border-gray-200 min-h-screen transition-all duration-300",
        isCollapsed ? "w-0 -translate-x-full opacity-0" : "w-0 opacity-0"
      )}>
        {/* This sidebar is completely hidden when collapsed */}
      </aside>
    </>
  )
}