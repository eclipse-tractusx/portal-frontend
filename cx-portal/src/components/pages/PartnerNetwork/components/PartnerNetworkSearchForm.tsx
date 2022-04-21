import React from 'react'
import { Button, Input } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

type SearchFormProps = {
  onBpnFieldChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onCompanyNameChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onSearchClick: () => void
  bpnValue: string
  companyName: string
}

const PartnerNetworkSearchForm = ({
  onBpnFieldChange,
  onCompanyNameChange,
  onSearchClick,
  bpnValue,
  companyName,
}: SearchFormProps) => {
  const { t } = useTranslation()

  return (
    <div className="advance-search-fields-container">
      <div className="identifier-fields-container">
        <Input
          label={t('content.partnernetwork.bpnsearchlabel')}
          variant="filled"
          placeholder={t('content.partnernetwork.bpnsearchplaceholder')}
          margin="dense"
          onChange={(e) => onBpnFieldChange(e)}
          value={bpnValue}
        />
        <span className="or-span">OR</span>
        <Input
          label={t('content.partnernetwork.companynamesearchlabel')}
          variant="filled"
          placeholder={t('content.partnernetwork.companynamesearchplaceholder')}
          margin="dense"
          onChange={(e) => onCompanyNameChange(e)}
          value={companyName}
        />
      </div>
      <div className="search-button">
        <Button size="medium" onClick={() => onSearchClick()}>
          {t('content.partnernetwork.searchbuttonlabel')}
        </Button>
      </div>
    </div>
  )
}

export default PartnerNetworkSearchForm
