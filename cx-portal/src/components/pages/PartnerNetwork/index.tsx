import React, { useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectorPartnerNetwork } from 'state/features/partnerNetwork/partnerNetworkSlice'
import {
  fetchBusinessPartners,
  getOneBusinessPartner,
} from 'state/features/partnerNetwork/partnerNetworkActions'
import { Table, Input, Button, Typography } from 'cx-portal-shared-components'
import 'components/pages/PartnerNetwork/PartnerNetwork.scss'
import { RootState } from 'state/store'
import { useTranslation } from 'react-i18next'
import RegistrationRequestHeaderBgImage from 'assets/images/registration-requests-header-background.png'
import { PartnerNetworksTableColumns } from 'components/pages/PartnerNetwork/partnerNetworkTableColumns'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const columns = PartnerNetworksTableColumns(useTranslation)
  const dispatch = useDispatch()
  const [bpnValue, setBpnValue] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const token = useSelector((state: RootState) => state.user.token)
  const { mappedPartnerList, loading } = useSelector(selectorPartnerNetwork)

  useEffect(() => {
    if (token) {
      dispatch(fetchBusinessPartners({ params: { size: 100 }, token }))
    }
  }, [token, dispatch])

  const onBpnFieldChange = (e: ChangeEvent) => {
    const inputElem = e.target as HTMLInputElement
    setBpnValue(inputElem.value)
  }

  const onCompanyNameChange = (e: ChangeEvent) => {
    const inputElem = e.target as HTMLInputElement
    setCompanyName(inputElem.value)
  }

  const onSearchClick = () => {
    // There is two different endpoint for BPN search and for the field search
    // Detect which api call to make a request
    if (bpnValue !== '')
      dispatch(getOneBusinessPartner({ bpn: bpnValue, token }))
    else
      dispatch(
        fetchBusinessPartners({
          params: { size: 100, name: companyName },
          token,
        })
      )

    // Reset state for next search
    setBpnValue('')
    setCompanyName('')
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
          src={RegistrationRequestHeaderBgImage}
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
    </main>
  )
}

export default PartnerNetwork
