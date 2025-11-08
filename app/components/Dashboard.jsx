"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Dashboard({ courses, onCreateNewCourse }) {
  const stats = {
    coursesCreated: courses.length,
    learningHours: Math.round(courses.reduce((total, course) => total + (course.progress || 0) / 100 * 20, 0)),
    completionRate: courses.length > 0 
      ? `${Math.round((courses.filter(c => (c.progress || 0) === 100).length / courses.length) * 100)}%` 
      : '0%',
    activeCourses: courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length
  }

  const StatCard = ({ title, value, icon, description }) => (
    <Card className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
      <CardContent className="p-4 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-3 w-full max-w-xs">
            {/* Icon Section - Left Side */}
            <div className="flex-shrink-0 text-orange-500">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center border border-orange-200">
                {icon}
              </div>
            </div>
            
            {/* Text Content - Right Side - CSS unchanged */}
            <div className="flex-1 text-left">
              <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
              <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <div className="p-6 lg:p-8 xl:p-10 w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <br />
          <Button 
            onClick={onCreateNewCourse}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 px-8 py-4 text-lg font-semibold border-2 border-orange-600"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Course
          </Button>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"><br />
            Dashboard 
          </h1>
          <p className="text-lg text-center text-gray-600 mx-auto mb-8 leading-relaxed">
            Track your learning progress and manage your courses efficiently
          </p>
          
        </div>
        <br />

        {/* Stats Grid - Smaller cards with same details CSS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 mb-12 lg:mb-16">
          <StatCard 
            title="Total Courses" 
            value={stats.coursesCreated}
            description="Courses you've created so far"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatCard 
            title="Learning Hours" 
            value={stats.learningHours}
            description="Total hours invested in learning"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard 
            title="Completion Rate" 
            value={stats.completionRate}
            description="Success rate of completed courses"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard 
            title="Active Courses" 
            value={stats.activeCourses}
            description="Courses currently in progress"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>

        
      </div>
    </div>
  )
}