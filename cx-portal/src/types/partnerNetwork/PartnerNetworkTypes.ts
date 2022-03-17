import { GeographicCoordinate } from 'types/MainTypes'
import { GridColDef } from '@mui/x-data-grid'

//region Common Key Value pairs type
interface BpdmTypeNameObject {
  name: string
  url?: string
}

interface BpdmTypeCommonKeyValuePair extends BpdmTypeNameObject {
  technicalKey: string
}

interface BpdmTypeUUIDKeyPair {
  uuid: string
  value: string
  type: BpdmTypeCommonKeyValuePair
  issuingBody?: BpdmTypeCommonKeyValuePair
  status?: BpdmTypeCommonKeyValuePair
}

interface BpdmTypeLanguagePair extends BpdmTypeUUIDKeyPair {
  language: BpdmTypeCommonKeyValuePair
}

//endregion

//region Bpdm Address Types
interface BpdmAddressVersion {
  characterSet: BpdmTypeCommonKeyValuePair
  language: BpdmTypeCommonKeyValuePair
}

interface BpdmTypeWithShortName extends BpdmTypeLanguagePair {
  shortName: string
  fipsCode?: string
}

interface BpdmTypeThoroughfare extends BpdmTypeWithShortName {
  name?: string
  number?: string // Consider as street number and can be string
  direction?: string
}

interface BpdmAddresses {
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
interface BpdmTypeBankAccount {
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
interface BpdmTypeRelation {
  uuid: string
  relationClass: BpdmTypeCommonKeyValuePair
  type: BpdmTypeCommonKeyValuePair
  startNode: string
  endNode: string
  startedAt?: Date
  endedAt?: Date
}

interface BpdmProfileClassification extends BpdmTypeUUIDKeyPair {
  code?: string
}

interface BpdmLegalFormObject extends BpdmTypeCommonKeyValuePair {
  mainAbbreviation: string
  language: BpdmTypeCommonKeyValuePair
  categories: Array<BpdmTypeNameObject>
}

interface BpdmBusinessStatus {
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

export interface BusinessPartnerResponse {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
  content: Array<BusinessPartner>
}

export interface PartnerNetworkInitialState {
  businessPartners: BusinessPartnerResponse
  mappedPartnerList: Array<PartnerNetworkDataGrid>
  loading: boolean
  columns: GridColDef[]
  error: string
}

export interface PartnerNetworkDataGrid {
  id: string
  name: string
  country: string
  street: string
  zipCode: string
  city: string
  taxId: string
}

export type SearchParams = {
  readonly name?: string
  readonly size: number
}
