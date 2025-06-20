export interface PartyInfo {
  companyName: string
  representative: string
  businessNumber: string
  address: string
  fillLater?: boolean
}

export interface ContractTerms {
  subject: string
  description: string
  amount: string
  currency: 'KRW' | 'USD' | 'EUR'
  taxIncluded: boolean
  startDate: string
  endDate: string
  paymentTerms: string
}

export interface SpecialConditions {
  qualityAssurance: boolean
  confidentiality: boolean
  exclusivity: boolean
  customConditions: string
}

export interface ContractData {
  contractCategory: string
  contractType: string
  partyA: PartyInfo
  partyB: PartyInfo
  terms: ContractTerms
  specialConditions: SpecialConditions
  generatedContract: string
}

export interface ContractCategory {
  id: string
  name: string
  description: string
  icon: string
  contracts: ContractType[]
}

export interface ContractType {
  id: string
  name: string
  description: string
}

export interface SystemPrompt {
  id: string
  category: string
  contractType: string
  title: string
  prompt: string
  lastModified: Date
  isActive: boolean
}

export interface PromptCategory {
  id: string
  name: string
  icon: string
  contracts: {
    id: string
    name: string
    prompt: string
  }[]
} 