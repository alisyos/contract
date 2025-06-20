'use client'

import { ContractData } from '../../types/contract'

interface ContractTermsProps {
  data: ContractData
  onChange: (data: Partial<ContractData>) => void
  onNext: () => void
  onPrevious: () => void
}

const paymentTermsOptions = [
  { value: 'immediate', label: '즉시 지급' },
  { value: 'net30', label: '30일 후 지급' },
  { value: 'net60', label: '60일 후 지급' },
  { value: 'installment', label: '분할 지급' },
]

export default function ContractTerms({ data, onChange, onNext, onPrevious }: ContractTermsProps) {
  const handleTermsChange = (field: string, value: string | boolean) => {
    onChange({
      terms: {
        ...data.terms,
        [field]: value,
      },
    })
  }

  const isFormValid = () => {
    const { terms } = data
    return (
      terms.subject &&
      terms.description &&
      terms.amount &&
      terms.startDate &&
      terms.endDate &&
      terms.paymentTerms
    )
  }

  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, '')
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAmountChange = (value: string) => {
    const formatted = formatNumber(value)
    handleTermsChange('amount', formatted)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          계약 대상 (제품/서비스명) *
        </label>
        <input
          type="text"
          value={data.terms.subject}
          onChange={(e) => handleTermsChange('subject', e.target.value)}
          className="input-field"
          placeholder="계약 대상을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상세 설명 *
        </label>
        <textarea
          value={data.terms.description}
          onChange={(e) => handleTermsChange('description', e.target.value)}
          className="input-field h-24 resize-none"
          placeholder="계약 대상에 대한 상세 설명을 입력하세요"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            계약 금액 *
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.terms.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="input-field pr-12"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 text-sm">원</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            통화
          </label>
          <select
            value={data.terms.currency}
            onChange={(e) => handleTermsChange('currency', e.target.value)}
            className="input-field"
          >
            <option value="KRW">원 (KRW)</option>
            <option value="USD">달러 (USD)</option>
            <option value="EUR">유로 (EUR)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          부가세 포함 여부
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="taxIncluded"
              checked={data.terms.taxIncluded}
              onChange={() => handleTermsChange('taxIncluded', true)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">부가세 포함</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="taxIncluded"
              checked={!data.terms.taxIncluded}
              onChange={() => handleTermsChange('taxIncluded', false)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">부가세 별도</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            계약 시작일 *
          </label>
          <input
            type="date"
            value={data.terms.startDate}
            onChange={(e) => handleTermsChange('startDate', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            계약 종료일 *
          </label>
          <input
            type="date"
            value={data.terms.endDate}
            onChange={(e) => handleTermsChange('endDate', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          지급 조건 *
        </label>
        <select
          value={data.terms.paymentTerms}
          onChange={(e) => handleTermsChange('paymentTerms', e.target.value)}
          className="input-field"
        >
          <option value="">지급 조건을 선택하세요</option>
          {paymentTermsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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