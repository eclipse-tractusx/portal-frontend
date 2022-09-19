import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { useTranslation } from 'react-i18next'
import { useFetchBusinessPartnersQuery } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { PageHeader, PageLoadingTable } from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updatePartnerSelector } from 'features/control/updatesSlice'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import {
  BusinessPartner,
  BusinessPartnerSearchResponse,
} from 'features/newPartnerNetwork/types'
import { GridCellParams } from '@mui/x-data-grid'
import Patterns from 'types/Patterns'
import { PartnerNetworksBPNTableColumns } from './PartnerList/PartnerNetworksBPNTableColumns'
import { useFetchBusinessPartnerAddressMutation } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import { useFetchMemberCompaniesQuery } from 'features/newPartnerNetwork/partnerNetworkPortalApiSlice'
import {
  isContentPresent,
  isQueryDataPresent,
  addCountryAttribute,
  addMemberAttribute,
} from './PartnerList/helper'
import BusinessPartnerDetailOverlay from './BusinessPartnerDetailOverlay'
import BusinessPartnerDetailBpnOverlay from './BusinessPartnerDetailOverlay/BusinessPartnerDetailBpnOverlay'

const PartnerNetwork = () => {
  const { t } = useTranslation()

  const [expr, setExpr] = useState<string>('')

  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updatePartnerSelector)
  const columns = PartnerNetworksTableColumns(useTranslation)
  const bpnColumns = PartnerNetworksBPNTableColumns(useTranslation)
  const [showBPNColumn, setShowBPNColumn] = useState<boolean>(false)

  const [mutationRequest] = useFetchBusinessPartnerAddressMutation()

  const { data } = useFetchMemberCompaniesQuery()

  const [overlayLegalEntityOpen, setLegalEntityOverlayOpen] =
    useState<boolean>(false)
  const [selectedLegalEntity, setSelectedLegalEntity] = useState<any>({})
  const [bpnOverlayOpen, setBPNOverlayOpen] = useState<boolean>(false)
  const [selectedBPN, setSelectedBPN] = useState<any>({})

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      if (params.row && params.row.legalEntity) {
        setSelectedLegalEntity(params.row as BusinessPartnerSearchResponse)
        setLegalEntityOverlayOpen(true)
      } else {
        setSelectedBPN(params.row as BusinessPartner)
        setBPNOverlayOpen(true)
      }
    }
  }

  const validateSearchText = (text: string): boolean =>
    Patterns.SEARCH.test(text.trim())

  const checkIfBPNLNumber = (text: string): boolean =>
    Patterns.BPN.test(text.trim())

  const [allItems, setAllItems] = useState<any>({})

  const fetchAndApply = async (cData: any) => {
    //BPDM response does not has content attribute. Check for it and proceed
    if (isContentPresent(cData)) {
      const result = cData.content.map((x: any) => x.legalEntity.bpn)
      await mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //new country attribute && member attributes based on the response
          let finalObj = JSON.parse(JSON.stringify(cData?.content))
          finalObj = addCountryAttribute(finalObj, payload)
          finalObj = addMemberAttribute(finalObj, data)
          setAllItems(finalObj)
        })
        .catch(() => {})
    } else {
      const result = [cData.bpn]
      await mutationRequest(result)
        .unwrap()
        .then((payload: any) => {
          //update for country attribute && update member info
          let finalObj = JSON.parse(JSON.stringify(cData))
          finalObj.legalAddress = payload[0].legalAddress
          if (isQueryDataPresent(data)) {
            finalObj.member = data && data.includes(finalObj.bpn)
          }
          setAllItems([finalObj])
        })
        .catch(() => {})
    }
  }

  useEffect(() => {
    if (allItems?.length) setShowBPNColumn(checkIfBPNLNumber(expr))
  }, [allItems, expr])

  return (
    <main className="partner-network-page-container">
      <PageHeader
        title={t('content.partnernetwork.headertitle')}
        topPage={false}
        headerHeight={200}
      ></PageHeader>

      <section>
        <section id="identity-management-id">
          <BusinessPartnerDetailOverlay
            {...{
              selectedRowBPN: selectedLegalEntity,
              openDialog: overlayLegalEntityOpen,
              handleOverlayClose: () => setLegalEntityOverlayOpen(false),
            }}
          />
          <BusinessPartnerDetailBpnOverlay
            {...{
              selectedRowBPN: selectedBPN,
              openDialog: bpnOverlayOpen,
              handleOverlayClose: () => setBPNOverlayOpen(false),
            }}
          />
          <PageLoadingTable<BusinessPartner>
            onCellClick={onTableCellClick}
            toolbarVariant={'ultimate'}
            hasBorder={false}
            columnHeadersBackgroundColor={'transparent'}
            searchPlaceholder={t(
              'content.partnernetwork.searchfielddefaulttext'
            )}
            searchInputData={searchInputData}
            onSearch={(expr: string) => {
              if (!validateSearchText(expr)) return
              setRefresh(Date.now())
              setExpr(expr)
            }}
            searchDebounce={1000}
            title={t('content.partnernetwork.tabletitle')}
            loadLabel={t('global.actions.more')}
            fetchHook={useFetchBusinessPartnersQuery}
            fetchHookArgs={{ expr }}
            fetchHookRefresh={refresh}
            getRowId={(row: { legalEntity: any }) =>
              row && row.legalEntity ? row.legalEntity.bpn : ''
            }
            columns={!showBPNColumn ? columns : bpnColumns}
            callbackToPage={fetchAndApply}
            allItems={allItems}
          />
        </section>
      </section>
    </main>
  )
}

export default PartnerNetwork
