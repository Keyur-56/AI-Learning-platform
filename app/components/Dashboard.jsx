"use client"

export default function Dashboard({ courses, onCreateNewCourse }) {
  const stats = {
    coursesCreated: courses.length,
    learningHours: Math.round(courses.reduce((total, course) => total + (course.progress || 0) / 100 * 20, 0)),
    completionRate: courses.length > 0 
      ? `${Math.round((courses.filter(c => (c.progress || 0) === 100).length / courses.length) * 100)}%` 
      : '0%',
    activeCourses: courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length
  }

  const recentCourses = courses.slice(0, 3)

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600 font-khula">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 font-khula">{value}</p>
        </div>
        <div className="text-orange-500 ml-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard 
          title="Courses Created" 
          value={stats.coursesCreated}
          icon={
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatCard 
          title="Learning Hours" 
          value={stats.learningHours}
          icon={
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Completion Rate" 
          value={stats.completionRate}
          icon={
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Active Courses" 
          value={stats.activeCourses}
          icon={
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>

      

    </div>
  )
}