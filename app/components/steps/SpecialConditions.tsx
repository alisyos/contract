'use client'

import { ContractData } from '../../types/contract'

interface SpecialConditionsProps {
  data: ContractData
  onChange: (data: Partial<ContractData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function SpecialConditions({ data, onChange, onNext, onPrevious }: SpecialConditionsProps) {
  const handleConditionChange = (field: string, value: boolean | string) => {
    onChange({
      specialConditions: {
        ...data.specialConditions,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">표준 특수 조건</h4>
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.specialConditions.qualityAssurance}
              onChange={(e) => handleConditionChange('qualityAssurance', e.target.checked)}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">품질보증 조항</div>
              <div className="text-sm text-gray-600">
                납품/서비스 제공 후 일정 기간 동안 품질을 보증하는 조항을 포함합니다.
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.specialConditions.confidentiality}
              onChange={(e) => handleConditionChange('confidentiality', e.target.checked)}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">비밀유지 조항</div>
              <div className="text-sm text-gray-600">
                계약 과정에서 알게 된 기밀정보의 보호에 관한 조항을 포함합니다.
              </div>
            </div>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.specialConditions.exclusivity}
              onChange={(e) => handleConditionChange('exclusivity', e.target.checked)}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">독점 계약 조항</div>
              <div className="text-sm text-gray-600">
                계약 기간 중 독점적 관계를 유지하는 조항을 포함합니다.
              </div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          추가 특별 조건 (선택사항)
        </label>
        <textarea
          value={data.specialConditions.customConditions}
          onChange={(e) => handleConditionChange('customConditions', e.target.value)}
          className="input-field h-32 resize-none"
          placeholder="추가로 포함하고 싶은 특별 조건이 있다면 입력하세요.
예: 계약 해지 조건, 손해배상 조항, 지적재산권 관련 조항 등"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 mt-0.5">ℹ️</div>
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">참고사항</div>
            <div>
              선택하신 조건들은 AI가 계약서 생성 시 자동으로 포함시킵니다. 
              생성 후에도 내용을 수정하거나 추가 조항을 넣을 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary">
          이전 단계
        </button>
        <button onClick={onNext} className="btn-primary">
          다음 단계
        </button>
      </div>
    </div>
  )
} 