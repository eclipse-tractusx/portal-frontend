import React from 'react'
import { SearchInput } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

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
          variant="outlined"
          placeholder={t('content.partnernetwork.searchfielddefaulttext')}
          margin="dense"
          onChange={(e) => onSearchTextChange(e)}
          value={searchText}
          error={Boolean(searchError)}
          helperText={searchError}
        />
      </div>
    </div>
  )
}

export default PartnerNetworkSearchForm
