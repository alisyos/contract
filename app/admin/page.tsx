'use client'

import { useState } from 'react'
import { promptCategories, commonPrompt } from '../data/prompts'
import PromptEditor from '../components/admin/PromptEditor'
import CategoryList from '../components/admin/CategoryList'
import { PromptCategory } from '../types/contract'

export default function AdminPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedContract, setSelectedContract] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = promptCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.contracts.some(contract =>
      contract.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const getCurrentPrompt = () => {
    if (!selectedCategory || !selectedContract) return null
    
    // 공통 프롬프트인 경우
    if (selectedCategory === 'common' && selectedContract === 'common') {
      return { type: 'common', data: commonPrompt }
    }
    
    const category = promptCategories.find(cat => cat.id === selectedCategory)
    if (!category) return null
    
    const contract = category.contracts.find(cont => cont.id === selectedContract)
    return contract ? { type: 'contract', data: contract } : null
  }

  const currentPrompt = getCurrentPrompt()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">프롬프트 관리자</h1>
                <p className="text-sm text-gray-600 mt-1">
                  계약서 유형별 시스템 프롬프트를 관리합니다
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="카테고리 또는 계약서 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>
                <div className="text-sm text-gray-500">
                  총 {promptCategories.reduce((acc, cat) => acc + cat.contracts.length, 0) + 1}개 (공통 포함사항 포함)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 좌측 사이드바 - 카테고리 및 계약서 목록 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">계약서 유형</h3>
              </div>
              <CategoryList
                categories={filteredCategories}
                selectedCategory={selectedCategory}
                selectedContract={selectedContract}
                onCategorySelect={setSelectedCategory}
                onContractSelect={setSelectedContract}
                commonPrompt={commonPrompt}
              />
            </div>
          </div>

          {/* 우측 메인 영역 - 프롬프트 에디터 */}
          <div className="lg:col-span-3">
            {currentPrompt ? (
              <PromptEditor
                category={selectedCategory}
                contract={currentPrompt.type === 'contract' ? currentPrompt.data as any : undefined}
                                  commonPrompt={currentPrompt.type === 'common' ? currentPrompt.data as any : undefined}
                onSave={async (updatedPrompt: string) => {
                  try {
                    const response = await fetch('/api/admin/prompts', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        category: selectedCategory,
                        contractType: selectedContract,
                        prompt: updatedPrompt,
                        isCommon: selectedCategory === 'common'
                      }),
                    })
                    
                    const result = await response.json()
                    
                    if (result.success) {
                      alert('프롬프트가 성공적으로 저장되었습니다.')
                    } else {
                      alert('저장 중 오류가 발생했습니다: ' + result.error)
                    }
                  } catch (error) {
                    console.error('Failed to save prompt:', error)
                    alert('저장 중 오류가 발생했습니다.')
                  }
                }}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                  <div className="text-6xl mb-4">📝</div>
                  <div className="text-lg font-medium mb-2">프롬프트 에디터</div>
                  <div className="text-sm text-center">
                    좌측에서 계약서 유형을 선택하면<br />
                    해당 프롬프트를 편집할 수 있습니다.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 