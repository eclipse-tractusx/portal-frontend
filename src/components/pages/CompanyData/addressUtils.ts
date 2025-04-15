import {
  type CompanyDataType,
  AddressType,
} from 'features/companyData/companyDataApiSlice'

export function getBpnActualBpn(row: CompanyDataType): string {
  switch (row.address?.addressType) {
    case AddressType.LegalAndSiteMainAddress:
    case AddressType.SiteMainAddress:
      return row.site?.siteBpn ?? '-'
    case AddressType.LegalAddress:
      return row.legalEntity?.legalEntityBpn ?? '-'
    case AddressType.AdditionalAddress:
      return row.address.addressBpn ?? '-'
    default:
      return '-'
  }
}
