"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import CourseForm from "./components/CourseForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Home() {
  const [generatedCourses, setGeneratedCourses] = useState([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showCourseForm, setShowCourseForm] = useState(false)

  // Load courses from localStorage on component mount
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('ai-courses') || '[]')
    setGeneratedCourses(storedCourses)
  }, [])

  const handleCourseGenerated = (courseData) => {
    const newCourse = {
      ...courseData,
      progress: 0, // Initialize progress to 0%
      id: Date.now().toString()
    }
    
    const updatedCourses = [newCourse, ...generatedCourses]
    setGeneratedCourses(updatedCourses)
    localStorage.setItem('ai-courses', JSON.stringify(updatedCourses))
    
    // Hide form after successful generation
    setShowCourseForm(false)
    
    // Show success message
    alert('Course generated successfully! Check "My Courses" page.')
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleCreateNewCourse = () => {
    setShowCourseForm(true)
    // Scroll to form section
    setTimeout(() => {
      document.getElementById('create-course-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
          onCreateNewCourse={handleCreateNewCourse}
        />
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"
        )}>
          <div className="p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto space-y-8 lg:space-y-12">
            {/* Dashboard Section */}
            <section id="dashboard">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  <br />
                  Welcome to CourseMaker! 👋
                </h1>
                <p className="text-lg text-gray-600 mx-auto">
                  Create personalized learning courses with AI
                </p>
              </div>
              <Dashboard courses={generatedCourses} onCreateNewCourse={handleCreateNewCourse} />
            </section>

            {/* Recently Generated Courses */}
            {generatedCourses.length > 0 && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Recently Created Courses 
                  </h2> <br />
                </div>
                <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {generatedCourses.slice(0, 6).map((course) => (
                    <Card key={course.id} className="bg-white border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 text-center">
                          {course.topic}
                        </CardTitle>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <Badge variant="secondary" className={cn(
                            "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-300",
                            course.level === 'beginner' && "from-green-50 to-green-100 text-green-700 border border-green-300",
                            course.level === 'advanced' && "from-red-50 to-red-100 text-red-700 border border-red-300"
                          )}>
                            {course.level}
                          </Badge>
                          <span className="text-gray-500">•</span>
                          <span className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-300">
                            {course.duration || 'Self-paced'}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">{Math.round(course.progress || 0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <Button 
                          asChild
                          variant="ghost"
                          className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-all duration-300 border border-orange-200"
                        >
                          <a href="/courses">
                            View Details →
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {generatedCourses.length > 6 && (
                  <div className="text-center mt-8">
                    <Button 
                      asChild
                      variant="outline"
                      className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 px-8 py-3 font-semibold"
                    >
                      <a href="/courses">
                        View All Courses ({generatedCourses.length})
                      </a>
                    </Button>
                  </div>
                )}
              </section>
            )}
<br />
            {/* Course Form Section */}
            <section id="create-course-section" className="scroll-mt-8">
              {showCourseForm ? (
                <CourseForm 
                  onCourseGenerated={handleCourseGenerated} 
                  onCancel={() => setShowCourseForm(false)}
                />
              ) : (
                <Card className="bg-gradient-to-r from-white to-orange-50/30 border-2 border-gray-300 shadow-lg">
                  <CardContent className="p-12 lg:p-16 text-center">
                    <div className="text-6xl mb-6">🎯</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Ready to Create a Course?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 mx-auto leading-relaxed">
                      Generate personalized learning materials on any topic with AI-powered course creation.
                    </p>
                    <Button
                      onClick={handleCreateNewCourse}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 px-8 py-4 text-lg font-semibold border-2 border-orange-600"
                    >
                      <span className="mr-2">✨</span>
                      Create Course
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}