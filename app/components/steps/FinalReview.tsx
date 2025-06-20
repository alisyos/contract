'use client'

import { ContractData } from '../../types/contract'

interface FinalReviewProps {
  data: ContractData
  onGenerate: () => void
  onPrevious: () => void
  isGenerating: boolean
}

const contractTypeNames: { [key: string]: string } = {
  // 제조업
  supply: '납품계약서',
  oem: '생산위탁계약서',
  quality: '품질보증계약서',
  
  // IT/소프트웨어
  software_dev: '소프트웨어 개발/유지보수 계약서',
  license: '라이선스 계약서',
  cloud: '클라우드 서비스 이용 계약서',
  
  // 유통/물류
  supply_chain: '공급계약서',
  agency: '유통대리점 계약서',
  logistics: '물류대행계약서',
  
  // 건설/부동산
  construction: '공사도급계약서',
  lease: '임대차계약서',
  supervision: '감리계약서',
  
  // 금융/보험
  loan: '대출계약서',
  insurance: '보험계약서',
  investment: '투자계약서',
  
  // 의료/제약
  clinical: '임상시험계약서',
  medical_consign: '위수탁(의료/실험) 계약서',
  research: '연구용역계약서',
  
  // 서비스업
  service: '용역(파견/도급)계약서',
  consulting: '컨설팅계약서',
  marketing: '마케팅/광고대행계약서',
  
  // 교육
  education_consign: '위탁교육 계약서',
  education_service: '교육용역계약서',
  instructor: '강사 계약서',
  
  // 엔터테인먼트/미디어
  copyright: '저작권/초상권 계약서',
  talent: '출연(연예인, 방송인) 계약서',
  model: '광고모델 계약서',
  
  // 공공/정부
  public_consign: '위수탁 계약서',
  policy: '정책과제 수행 계약서',
  public_research: '연구용역 계약서',
}

const paymentTermsNames: { [key: string]: string } = {
  immediate: '즉시 지급',
  net30: '30일 후 지급',
  net60: '60일 후 지급',
  installment: '분할 지급',
}

export default function FinalReview({ data, onGenerate, onPrevious, isGenerating }: FinalReviewProps) {
  const getSelectedConditions = () => {
    const conditions = []
    if (data.specialConditions.qualityAssurance) conditions.push('품질보증 조항')
    if (data.specialConditions.confidentiality) conditions.push('비밀유지 조항')
    if (data.specialConditions.exclusivity) conditions.push('독점 계약 조항')
    return conditions
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">입력 정보 확인</h4>
        
        <div className="space-y-4">
          {/* 계약 유형 */}
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">계약 유형</span>
            <span className="text-gray-900">{contractTypeNames[data.contractType] || data.contractType}</span>
          </div>

          {/* 당사자 정보 */}
          <div className="py-2 border-b border-gray-200">
            <div className="font-medium text-gray-700 mb-2">당사자 정보</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-600">갑 (발주자)</div>
                <div>{data.partyA.companyName}</div>
                <div>대표: {data.partyA.representative}</div>
                <div>사업자: {data.partyA.businessNumber}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600">을 (수급자)</div>
                <div>{data.partyB.companyName}</div>
                <div>대표: {data.partyB.representative}</div>
                <div>사업자: {data.partyB.businessNumber}</div>
              </div>
            </div>
          </div>

          {/* 계약 조건 */}
          <div className="py-2 border-b border-gray-200">
            <div className="font-medium text-gray-700 mb-2">계약 조건</div>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">계약 대상:</span> {data.terms.subject}</div>
              <div><span className="font-medium">계약 금액:</span> {data.terms.amount} {data.terms.currency} ({data.terms.taxIncluded ? '부가세 포함' : '부가세 별도'})</div>
              <div><span className="font-medium">계약 기간:</span> {data.terms.startDate} ~ {data.terms.endDate}</div>
              <div><span className="font-medium">지급 조건:</span> {paymentTermsNames[data.terms.paymentTerms] || data.terms.paymentTerms}</div>
            </div>
          </div>

          {/* 특수 조건 */}
          <div className="py-2">
            <div className="font-medium text-gray-700 mb-2">특수 조건</div>
            <div className="text-sm">
              {getSelectedConditions().length > 0 ? (
                <div className="mb-2">
                  <span className="font-medium">표준 조건:</span> {getSelectedConditions().join(', ')}
                </div>
              ) : (
                <div className="text-gray-500 mb-2">선택된 표준 조건 없음</div>
              )}
              {data.specialConditions.customConditions && (
                <div>
                  <span className="font-medium">추가 조건:</span>
                  <div className="mt-1 p-2 bg-gray-100 rounded text-xs">
                    {data.specialConditions.customConditions}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 mt-0.5">🤖</div>
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">AI 계약서 생성 안내</div>
            <div>
              입력하신 정보를 바탕으로 전문적인 계약서를 생성합니다. 
              생성된 계약서는 우측 미리보기에서 확인하고 편집할 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary" disabled={isGenerating}>
          이전 단계
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="btn-primary flex items-center space-x-2"
        >
          {isGenerating && <span className="animate-spin">⏳</span>}
          <span>{isGenerating ? '계약서 생성 중...' : '계약서 생성하기'}</span>
        </button>
      </div>
    </div>
  )
} 