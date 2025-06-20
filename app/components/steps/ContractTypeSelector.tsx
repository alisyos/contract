'use client'

import { useState } from 'react'
import { ContractData, ContractCategory } from '../../types/contract'

const contractCategories: ContractCategory[] = [
  {
    id: 'manufacturing',
    name: '제조업',
    description: '제조업 관련 계약서',
    icon: '🏭',
    contracts: [
      { id: 'supply', name: '납품계약서', description: '제품 납품에 관한 계약' },
      { id: 'oem', name: '생산위탁계약서', description: '제품 생산 위탁에 관한 계약' },
      { id: 'quality', name: '품질보증계약서', description: '제품 품질보증에 관한 계약' },
    ]
  },
  {
    id: 'it',
    name: 'IT/소프트웨어',
    description: 'IT 및 소프트웨어 관련 계약서',
    icon: '💻',
    contracts: [
      { id: 'software_dev', name: '소프트웨어 개발/유지보수 계약서', description: '소프트웨어 개발 및 유지보수 계약' },
      { id: 'license', name: '라이선스 계약서', description: '소프트웨어 라이선스에 관한 계약' },
      { id: 'cloud', name: '클라우드 서비스 이용 계약서', description: '클라우드 서비스 이용에 관한 계약' },
    ]
  },
  {
    id: 'distribution',
    name: '유통/물류',
    description: '유통 및 물류 관련 계약서',
    icon: '🚚',
    contracts: [
      { id: 'supply_chain', name: '공급계약서', description: '상품 공급에 관한 계약' },
      { id: 'agency', name: '유통대리점 계약서', description: '유통 대리점 운영에 관한 계약' },
      { id: 'logistics', name: '물류대행계약서', description: '물류 대행 서비스에 관한 계약' },
    ]
  },
  {
    id: 'construction',
    name: '건설/부동산',
    description: '건설 및 부동산 관련 계약서',
    icon: '🏗️',
    contracts: [
      { id: 'construction', name: '공사도급계약서', description: '건설공사 도급에 관한 계약' },
      { id: 'lease', name: '임대차계약서', description: '부동산 임대차에 관한 계약' },
      { id: 'supervision', name: '감리계약서', description: '건설 감리에 관한 계약' },
    ]
  },
  {
    id: 'finance',
    name: '금융/보험',
    description: '금융 및 보험 관련 계약서',
    icon: '💰',
    contracts: [
      { id: 'loan', name: '대출계약서', description: '금융대출에 관한 계약' },
      { id: 'insurance', name: '보험계약서', description: '보험 가입에 관한 계약' },
      { id: 'investment', name: '투자계약서', description: '투자에 관한 계약' },
    ]
  },
  {
    id: 'medical',
    name: '의료/제약',
    description: '의료 및 제약 관련 계약서',
    icon: '🏥',
    contracts: [
      { id: 'clinical', name: '임상시험계약서', description: '임상시험 수행에 관한 계약' },
      { id: 'medical_consign', name: '위수탁(의료/실험) 계약서', description: '의료/실험 위수탁에 관한 계약' },
      { id: 'research', name: '연구용역계약서', description: '연구 용역에 관한 계약' },
    ]
  },
  {
    id: 'service',
    name: '서비스업',
    description: '각종 서비스업 관련 계약서',
    icon: '🤝',
    contracts: [
      { id: 'service', name: '용역(파견/도급)계약서', description: '서비스 제공에 관한 계약' },
      { id: 'consulting', name: '컨설팅계약서', description: '전문 컨설팅 서비스 계약' },
      { id: 'marketing', name: '마케팅/광고대행계약서', description: '마케팅 및 광고 대행 계약' },
    ]
  },
  {
    id: 'education',
    name: '교육',
    description: '교육 관련 계약서',
    icon: '📚',
    contracts: [
      { id: 'education_consign', name: '위탁교육 계약서', description: '위탁교육에 관한 계약' },
      { id: 'education_service', name: '교육용역계약서', description: '교육 용역에 관한 계약' },
      { id: 'instructor', name: '강사 계약서', description: '강사 위촉에 관한 계약' },
    ]
  },
  {
    id: 'entertainment',
    name: '엔터테인먼트/미디어',
    description: '엔터테인먼트 및 미디어 관련 계약서',
    icon: '🎬',
    contracts: [
      { id: 'copyright', name: '저작권/초상권 계약서', description: '저작권 및 초상권에 관한 계약' },
      { id: 'talent', name: '출연(연예인, 방송인) 계약서', description: '연예인/방송인 출연 계약' },
      { id: 'model', name: '광고모델 계약서', description: '광고 모델에 관한 계약' },
    ]
  },
  {
    id: 'public',
    name: '공공/정부',
    description: '공공기관 및 정부 관련 계약서',
    icon: '🏛️',
    contracts: [
      { id: 'public_consign', name: '위수탁 계약서', description: '공공업무 위수탁에 관한 계약' },
      { id: 'policy', name: '정책과제 수행 계약서', description: '정책과제 수행에 관한 계약' },
      { id: 'public_research', name: '연구용역 계약서', description: '공공 연구용역에 관한 계약' },
    ]
  },
]

interface ContractTypeSelectorProps {
  data: ContractData
  onChange: (data: Partial<ContractData>) => void
  onNext: () => void
}

export default function ContractTypeSelector({ data, onChange, onNext }: ContractTypeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(data.contractCategory || '')

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onChange({ contractCategory: categoryId, contractType: '' })
  }

  const handleTypeSelect = (typeId: string) => {
    onChange({ contractType: typeId })
  }

  const handleNext = () => {
    if (data.contractType) {
      onNext()
    }
  }

  const selectedCategoryData = contractCategories.find(cat => cat.id === selectedCategory)

  return (
    <div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 좌측: 대분류 */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">대분류</h4>
          <div className="space-y-2">
            {contractCategories.map((category) => (
              <div
                key={category.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  selectedCategory === category.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm">{category.name}</h5>
                    </div>
                  {selectedCategory === category.id && (
                    <div className="text-primary-600">
                      <span className="text-lg">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 소분류 */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">소분류</h4>
          
          {selectedCategoryData ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedCategoryData.contracts.map((contract) => (
                <div
                  key={contract.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    data.contractType === contract.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTypeSelect(contract.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">{contract.name}</h5>
                    </div>
                    {data.contractType === contract.id && (
                      <div className="text-primary-600 ml-3">
                        <span className="text-xl">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-4xl mb-3">📋</div>
              <div className="text-center">
                <p className="text-lg font-medium mb-1">대분류를 선택해주세요</p>
                <p className="text-sm">좌측에서 대분류를 선택하면<br />해당하는 소분류 목록이 표시됩니다</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!data.contractType}
          className="btn-primary"
        >
          다음 단계
        </button>
      </div>
    </div>
  )
} 