"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

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
    <Card className="w-full mx-auto border border-gray-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Create New Course
            </CardTitle>
            <p className="text-gray-600">Generate a personalized learning course with AI</p>
          </div>
          {onCancel && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
              Course Topic *
            </Label>
            <Input
              id="topic"
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="e.g., Machine Learning Basics, Advanced React Patterns, Python for Data Science..."
              className="w-full"
              required
            />
          </div>

          {/* Duration and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                Estimated Duration
              </Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium text-gray-700">
                Difficulty Level
              </Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Focus Areas (Optional)
            </Label>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map((area) => (
                <Button
                  key={area}
                  type="button"
                  variant={formData.focusAreas.includes(area) ? "default" : "outline"}
                  onClick={() => toggleFocusArea(area)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    formData.focusAreas.includes(area) &&
                      "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md border-orange-500"
                  )}
                >
                  {area}
                </Button>
              ))}
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex space-x-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-orange-50"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading || !formData.topic.trim()}
              className={cn(
                onCancel ? "flex-1" : "w-full",
                "bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              )}
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
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}