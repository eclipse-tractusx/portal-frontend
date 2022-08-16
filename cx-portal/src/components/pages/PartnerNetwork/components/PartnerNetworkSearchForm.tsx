import React from 'react'
import { IconButton, SearchInput } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

import MicIcon from '@mui/icons-material/Mic'

type SearchFormProps = {
  onSearchTextChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  searchError: string | null
  searchText: string
}

const PartnerNetworkSearchForm = ({
  onSearchTextChange,
  searchText,
  searchError,
}: SearchFormProps) => {
  const { t } = useTranslation()

  return (
    <div className="advance-search-fields-container">
      <div className="identifier-fields-container">
        <SearchInput
          label={t('content.partnernetwork.searchbycompanyorbpnlabel')}
          variant="outlined"
          placeholder={t(
            'content.partnernetwork.searchbycompanyorbpnplaceholder'
          )}
          margin="dense"
          onChange={(e) => onSearchTextChange(e)}
          value={searchText}
          error={Boolean(searchError)}
          helperText={searchError}
          endAndorment={
            <IconButton>
              <MicIcon sx={{ color: '#939393' }} />
            </IconButton>
          }
        />
      </div>
    </div>
  )
}

export default PartnerNetworkSearchForm
