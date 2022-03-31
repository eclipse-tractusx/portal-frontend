import { useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectorPartnerNetwork } from 'state/features/partnerNetwork/partnerNetworkSlice'
import {
  fetchBusinessPartners,
  getOneBusinessPartner,
} from 'state/features/partnerNetwork/partnerNetworkActions'
import {
  Table,
  SharedThemeProvider,
  Input,
  Button,
} from 'cx-portal-shared-components'
import 'components/pages/PartnerNetwork/PartnerNetwork.css'
import { RootState } from 'state/store'
import { useTranslation } from 'react-i18next'

const PartnerNetwork = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [bpnValue, setBpnValue] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const token = useSelector((state: RootState) => state.user.token)
  const { mappedPartnerList, loading, columns } = useSelector(
    selectorPartnerNetwork
  )

  useEffect(() => {
    if (token) {
      dispatch(fetchBusinessPartners({ size: 100 }))
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
    if (bpnValue !== '') dispatch(getOneBusinessPartner(bpnValue))
    else dispatch(fetchBusinessPartners({ size: 100, name: companyName }))

    // Reset state for next search
    setBpnValue('')
    setCompanyName('')
  }

  return (
    <main className="Appstore">
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
      <SharedThemeProvider>
        <Table
          title={t('content.partnernetwork.message')}
          rows={mappedPartnerList}
          columns={columns}
          {...{
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            loading,
          }}
        />
      </SharedThemeProvider>
    </main>
  )
}

export default PartnerNetwork
