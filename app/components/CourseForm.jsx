"use client"

import { useState } from "react"

export default function CourseForm({ onCourseGenerated, onCancel }) {
  const [formData, setFormData] = useState({
    topic: '',
    duration: '',
    level: 'beginner',
    focusAreas: []
  })
  const [isLoading, setIsLoading] = useState(false)

  const focusOptions = ['Practical Projects', 'Theory', 'Code Examples', 'Best Practices', 'Real-world Applications']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topic.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: formData.topic,
          duration: formData.duration,
          level: formData.level,
          focusAreas: formData.focusAreas
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        const courseData = {
          ...formData,
          content: data.output,
          createdAt: new Date().toISOString(),
        }
        onCourseGenerated(courseData)
        
        // Reset form
        setFormData({
          topic: '',
          duration: '',
          level: 'beginner',
          focusAreas: []
        })
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error generating course:', error)
      alert('Failed to generate course. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFocusArea = (area) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }))
  }

  return (
    <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto border border-gray-200 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 font-khula">Create New Course</h2>
          <p className="text-gray-600 font-khula">Generate a personalized learning course with AI</p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-khula">
            Course Topic *
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="e.g., Machine Learning Basics, Advanced React Patterns, Python for Data Science..."
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-khula"
            required
          />
        </div>

        {/* Duration and Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-khula">
              Estimated Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-khula"
            >
              <option value="" className="bg-white">Select duration</option>
              <option value="1-2 weeks" className="bg-white">1-2 weeks</option>
              <option value="3-4 weeks" className="bg-white">3-4 weeks</option>
              <option value="1-2 months" className="bg-white">1-2 months</option>
              <option value="3+ months" className="bg-white">3+ months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-khula">
              Difficulty Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-khula"
            >
              <option value="beginner" className="bg-white">Beginner</option>
              <option value="intermediate" className="bg-white">Intermediate</option>
              <option value="advanced" className="bg-white">Advanced</option>
            </select>
          </div>
        </div>

        {/* Focus Areas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-khula">
            Focus Areas (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {focusOptions.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => toggleFocusArea(area)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all font-khula ${
                  formData.focusAreas.includes(area)
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold font-khula hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !formData.topic.trim()}
            className={`${onCancel ? 'flex-1' : 'w-full'} bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold font-khula disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Course...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Course</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}