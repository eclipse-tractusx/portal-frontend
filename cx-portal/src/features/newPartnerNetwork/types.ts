import {
  BpdmBusinessStatus,
  BpdmLegalFormObject,
  BpdmProfileClassification,
  BpdmTypeRelation,
  BpdmTypeBankAccount,
  BpdmTypeCommonKeyValuePair,
  BpdmTypeUUIDKeyPair,
  BpdmTypeLanguagePair,
  BpdmAddresses,
} from '../partnerNetwork/types'

export interface BusinessPartner {
  bpn: string // Unique identifier
  identifiers: Array<BpdmTypeUUIDKeyPair>
  names: Array<BpdmTypeLanguagePair>
  legalForm: BpdmLegalFormObject
  status: BpdmBusinessStatus
  addresses: Array<BpdmAddresses>
  profileClassifications: Array<BpdmProfileClassification>
  types: Array<BpdmTypeCommonKeyValuePair>
  bankAccounts: Array<BpdmTypeBankAccount>
  roles: Array<BpdmTypeCommonKeyValuePair>
  relations: Array<BpdmTypeRelation>
  country?: any
  member?: boolean
}

export interface BusinessPartnerSearchResponse {
  score: number
  legalEntity: BusinessPartner
}
