import {
  mapBusinessPartnerToDataGrid,
  mapSingleBusinessPartnerToDataGrid,
} from 'utils/dataMapper'
import TestAPIData from '../../public/testdata/partnerNetwork/businessPartnersAPIResult.json'
import TestSingleData from '../../public/testdata/partnerNetwork/businessPartnersSingleResult.json'
import TestDataGridData from '../../public/testdata/partnerNetwork/businessPartnersDataGrid.json'
import TestSingleDataGridData from '../../public/testdata/partnerNetwork/businessPartnersSingleDataGrid.json'
import {
  BusinessPartner,
  BusinessPartnerResponse,
} from 'types/partnerNetwork/PartnerNetworkTypes'

describe('DataMapperTest', () => {
  it('mapBusinessPartnerToDataGrid maps correctly', () => {
    const mockListToDataGridFunc = jest.fn(mapBusinessPartnerToDataGrid)
    const mapDataGridResult = mockListToDataGridFunc(
      TestAPIData as unknown as BusinessPartnerResponse
    )

    // Make sure function called one time
    expect(mockListToDataGridFunc).toHaveBeenCalledTimes(1)

    // Make sure return result deeply equal to example data
    expect(mapDataGridResult).toStrictEqual(TestDataGridData)

    // Pick random entry and compare with result
    const randomEntry = Math.floor(Math.random() * mapDataGridResult.length)
    expect(mapDataGridResult[randomEntry]).toStrictEqual(
      TestDataGridData[randomEntry]
    )
  })

  it('mapSingleBusinessPartnerToDataGrid maps correctly', () => {
    const mockEntryToDataGridFunc = jest.fn(mapSingleBusinessPartnerToDataGrid)
    const mapDataGridResult = mockEntryToDataGridFunc(
      TestSingleData as unknown as BusinessPartner
    )

    // Make sure function called one time
    expect(mockEntryToDataGridFunc).toHaveBeenCalledTimes(1)

    // Make sure return result deeply equal to example data
    expect(mapDataGridResult).toStrictEqual(TestSingleDataGridData)
  })
})
