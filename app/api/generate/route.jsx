import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key' }, { status: 500 })
    }

    const data = await req.json()
    const { topic, duration, level, focusAreas = [] } = data

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' })
    
    // Enhanced prompt with user inputs
    const prompt = `Create a comprehensive learning course about: ${topic}
    
Course Specifications:
- Difficulty Level: ${level}
- Estimated Duration: ${duration || 'Self-paced'}
- Focus Areas: ${focusAreas.length > 0 ? focusAreas.join(', ') : 'General comprehensive coverage'}

Please structure the course with:
1. CLEAR COURSE TITLE AND OVERVIEW
2. LEARNING OBJECTIVES
3. WEEK-BY-WEEK or MODULE BREAKDOWN
4. KEY CONCEPTS FOR EACH SECTION
5. PRACTICAL EXERCISES/PROJECTS
6. ASSESSMENT CHECKPOINTS
7. ADDITIONAL RESOURCES
8. FINAL PROJECT/ASSESSMENT

Make the content engaging, practical, and suitable for ${level} level learners.
Format the response in a clear, organized manner that's easy to follow.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const output = response.text()

    return NextResponse.json({ output })
    
  } catch (error) {
    console.error('Full error:', error)
    return NextResponse.json(
      { error: `Generation failed: ${error.message}` },
      { status: 500 }
    )
  }
}