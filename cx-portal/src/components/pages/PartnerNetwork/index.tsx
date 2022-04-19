import React, { useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import partnerNetworkSlice, {
  selectorPartnerNetwork,
} from 'state/features/partnerNetwork/partnerNetworkSlice'
import {
  fetchBusinessPartners,
  getOneBusinessPartner,
} from 'state/features/partnerNetwork/partnerNetworkActions'
import { Table, Input, Button, Typography } from 'cx-portal-shared-components'
import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { RootState } from 'state/store'
import { useTranslation } from 'react-i18next'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const columns = PartnerNetworksTableColumns(useTranslation)
  const dispatch = useDispatch()
  const [bpnValue, setBpnValue] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize] = useState<number>(20)

  const token = useSelector((state: RootState) => state.user.token)
  const { mappedPartnerList, loading, businessPartners } = useSelector(
    selectorPartnerNetwork
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
  }, [token, dispatch, pageSize, currentPage])

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
    else
      dispatch(
        fetchBusinessPartners({
          params: { size: pageSize, page: 0, name: companyName },
          token,
        })
      )
  }

  return (
    <main className="partner-network-page-container">
      <div className="header-section">
        <div className="header-content">
          <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h4">
            {t('content.partnernetwork.headertitle')}
          </Typography>
        </div>
        <img
          src="./stage-header-background.png"
          alt="Partner Network Background"
        />
      </div>

      <div className="page-title-container">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="page-title"
        >
          Business Partner
        </Typography>
      </div>
      <div className="advance-search-fields-container">
        <div className="identifier-fields-container">
          <Input
            label="BPN Number"
            variant="filled"
            placeholder="Please type BPN number of company"
            margin="dense"
            onChange={(e) => onBpnFieldChange(e)}
            value={bpnValue}
          />
          <span className="or-span">OR</span>
          <Input
            label="Company Name"
            variant="filled"
            placeholder="Please type company name"
            margin="dense"
            onChange={(e) => onCompanyNameChange(e)}
            value={companyName}
          />
        </div>
        <div className="search-button">
          <Button size="medium" onClick={() => onSearchClick()}>
            Search
          </Button>
        </div>
      </div>
      <div className="partner-network-table-container">
        <Table
          {...{
            rows: mappedPartnerList,
            columns: columns,
            title: t('content.partnernetwork.tabletitle'),
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
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
        {businessPartners.totalElements > pageSize * currentPage && (
          <Button
            size="medium"
            onClick={() =>
              setCurrentPage((prevState) => {
                return prevState + 1
              })
            }
          >
            {t('content.partnernetwork.loadmore')}
          </Button>
        )}
      </div>
    </main>
  )
}

export default PartnerNetwork
