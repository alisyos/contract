'use client'

import { useState, useEffect } from 'react'

interface Contract {
  id: string
  name: string
  prompt: string
}

interface CommonPrompt {
  id: string
  name: string
  content: string
}

interface PromptEditorProps {
  category: string
  contract?: Contract
  commonPrompt?: CommonPrompt
  onSave: (updatedPrompt: string) => void
}

export default function PromptEditor({ category, contract, commonPrompt, onSave }: PromptEditorProps) {
  const currentItem = contract || commonPrompt
  const currentPrompt = contract?.prompt || commonPrompt?.content || ''
  
  const [prompt, setPrompt] = useState(currentPrompt)
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const newPrompt = contract?.prompt || commonPrompt?.content || ''
    setPrompt(newPrompt)
    setIsEditing(false)
    setHasChanges(false)
  }, [contract, commonPrompt])

  const handlePromptChange = (value: string) => {
    setPrompt(value)
    const originalPrompt = contract?.prompt || commonPrompt?.content || ''
    setHasChanges(value !== originalPrompt)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(prompt)
      setHasChanges(false)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save prompt:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    const originalPrompt = contract?.prompt || commonPrompt?.content || ''
    setPrompt(originalPrompt)
    setHasChanges(false)
    setIsEditing(false)
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const getCharCount = (text: string) => {
    return text.length
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentItem?.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {commonPrompt ? '모든 계약서에 적용되는 공통 조항 관리' : '시스템 프롬프트 편집 및 관리'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <span className="text-sm text-orange-600 font-medium">
                ⚠️ 저장되지 않은 변경사항
              </span>
            )}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>✏️</span>
                <span>편집</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <>
                      <span>⏳</span>
                      <span>저장 중...</span>
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      <span>저장</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                시스템 프롬프트
              </label>
              <div className="text-sm text-gray-500">
                {getCharCount(prompt)}자 / {getWordCount(prompt)}단어
              </div>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
              placeholder="시스템 프롬프트를 입력하세요..."
            />
            <div className="text-xs text-gray-500">
              💡 팁: {commonPrompt 
                ? '공통 포함사항은 모든 계약서에 자동으로 추가됩니다. 법적 기본 조항들을 포함해주세요.' 
                : '명확하고 구체적인 지시사항을 포함하여 AI가 더 정확한 계약서를 생성할 수 있도록 도와주세요.'}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                현재 시스템 프롬프트
              </label>
              <div className="text-sm text-gray-500">
                {getCharCount(prompt)}자 / {getWordCount(prompt)}단어
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                {prompt}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 프롬프트 템플릿 가이드 */}
      {isEditing && (
        <div className="p-6 bg-blue-50 border-t border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">📋 {commonPrompt ? '공통 프롬프트' : '프롬프트'} 작성 가이드</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            {commonPrompt ? (
              <>
                <li>• 모든 계약서에 공통으로 적용될 기본 조항 작성</li>
                <li>• 총칙, 일반조건, 불가항력, 분쟁해결 등 필수 항목 포함</li>
                <li>• 법적 요구사항 및 기본 준수사항 명시</li>
                <li>• 계약서 작성 및 관리에 필요한 공통 절차 포함</li>
                <li>• 명확하고 일관된 법적 용어 사용</li>
              </>
            ) : (
              <>
                <li>• 계약서 유형에 맞는 전문 영역 명시</li>
                <li>• 포함되어야 할 핵심 조항들 나열</li>
                <li>• 법적 요구사항 및 준수사항 명시</li>
                <li>• 양 당사자의 권리와 의무 균형 고려</li>
                <li>• 명확하고 구체적인 지시사항 제공</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
} 