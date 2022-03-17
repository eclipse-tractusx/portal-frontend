import {
  BusinessPartner,
  BusinessPartnerResponse,
  PartnerNetworkDataGrid,
} from 'types/partnerNetwork/PartnerNetworkTypes'

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse
): Array<PartnerNetworkDataGrid> => {
  return bpResponse?.content?.map((bp: BusinessPartner) => {
    const bpAddress = bp.addresses[0]
    const taxObject = bp.identifiers.filter(
      (identifier) => identifier.type.technicalKey === 'EU_VAT_ID_DE'
    )
    return {
      id: bp.bpn,
      name: bp.names.filter(
        (name) =>
          name.type.technicalKey === 'INTERNATIONAL' ||
          name.type.technicalKey === 'LOCAL'
      )[0].value,
      country: bpAddress.country.name,
      street: bpAddress.thoroughfares[0].value,
      zipCode: bpAddress.postCodes[0].value,
      city: bpAddress.localities[0].value,
      taxId: taxObject.length > 0 ? taxObject[0].value : '',
    } as PartnerNetworkDataGrid
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): PartnerNetworkDataGrid => {
  const bpAddress = bp.addresses[0]
  const taxObject = bp.identifiers.filter(
    (identifier) => identifier.type.technicalKey === 'EU_VAT_ID_DE'
  )
  return {
    id: bp.bpn,
    name: bp.names.filter(
      (name) =>
        name.type.technicalKey === 'INTERNATIONAL' ||
        name.type.technicalKey === 'LOCAL'
    )[0].value,
    country: bpAddress.country.name,
    street: bpAddress.thoroughfares[0].value,
    zipCode: bpAddress.postCodes[0].value,
    city: bpAddress.localities[0].value,
    taxId: taxObject.length > 0 ? taxObject[0].value : '',
  } as PartnerNetworkDataGrid
}

export { mapBusinessPartnerToDataGrid, mapSingleBusinessPartnerToDataGrid }
