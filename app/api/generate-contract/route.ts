import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getPromptByContractType, commonPrompt } from '../../data/prompts'
import { ContractData } from '../../types/contract'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const contractTypePrompts: { [key: string]: string } = {
  // 제조업
  supply: '제품 납품에 관한 계약서',
  oem: '제품 생산 위탁에 관한 계약서',
  quality: '제품 품질보증에 관한 계약서',
  
  // IT/소프트웨어
  software_dev: '소프트웨어 개발/유지보수에 관한 계약서',
  license: '소프트웨어 라이센스에 관한 계약서',
  cloud: '클라우드 서비스 이용에 관한 계약서',
  
  // 유통/물류
  supply_chain: '상품 공급에 관한 계약서',
  agency: '유통 대리점 운영에 관한 계약서',
  logistics: '물류 대행 서비스에 관한 계약서',
  
  // 건설/부동산
  construction: '건설공사 도급에 관한 계약서',
  lease: '부동산 임대차에 관한 계약서',
  supervision: '건설 감리에 관한 계약서',
  
  // 금융/보험
  loan: '금융대출에 관한 계약서',
  insurance: '보험 가입에 관한 계약서',
  investment: '투자에 관한 계약서',
  
  // 의료/제약
  clinical: '임상시험 수행에 관한 계약서',
  medical_consign: '의료/실험 위수탁에 관한 계약서',
  research: '연구 용역에 관한 계약서',
  
  // 서비스업
  service: '서비스 제공에 관한 용역계약서',
  consulting: '전문 컨설팅 서비스에 관한 계약서',
  marketing: '마케팅/광고 대행에 관한 계약서',
  
  // 교육
  education_consign: '위탁교육에 관한 계약서',
  education_service: '교육 용역에 관한 계약서',
  instructor: '강사 위촉에 관한 계약서',
  
  // 엔터테인먼트/미디어
  copyright: '저작권/초상권에 관한 계약서',
  talent: '연예인/방송인 출연에 관한 계약서',
  model: '광고 모델에 관한 계약서',
  
  // 공공/정부
  public_consign: '공공업무 위수탁에 관한 계약서',
  policy: '정책과제 수행에 관한 계약서',
  public_research: '공공 연구용역에 관한 계약서',
}

const paymentTermsTexts: { [key: string]: string } = {
  immediate: '계약 체결 즉시',
  net30: '납품/서비스 완료 후 30일 이내',
  net60: '납품/서비스 완료 후 60일 이내',
  installment: '계약서에 명시된 일정에 따라 분할',
}

function generateContractPrompt(data: ContractData): string {
  const contractTypeText = contractTypePrompts[data.contractType] || '계약서'
  const paymentText = paymentTermsTexts[data.terms.paymentTerms] || data.terms.paymentTerms
  
  const specialConditions = []
  if (data.specialConditions.qualityAssurance) {
    specialConditions.push('품질보증 조항 포함')
  }
  if (data.specialConditions.confidentiality) {
    specialConditions.push('비밀유지 조항 포함')
  }
  if (data.specialConditions.exclusivity) {
    specialConditions.push('독점계약 조항 포함')
  }

  const partyAInfo = data.partyA.fillLater 
    ? "갑(발주자): [회사명] (대표: [대표자명], 사업자등록번호: [사업자등록번호])\n  주소: [주소]"
    : `갑(발주자): ${data.partyA.companyName} (대표: ${data.partyA.representative}, 사업자등록번호: ${data.partyA.businessNumber})\n  주소: ${data.partyA.address}`
  
  const partyBInfo = data.partyB.fillLater
    ? "을(수급자): [회사명] (대표: [대표자명], 사업자등록번호: [사업자등록번호])\n  주소: [주소]"
    : `을(수급자): ${data.partyB.companyName} (대표: ${data.partyB.representative}, 사업자등록번호: ${data.partyB.businessNumber})\n  주소: ${data.partyB.address}`

  return `다음 정보를 바탕으로 전문적이고 법적 구속력이 있는 ${contractTypeText}를 작성해 주세요.

**계약 당사자:**
- ${partyAInfo}
- ${partyBInfo}

**계약 내용:**
- 계약 대상: ${data.terms.subject}
- 상세 설명: ${data.terms.description}
- 계약 금액: ${data.terms.amount} ${data.terms.currency} (${data.terms.taxIncluded ? '부가세 포함' : '부가세 별도'})
- 계약 기간: ${data.terms.startDate} ~ ${data.terms.endDate}
- 지급 조건: ${paymentText}

**특수 조건:**
${specialConditions.length > 0 ? specialConditions.join(', ') : '없음'}
${data.specialConditions.customConditions ? `추가 조건: ${data.specialConditions.customConditions}` : ''}

**작성 요구사항:**
1. 한국의 법적 기준에 맞는 정식 계약서 형태로 작성
2. 제목, 전문, 각 조항을 명확히 구분
3. 법적 필수 조항들을 모두 포함 (계약의 목적, 이행 방법, 대가 지급, 계약 해지, 분쟁 해결 등)
4. 각 조항은 명확하고 구체적으로 작성
5. 양 당사자의 권리와 의무를 균형있게 기술
6. 계약서 하단에 날짜와 서명란 포함

전문적이고 완성도 높은 계약서를 작성해 주세요.`
}

// 타임아웃을 위한 Promise wrapper
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ])
}

export async function POST(request: NextRequest) {
  try {
    const contractData: ContractData = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const prompt = generateContractPrompt(contractData)

    // 계약서 유형에 맞는 전용 프롬프트 가져오기
    const customSystemPrompt = getPromptByContractType(contractData.contractCategory, contractData.contractType)
    
    // 개별 프롬프트와 공통 프롬프트를 조합
    const systemPrompt = customSystemPrompt 
      ? `${customSystemPrompt}\n\n${commonPrompt.content}`
      : `당신은 한국의 법무 전문가입니다. 정확하고 전문적인 계약서를 작성하는 것이 당신의 역할입니다. 모든 법적 요구사항을 충족하고, 양 당사자의 권익을 보호하는 균형잡힌 계약서를 작성해야 합니다.\n\n${commonPrompt.content}`

    // OpenAI API 호출에 타임아웃 적용 (60초)
    const completion = await withTimeout(
      openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2500, // 토큰 수 줄여서 응답 시간 단축
        temperature: 0.3,
        stream: false, // 스트리밍 비활성화로 안정성 향상
      }),
      60000 // 60초 타임아웃
    )

    const generatedContract = completion.choices[0]?.message?.content

    if (!generatedContract) {
      return NextResponse.json(
        { success: false, error: 'No contract generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      contract: generatedContract,
    })
  } catch (error) {
    console.error('Error generating contract:', error)
    
    // 타임아웃 에러 처리
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json(
        { success: false, error: 'Request timeout - please try again' },
        { status: 408 }
      )
    }
    
    // OpenAI API 에러 처리
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API error - please try again' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate contract - please try again' },
      { status: 500 }
    )
  }
} 