'use client'

import { PromptCategory } from '../../types/contract'

interface CategoryListProps {
  categories: PromptCategory[]
  selectedCategory: string
  selectedContract: string
  onCategorySelect: (categoryId: string) => void
  onContractSelect: (contractId: string) => void
  commonPrompt?: { id: string; name: string; content: string }
}

export default function CategoryList({
  categories,
  selectedCategory,
  selectedContract,
  onCategorySelect,
  onContractSelect,
  commonPrompt
}: CategoryListProps) {
  return (
    <div>
      {/* 공통 프롬프트 섹션 */}
      {commonPrompt && (
        <div className="border-b border-gray-200 bg-yellow-50">
          <button
            onClick={() => {
              onCategorySelect('common')
              onContractSelect('common')
            }}
            className={`w-full text-left p-4 hover:bg-yellow-100 transition-colors ${
              selectedCategory === 'common' ? 'bg-yellow-100 border-r-2 border-yellow-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">⚙️</span>
              <div>
                <div className="font-medium text-gray-900">공통 포함사항</div>
                <div className="text-sm text-gray-600">
                  모든 계약서에 적용되는 공통 조항
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
      
      {categories.map((category) => (
        <div key={category.id} className="border-b border-gray-100 last:border-b-0">
          <button
            onClick={() => {
              onCategorySelect(category.id)
              // 카테고리 선택 시 첫 번째 계약서 자동 선택
              if (category.contracts.length > 0) {
                onContractSelect(category.contracts[0].id)
              }
            }}
            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
              selectedCategory === category.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{category.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{category.name}</div>
                <div className="text-sm text-gray-500">
                  {category.contracts.length}개 계약서
                </div>
              </div>
            </div>
          </button>
          
          {selectedCategory === category.id && (
            <div className="bg-gray-50 border-t border-gray-100">
              {category.contracts.map((contract) => (
                <button
                  key={contract.id}
                  onClick={() => onContractSelect(contract.id)}
                  className={`w-full text-left px-6 py-3 text-sm hover:bg-gray-100 transition-colors ${
                    selectedContract === contract.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {contract.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 