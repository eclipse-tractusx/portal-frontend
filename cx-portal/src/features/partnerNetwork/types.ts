import { GeographicCoordinate } from 'types/MainTypes'

//region Common Key Value pairs type
export interface BpdmTypeNameObject {
  name: string
  url?: string
}

export interface BpdmTypeCommonKeyValuePair extends BpdmTypeNameObject {
  technicalKey: string
}

export interface BpdmTypeUUIDKeyPair {
  uuid: string
  value: string
  type: BpdmTypeCommonKeyValuePair
  issuingBody?: BpdmTypeCommonKeyValuePair
  status?: BpdmTypeCommonKeyValuePair
}

export interface BpdmTypeLanguagePair extends BpdmTypeUUIDKeyPair {
  language: BpdmTypeCommonKeyValuePair
}

//endregion

//region Bpdm Address Types
export interface BpdmAddressVersion {
  characterSet: BpdmTypeCommonKeyValuePair
  language: BpdmTypeCommonKeyValuePair
}

export interface BpdmTypeWithShortName extends BpdmTypeLanguagePair {
  shortName: string
  fipsCode?: string
}

export interface BpdmTypeThoroughfare extends BpdmTypeWithShortName {
  name?: string
  number?: string // Consider as street number and can be string
  direction?: string
}

export interface BpdmAddresses {
  uuid: string
  version: BpdmAddressVersion
  careOf: string
  contexts: Array<string>
  country: BpdmTypeCommonKeyValuePair
  administrativeAreas: Array<BpdmTypeWithShortName>
  postCodes: Array<BpdmTypeUUIDKeyPair>
  localities: Array<BpdmTypeWithShortName>
  thoroughfares: Array<BpdmTypeThoroughfare>
  premises: Array<BpdmTypeThoroughfare>
  postalDeliveryPoints: Array<BpdmTypeThoroughfare>
  geographicCoordinates: GeographicCoordinate
  types: Array<BpdmTypeCommonKeyValuePair>
}
//endregion

//region Bpdm Bank Account Type
export interface BpdmTypeBankAccount {
  uuid: string
  trustScores: Array<number>
  currency: BpdmTypeCommonKeyValuePair
  internationalBankAccountIdentifier: string
  internationalBankIdentifier: string
  nationalBankAccountIdentifier: string
  nationalBankIdentifier: string
}
//endregion

//region Other Bpdm Types
export interface BpdmTypeRelation {
  uuid: string
  relationClass: BpdmTypeCommonKeyValuePair
  type: BpdmTypeCommonKeyValuePair
  startNode: string
  endNode: string
  startedAt?: Date
  endedAt?: Date
}

export interface BpdmProfileClassification extends BpdmTypeUUIDKeyPair {
  code?: string
}

export interface BpdmLegalFormObject extends BpdmTypeCommonKeyValuePair {
  mainAbbreviation: string
  language: BpdmTypeCommonKeyValuePair
  categories: Array<BpdmTypeNameObject>
}

export interface BpdmBusinessStatus {
  uuid: string
  officialDenotation: string
  validFrom: Date
  validUntil: Date
  type: BpdmTypeCommonKeyValuePair
}
//endregion

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
}

export interface BusinessPartnerSearchResponse {
  score: number
  businessPartner: BusinessPartner
}

export interface BusinessPartnerResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: Array<BusinessPartnerSearchResponse>
}

export interface PaginationData {
  totalElements: number
  page: number
}

export interface PartnerNetworkInitialState {
  paginationData: PaginationData
  mappedPartnerList: Array<PartnerNetworkDataGrid>
  membershipData: string[]
  membershipError: string
  loading: boolean
  error: string
}

export interface PartnerNetworkDataGrid {
  bpn: string
  name: string
  legalForm: string
  country: string
  street: string
  zipCode: string
  city: string
  identifiers: Array<BpdmTypeUUIDKeyPair>
}
