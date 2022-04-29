import React from 'react'
import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

const PartnerNetworkHeader = () => {
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}

export default PartnerNetworkHeader
