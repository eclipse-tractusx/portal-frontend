import React, { useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import partnerNetworkSlice, {
  partnerNetworkSelector,
} from 'state/features/partnerNetwork/slice'
import {
  fetchBusinessPartners,
  getOneBusinessPartner,
} from 'state/features/partnerNetwork/actions'
import { Table, Button } from 'cx-portal-shared-components'
import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { useTranslation } from 'react-i18next'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'
import PartnerNetworkSearchForm from './components/PartnerNetworkSearchForm'
import BusinessPartnerDetailOverlay from './BusinessPartnerDetailOverlay'
import { GridCellParams } from '@mui/x-data-grid'
import { PartnerNetworkDataGrid } from 'state/features/partnerNetwork/types'
import UserService from 'services/UserService'
import StageHeader from 'components/shared/frame/StageHeader'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const columns = PartnerNetworksTableColumns(useTranslation)
  const dispatch = useDispatch()
  const [bpnValue, setBpnValue] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize] = useState<number>(100)
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  const [selectedBPN, setSelectedBPN] = useState<PartnerNetworkDataGrid>(
    {} as PartnerNetworkDataGrid
  )

  const token = UserService.getToken()
  const { mappedPartnerList, loading, paginationData } = useSelector(
    partnerNetworkSelector
  )

  useEffect(() => {
    if (token) {
      const params = {
        ...{ size: pageSize, page: currentPage },
        ...(companyName !== '' && { name: companyName }),
      }

      dispatch(fetchBusinessPartners({ params, token }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageSize, currentPage])

  // Reset store data when page init
  useEffect(() => {
    dispatch(partnerNetworkSlice.actions.resetPartnerNetworkState())
  }, [dispatch])

  const onBpnFieldChange = (e: ChangeEvent) => {
    const inputElem = e.target as HTMLInputElement
    setBpnValue(inputElem.value)
  }

  const onCompanyNameChange = (e: ChangeEvent) => {
    const inputElem = e.target as HTMLInputElement
    setCompanyName(inputElem.value)
  }

  const onSearchClick = () => {
    // Reset previous data set before loading search results
    dispatch(partnerNetworkSlice.actions.resetPartnerNetworkState())

    // There is two different endpoint for BPN search and for the field search
    // Detect which api call to make a request
    if (bpnValue !== '')
      dispatch(getOneBusinessPartner({ bpn: bpnValue, token }))
    // Reset current page to default everytime user search some term
    else {
      const params = {
        ...{ size: pageSize, page: currentPage },
        ...(companyName !== '' && { name: companyName }),
      }
      dispatch(
        fetchBusinessPartners({
          params,
          token,
        })
      )
    }
  }

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      setSelectedBPN(params.row as PartnerNetworkDataGrid)
      setOverlayOpen(true)
    }
  }

  return (
    <main className="partner-network-page-container">
      <BusinessPartnerDetailOverlay
        {...{
          selectedRowBPN: selectedBPN,
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
      <StageHeader title={t('content.partnernetwork.headertitle')} />
      <PartnerNetworkSearchForm
        {...{
          onBpnFieldChange,
          onCompanyNameChange,
          onSearchClick,
          bpnValue,
          companyName,
        }}
      />
      <div className="partner-network-table-container">
        <Table
          {...{
            rows: mappedPartnerList,
            rowsCount: paginationData.totalElements,
            columns: columns,
            title: t('content.partnernetwork.tabletitle'),
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            onCellClick: (params: GridCellParams) => onTableCellClick(params),
            toolbar: {
              onFilter: () => {},
              filter: [
                {
                  name: 'country',
                  values: [
                    {
                      value: 'DE',
                      label: t('content.partnernetwork.filters.germany'),
                    },
                    {
                      value: 'Others',
                      label: t('content.partnernetwork.filters.others'),
                    },
                  ],
                },
              ],
            },
            loading,
          }}
          getRowId={(row) => row.bpn}
        />
      </div>
      <div className="load-more-button-container">
        {paginationData.totalElements > pageSize * currentPage &&
          paginationData.totalElements! > pageSize && (
            <Button
              size="medium"
              onClick={() => setCurrentPage((prevState) => prevState + 1)}
            >
              {t('content.partnernetwork.loadmore')}
            </Button>
          )}
      </div>
    </main>
  )
}

export default PartnerNetwork
