"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{Math.round(progress || 0)}%</span>
        </div>
        
        {/* Custom Progress Bar without shadcn */}
        <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
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
      <Card className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                {course.topic}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {course.level}
                </Badge>
                <span className="text-gray-500">•</span>
                <span>Duration: {course.duration}</span>
                <span className="text-gray-500">•</span>
                <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
              
              <ProgressBar progress={progress} courseId={course.id} />
            </div>
            
            <div className="flex space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:bg-gray-100"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? '▲' : '▼'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteCourse(course.id)}
                className="text-red-500 hover:bg-red-100"
                title="Delete course"
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>

          {/* Progress Stats */}
          <Card className="bg-gray-50 border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor((progress / 100) * 8)}
                  </div>
                  <div className="text-xs text-gray-600">Sections Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {8 - Math.floor((progress / 100) * 8)}
                  </div>
                  <div className="text-xs text-gray-600">Sections Left</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isExpanded && (
            <Card className="bg-gray-50 border-gray-200 mb-6">
              <CardContent className="p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                  {course.content}
                </pre>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-between items-center gap-4">
            <Button 
              onClick={() => updateCourseProgress(course.id, (progress || 0) + 12.5)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-300 flex-1"
            >
              Mark Section Complete
            </Button>
            <Button 
              variant="outline"
              onClick={() => updateCourseProgress(course.id, 0)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors flex-1"
            >
              Reset Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Overall Progress Bar Component
  const OverallProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
        <div 
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"
        )}>
          <div className="p-6 lg:p-8 xl:p-10 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 lg:mb-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  <br />
                  My Courses
                </h1>
                <p className="text-lg text-gray-600 mx-auto">
                  Manage and view all your generated courses
                </p>
              </div>
              <br />
              {/* Overall Progress Summary */}
              {courses.length > 0 && (
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-xl">
                      Overall Learning Progress
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <OverallProgressBar 
                            progress={courses.reduce((total, course) => total + (course.progress || 0), 0) / courses.length} 
                          />
                        </div>
                        <span className="text-lg font-bold text-gray-900 min-w-12">
                          {Math.round(courses.reduce((total, course) => total + (course.progress || 0), 0) / courses.length)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{courses.filter(c => (c.progress || 0) === 100).length} completed</span>
                        <span>{courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length} in progress</span>
                        <span>{courses.filter(c => (c.progress || 0) === 0).length} not started</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {courses.length === 0 ? (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-12 lg:p-16 text-center">
                  <div className="text-6xl mb-6">📚</div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    No courses yet
                  </h2>
                  <p className="text-gray-600 text-lg mb-8 mx-auto leading-relaxed">
                    Create your first AI-generated course to get started on your learning journey!
                  </p>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 px-8 py-4 text-base font-semibold"
                  >
                    <a href="/#create">
                      Create Your First Course
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 lg:gap-8">
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