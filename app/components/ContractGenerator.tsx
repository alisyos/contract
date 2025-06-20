'use client'

import { useState } from 'react'
import StepIndicator from './StepIndicator'
import ContractTypeSelector from './steps/ContractTypeSelector'
import PartyInformation from './steps/PartyInformation'
import ContractTerms from './steps/ContractTerms'
import SpecialConditions from './steps/SpecialConditions'
import FinalReview from './steps/FinalReview'
import ContractPreview from './ContractPreview'
import { ContractData } from '../types/contract'

const steps = [
  { id: 1, title: '1단계 계약 유형 선택', component: 'ContractTypeSelector' },
  { id: 2, title: '2단계 당사자 정보', component: 'PartyInformation' },
  { id: 3, title: '3단계 거래 조건', component: 'ContractTerms' },
  { id: 4, title: '4단계 특수 조건', component: 'SpecialConditions' },
  { id: 5, title: '5단계 최종 확인', component: 'FinalReview' },
]

export default function ContractGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [contractData, setContractData] = useState<ContractData>({
    contractCategory: '',
    contractType: '',
    partyA: {
      companyName: '',
      representative: '',
      businessNumber: '',
      address: '',
    },
    partyB: {
      companyName: '',
      representative: '',
      businessNumber: '',
      address: '',
    },
    terms: {
      subject: '',
      description: '',
      amount: '',
      currency: 'KRW',
      taxIncluded: true,
      startDate: '',
      endDate: '',
      paymentTerms: '',
    },
    specialConditions: {
      qualityAssurance: false,
      confidentiality: false,
      exclusivity: false,
      customConditions: '',
    },
    generatedContract: '',
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDataChange = (stepData: Partial<ContractData>) => {
    setContractData(prev => ({ ...prev, ...stepData }))
  }

  const generateContract = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      })
      
      // 응답이 JSON이 아닌 경우 처리 (504 에러 등)
      if (!response.ok) {
        let errorMessage = '계약서 생성에 실패했습니다.'
        
        if (response.status === 504) {
          errorMessage = '서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'
        } else if (response.status === 408) {
          errorMessage = '요청 시간이 초과되었습니다. 다시 시도해주세요.'
        } else if (response.status === 503) {
          errorMessage = 'AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.'
        }
        
        alert(errorMessage)
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setContractData(prev => ({ ...prev, generatedContract: data.contract }))
      } else {
        alert(data.error || '계약서 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error generating contract:', error)
      
      // 네트워크 에러나 JSON 파싱 에러 처리
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert('네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.')
      } else if (error instanceof SyntaxError) {
        alert('서버 응답에 문제가 있습니다. 잠시 후 다시 시도해주세요.')
      } else {
        alert('예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContractTypeSelector
            data={contractData}
            onChange={handleDataChange}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <PartyInformation
            data={contractData}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <ContractTerms
            data={contractData}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <SpecialConditions
            data={contractData}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 5:
        return (
          <FinalReview
            data={contractData}
            onGenerate={generateContract}
            onPrevious={handlePrevious}
            isGenerating={isGenerating}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* 좌측 패널 - 입력 폼 */}
      <div className="lg:col-span-2">
        <div className="card sticky top-8">
          <StepIndicator steps={steps} currentStep={currentStep} />
          <div className="mt-6">
            {renderStepComponent()}
          </div>
        </div>
      </div>

      {/* 우측 패널 - 미리보기 */}
      <div className="lg:col-span-3">
        <div className="card sticky top-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            계약서 미리보기
          </h3>
          <ContractPreview data={contractData} />
        </div>
      </div>
    </div>
  )
} 