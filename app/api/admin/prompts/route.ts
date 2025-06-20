import { NextRequest, NextResponse } from 'next/server'
import { updatePrompt, updateCommonPrompt, promptCategories, commonPrompt } from '../../../data/prompts'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        categories: promptCategories,
        commonPrompt: commonPrompt
      }
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { category, contractType, prompt, isCommon } = await request.json()

    if (!category || !contractType || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let success = false

    if (isCommon && category === 'common') {
      // 공통 프롬프트 업데이트
      success = updateCommonPrompt(prompt)
    } else {
      // 일반 계약서 프롬프트 업데이트
      success = updatePrompt(category, contractType, prompt)
    }

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update prompt' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Prompt updated successfully'
    })
  } catch (error) {
    console.error('Error updating prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update prompt' },
      { status: 500 }
    )
  }
} 