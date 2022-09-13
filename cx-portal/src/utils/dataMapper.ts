import {
  BusinessPartner,
  BusinessPartnerResponse,
  BusinessPartnerSearchResponse,
  PartnerNetworkDataGrid,
} from 'features/partnerNetwork/types'

import {
  RegistrationRequest,
  RegistrationRequestDataGrid,
} from 'features/admin/registration/types'

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse,
  membershipData: string[]
): Array<PartnerNetworkDataGrid> => {
  return bpResponse?.content?.map((bp: BusinessPartnerSearchResponse) => {
    const bpAddress = bp.businessPartner.addresses[0]
    return {
      bpn: bp.businessPartner.bpn,
      legalForm: bp.businessPartner.legalForm?.name || '',
      cxmember: membershipData.includes(bp.businessPartner.bpn),
      name: bp.businessPartner.names.filter(
        (name) =>
          name.type.technicalKey === 'INTERNATIONAL' ||
          name.type.technicalKey === 'LOCAL'
      )[0].value,
      country: bpAddress.country.name,
      street: bpAddress.thoroughfares[0].value,
      zipCode: bpAddress.postCodes[0].value,
      city: bpAddress.localities[0].value,
      identifiers: bp.businessPartner.identifiers?.filter(
        (identifier) => identifier.type.technicalKey !== 'CDQID'
      ),
    } as PartnerNetworkDataGrid
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): PartnerNetworkDataGrid => {
  const bpAddress = bp.addresses[0]
  return {
    bpn: bp.bpn,
    name: bp.names.filter(
      (name) =>
        name.type.technicalKey === 'INTERNATIONAL' ||
        name.type.technicalKey === 'LOCAL'
    )[0].value,
    legalForm: bp.legalForm?.name || '',
    country: bpAddress.country.name,
    street: bpAddress.thoroughfares[0].value,
    zipCode: bpAddress.postCodes[0].value,
    city: bpAddress.localities[0].value,
    identifiers: bp.identifiers?.filter(
      (identifier) => identifier.type.technicalKey !== 'CDQID'
    ),
  } as PartnerNetworkDataGrid
}

const mapRegistrationRequestResponseToDataGrid = (
  requestsResponse: Array<RegistrationRequest>
): Array<RegistrationRequestDataGrid> => {
  return requestsResponse?.map((request: RegistrationRequest) => {
    return {
      applicationId: request.applicationId,
      dateCreated: request.dateCreated,
      companyInfo: {
        companyName: request.companyName,
        email: request.email,
        bpn: request.bpn,
      },
      documents: request.documents,
      status: request.applicationStatus,
    } as RegistrationRequestDataGrid
  })
}

export {
  mapBusinessPartnerToDataGrid,
  mapSingleBusinessPartnerToDataGrid,
  mapRegistrationRequestResponseToDataGrid,
}
