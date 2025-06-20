'use client'

import { ContractData } from '../../types/contract'

interface PartyInformationProps {
  data: ContractData
  onChange: (data: Partial<ContractData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function PartyInformation({ data, onChange, onNext, onPrevious }: PartyInformationProps) {
  const handlePartyAChange = (field: string, value: string | boolean) => {
    onChange({
      partyA: {
        ...data.partyA,
        [field]: value,
      },
    })
  }

  const handlePartyBChange = (field: string, value: string | boolean) => {
    onChange({
      partyB: {
        ...data.partyB,
        [field]: value,
      },
    })
  }

  const isFormValid = () => {
    const { partyA, partyB } = data
    
    // 갑 정보 검증
    const partyAValid = partyA.fillLater || (
      partyA.companyName &&
      partyA.representative &&
      partyA.businessNumber &&
      partyA.address
    )
    
    // 을 정보 검증
    const partyBValid = partyB.fillLater || (
      partyB.companyName &&
      partyB.representative &&
      partyB.businessNumber &&
      partyB.address
    )
    
    return partyAValid && partyBValid
  }

  return (
    <div className="space-y-8">
      {/* 갑 (발주자) 정보 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">갑 (발주자) 정보</h4>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={data.partyA.fillLater || false}
              onChange={(e) => handlePartyAChange('fillLater', e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-600">나중에 입력</span>
          </label>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회사명 *
            </label>
            <input
              type="text"
              value={data.partyA.fillLater ? '' : data.partyA.companyName}
              onChange={(e) => handlePartyAChange('companyName', e.target.value)}
              className="input-field"
              placeholder={data.partyA.fillLater ? "계약서에 빈칸으로 표시됩니다" : "회사명을 입력하세요"}
              disabled={data.partyA.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              대표자명 *
            </label>
            <input
              type="text"
              value={data.partyA.fillLater ? '' : data.partyA.representative}
              onChange={(e) => handlePartyAChange('representative', e.target.value)}
              className="input-field"
              placeholder={data.partyA.fillLater ? "계약서에 빈칸으로 표시됩니다" : "대표자명을 입력하세요"}
              disabled={data.partyA.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사업자등록번호 *
            </label>
            <input
              type="text"
              value={data.partyA.fillLater ? '' : data.partyA.businessNumber}
              onChange={(e) => handlePartyAChange('businessNumber', e.target.value)}
              className="input-field"
              placeholder={data.partyA.fillLater ? "계약서에 빈칸으로 표시됩니다" : "000-00-00000"}
              disabled={data.partyA.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주소 *
            </label>
            <textarea
              value={data.partyA.fillLater ? '' : data.partyA.address}
              onChange={(e) => handlePartyAChange('address', e.target.value)}
              className="input-field h-20 resize-none"
              placeholder={data.partyA.fillLater ? "계약서에 빈칸으로 표시됩니다" : "주소를 입력하세요"}
              disabled={data.partyA.fillLater}
            />
          </div>
        </div>
      </div>

      {/* 을 (수급자) 정보 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">을 (수급자) 정보</h4>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={data.partyB.fillLater || false}
              onChange={(e) => handlePartyBChange('fillLater', e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-600">나중에 입력</span>
          </label>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회사명 *
            </label>
            <input
              type="text"
              value={data.partyB.fillLater ? '' : data.partyB.companyName}
              onChange={(e) => handlePartyBChange('companyName', e.target.value)}
              className="input-field"
              placeholder={data.partyB.fillLater ? "계약서에 빈칸으로 표시됩니다" : "회사명을 입력하세요"}
              disabled={data.partyB.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              대표자명 *
            </label>
            <input
              type="text"
              value={data.partyB.fillLater ? '' : data.partyB.representative}
              onChange={(e) => handlePartyBChange('representative', e.target.value)}
              className="input-field"
              placeholder={data.partyB.fillLater ? "계약서에 빈칸으로 표시됩니다" : "대표자명을 입력하세요"}
              disabled={data.partyB.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사업자등록번호 *
            </label>
            <input
              type="text"
              value={data.partyB.fillLater ? '' : data.partyB.businessNumber}
              onChange={(e) => handlePartyBChange('businessNumber', e.target.value)}
              className="input-field"
              placeholder={data.partyB.fillLater ? "계약서에 빈칸으로 표시됩니다" : "000-00-00000"}
              disabled={data.partyB.fillLater}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주소 *
            </label>
            <textarea
              value={data.partyB.fillLater ? '' : data.partyB.address}
              onChange={(e) => handlePartyBChange('address', e.target.value)}
              className="input-field h-20 resize-none"
              placeholder={data.partyB.fillLater ? "계약서에 빈칸으로 표시됩니다" : "주소를 입력하세요"}
              disabled={data.partyB.fillLater}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary">
          이전 단계
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className="btn-primary"
        >
          다음 단계
        </button>
      </div>
    </div>
  )
} 