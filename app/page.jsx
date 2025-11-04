"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import CourseForm from "./components/CourseForm"

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
          onCreateNewCourse={handleCreateNewCourse}
        />
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-0 sm:ml-16' : 'ml-0 sm:ml-64'
        }`}>
          <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <section id="dashboard">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-khula">Welcome to CourseMaker! 👋</h1>
              <p className="text-gray-600 mb-6 sm:mb-8 font-khula">Create personalized learning courses with AI</p>
              <Dashboard courses={generatedCourses} onCreateNewCourse={handleCreateNewCourse} />
            </section>

            <br />
            {/* Recently Generated Courses */}
            {generatedCourses.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-khula">Recently Created Courses</h2>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {generatedCourses.slice(0, 6).map((course) => (
                    <div key={course.id} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate font-khula">{course.topic}</h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-khula">
                        <span>Level: {course.level}</span>
                        <span>•</span>
                        <span>{course.duration || 'Self-paced'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1 sm:mb-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 font-khula">
                        <span>Progress</span>
                        <span>{Math.round(course.progress || 0)}%</span>
                      </div>
                      <a 
                        href="/courses" 
                        className="block mt-2 sm:mt-3 text-center text-orange-500 hover:text-orange-600 text-sm font-medium font-khula transition-colors duration-300"
                      >
                        View Details →
                      </a>
                    </div>
                  ))}
                </div>
                {generatedCourses.length > 6 && (
                  <div className="text-center mt-4 sm:mt-6">
                    <a 
                      href="/courses" 
                      className="text-orange-500 hover:text-orange-600 font-semibold font-khula transition-colors duration-300"
                    >
                      View All Courses ({generatedCourses.length})
                    </a>
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
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-4">🎯</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-khula">Ready to Create a Course?</h2>
                  <p className="text-center text-gray-600  font-khula">
                    Generate personalized learning materials on any topic with AI-powered course creation.
                  </p>
                  <button
                    onClick={handleCreateNewCourse}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold font-khula hover:shadow-lg transition-all duration-300"
                  >
                    ✨ Create Course    
                  </button>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}