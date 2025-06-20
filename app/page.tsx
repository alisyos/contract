import ContractGenerator from './components/ContractGenerator'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI 기반 계약서 자동생성
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          복잡한 계약서 작성을 AI가 도와드립니다. 
          단 5분만에 전문적인 계약서를 생성하고 편집할 수 있습니다.
        </p>
      </div>
      <ContractGenerator />
    </div>
  )
} 