"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Load courses from localStorage
    const storedCourses = JSON.parse(localStorage.getItem('ai-courses') || '[]')
    setCourses(storedCourses)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId)
    setCourses(updatedCourses)
    localStorage.setItem('ai-courses', JSON.stringify(updatedCourses))
  }

  const updateCourseProgress = (courseId, progress) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, progress: Math.min(100, Math.max(0, progress)) }
        : course
    )
    setCourses(updatedCourses)
    localStorage.setItem('ai-courses', JSON.stringify(updatedCourses))
  }

  const ProgressBar = ({ progress, courseId }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 font-khula">Progress</span>
          <span className="text-sm font-bold text-gray-900 font-khula">{Math.round(progress || 0)}%</span>
        </div>
        
        {/* Main Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress || 0}%` }}
          ></div>
        </div>
      </div>
    )
  }

  // Delete Icon Component
  const DeleteIcon = () => (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )

  const CourseCard = ({ course }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const progress = course.progress || 0

    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-khula">{course.topic}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3 font-khula">
              <span>Level: {course.level}</span>
              <span>•</span>
              <span>Duration: {course.duration}</span>
              <span>•</span>
              <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
            
            <ProgressBar progress={progress} courseId={course.id} />
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? '▲' : '▼'}
            </button>
            <button
              onClick={() => deleteCourse(course.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete course"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-khula">{Math.round(progress)}%</div>
            <div className="text-xs text-gray-600 font-khula">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-khula">
              {Math.floor((progress / 100) * 8)}
            </div>
            <div className="text-xs text-gray-600 font-khula">Sections Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-khula">
              {8 - Math.floor((progress / 100) * 8)}
            </div>
            <div className="text-xs text-gray-600 font-khula">Sections Left</div>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
              {course.content}
            </pre>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => updateCourseProgress(course.id, (progress || 0) + 12.5)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold font-khula hover:shadow-lg transition-all duration-300"
          >
            Mark Section Complete
          </button>
          <button 
            onClick={() => updateCourseProgress(course.id, 0)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold font-khula hover:bg-gray-200 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-0 sm:ml-16' : 'ml-0 sm:ml-64'
        }`}>
          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-khula">My Courses</h1>
              <p className="text-gray-600 font-khula">Manage and view all your generated courses</p>
              
              {/* Overall Progress Summary */}
              {courses.length > 0 && (
                <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 font-khula">Overall Learning Progress</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${courses.reduce((total, course) => total + (course.progress || 0), 0) / courses.length}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 font-khula">
                      {Math.round(courses.reduce((total, course) => total + (course.progress || 0), 0) / courses.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1 font-khula">
                    <span>{courses.filter(c => (c.progress || 0) === 100).length} completed</span>
                    <span>{courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length} in progress</span>
                    <span>{courses.filter(c => (c.progress || 0) === 0).length} not started</span>
                  </div>
                </div>
              )}
            </div>

            {courses.length === 0 ? (
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-gray-200 shadow-lg">
                <div className="text-4xl sm:text-6xl mb-4">📚</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-khula">No courses yet</h2>
                <p className="text-gray-600 mb-6 font-khula">Create your first AI-generated course to get started!</p>
                <a 
                  href="/#create"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg inline-block font-semibold font-khula hover:shadow-lg transition-all duration-300"
                >
                  Create Your First Course
                </a>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}