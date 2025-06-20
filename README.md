# SmartContract Generator

AI 기반 계약서 자동생성 웹서비스

## 🎯 개요

SmartContract Generator는 OpenAI API를 활용하여 전문적인 계약서를 자동으로 생성하는 웹 애플리케이션입니다. 
복잡한 계약서 작성 시간을 2-3시간에서 5분으로 단축시켜 비즈니스 효율성을 크게 향상시킵니다.

## ✨ 주요 기능

### 📋 5단계 계약서 생성 워크플로우
1. **계약 유형 선택**: 10개 주요 계약서 유형 (납품, 용역, 임대차 등)
2. **당사자 정보 입력**: 갑/을 당사자의 기본 정보
3. **핵심 거래 조건**: 계약 대상, 금액, 기간, 지급 조건
4. **특수 조건**: 품질보증, 비밀유지, 독점계약 등 선택 조건
5. **최종 확인**: 입력 정보 검토 및 AI 계약서 생성

### 🤖 AI 기반 계약서 생성
- ChatGPT API 연동으로 전문적인 계약서 생성
- 계약서 유형별 맞춤 프롬프트 템플릿
- 법적 필수 조항 자동 삽입
- 한국 법률 기준에 맞는 계약서 형식

### 📄 실시간 미리보기 및 편집
- 좌측 입력 폼, 우측 실시간 미리보기
- 생성된 계약서 직접 편집 기능
- 확대/축소 기능
- PDF/Word 다운로드 (예정)

## 🛠 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI API**: OpenAI GPT-4
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📦 배포

### Vercel 배포

1. Vercel 계정에 로그인
2. GitHub 리포지토리 연결
3. 환경 변수 설정 (OPENAI_API_KEY 등)
4. 배포 실행

```bash
npm run build
```

## 🔑 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `OPENAI_API_KEY` | OpenAI API 키 | 필수 |
| `NEXTAUTH_URL` | Next.js 앱 URL | 선택 |
| `NEXTAUTH_SECRET` | NextAuth 비밀키 | 선택 |

## 📝 지원 계약서 유형

1. **납품계약서** - 제품 납품에 관한 계약
2. **용역계약서** - 서비스 제공에 관한 계약
3. **임대차계약서** - 부동산 임대차에 관한 계약
4. **고용계약서** - 근로자 고용에 관한 계약
5. **업무협약서** - 업무 협력에 관한 협약
6. **컨설팅계약서** - 전문 컨설팅 서비스 계약
7. **라이센스계약서** - 지적재산권 라이센스 계약
8. **유통계약서** - 제품 유통에 관한 계약
9. **유지보수계약서** - 시설/장비 유지보수 계약
10. **비밀유지계약서** - 기밀정보 보호에 관한 계약

## 🔧 개발 스크립트

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 린터 실행
npm run lint
```

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 기능 요청이 있으시면 Issue를 생성해 주세요.

---

**SmartContract Generator** - AI가 만드는 전문 계약서 🚀 