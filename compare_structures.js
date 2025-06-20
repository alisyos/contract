// 사용자 페이지 구조 (ContractTypeSelector.tsx)
const userPageStructure = [
  {
    id: 'manufacturing',
    name: '제조업',
    contracts: [
      { id: 'supply', name: '납품계약서' },
      { id: 'oem', name: '생산위탁계약서' },
      { id: 'quality', name: '품질보증계약서' },
    ]
  },
  {
    id: 'it',
    name: 'IT/소프트웨어',
    contracts: [
      { id: 'software_dev', name: '소프트웨어 개발/유지보수 계약서' },
      { id: 'license', name: '라이선스 계약서' },
      { id: 'cloud', name: '클라우드 서비스 이용 계약서' },
    ]
  },
  {
    id: 'distribution',
    name: '유통/물류',
    contracts: [
      { id: 'supply_chain', name: '공급계약서' },
      { id: 'agency', name: '유통대리점 계약서' },
      { id: 'logistics', name: '물류대행계약서' },
    ]
  },
  {
    id: 'construction',
    name: '건설/부동산',
    contracts: [
      { id: 'construction', name: '공사도급계약서' },
      { id: 'lease', name: '임대차계약서' },
      { id: 'supervision', name: '감리계약서' },
    ]
  },
  {
    id: 'finance',
    name: '금융/보험',
    contracts: [
      { id: 'loan', name: '대출계약서' },
      { id: 'insurance', name: '보험계약서' },
      { id: 'investment', name: '투자계약서' },
    ]
  },
  {
    id: 'medical',
    name: '의료/제약',
    contracts: [
      { id: 'clinical', name: '임상시험계약서' },
      { id: 'medical_consign', name: '위수탁(의료/실험) 계약서' },
      { id: 'research', name: '연구용역계약서' },
    ]
  },
  {
    id: 'service',
    name: '서비스업',
    contracts: [
      { id: 'service', name: '용역(파견/도급)계약서' },
      { id: 'consulting', name: '컨설팅계약서' },
      { id: 'marketing', name: '마케팅/광고대행계약서' },
    ]
  },
  {
    id: 'education',
    name: '교육',
    contracts: [
      { id: 'education_consign', name: '위탁교육 계약서' },
      { id: 'education_service', name: '교육용역계약서' },
      { id: 'instructor', name: '강사 계약서' },
    ]
  },
  {
    id: 'entertainment',
    name: '엔터테인먼트/미디어',
    contracts: [
      { id: 'copyright', name: '저작권/초상권 계약서' },
      { id: 'talent', name: '출연(연예인, 방송인) 계약서' },
      { id: 'model', name: '광고모델 계약서' },
    ]
  },
  {
    id: 'public',
    name: '공공/정부',
    contracts: [
      { id: 'public_consign', name: '위수탁 계약서' },
      { id: 'policy', name: '정책과제 수행 계약서' },
      { id: 'public_research', name: '연구용역 계약서' },
    ]
  },
];

console.log('사용자 페이지 구조:');
userPageStructure.forEach(category => {
  console.log(`\n${category.name} (${category.id}):`);
  category.contracts.forEach(contract => {
    console.log(`  - ${contract.name} (${contract.id})`);
  });
});

console.log('\n\n관리자 페이지에서 수정이 필요한 부분들을 확인하세요.'); 