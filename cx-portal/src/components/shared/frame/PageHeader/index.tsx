import React from 'react'
import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './PageHeader.scss'

export type PageHeaderProps = {
  translationKey: string
  backgroundImage?: string
}

const PageHeader = ({
  translationKey,
  backgroundImage = './stage-header-background.png',
}: PageHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="header-section">
      <div className="header-content">
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h4">
          {t(translationKey)}
        </Typography>
      </div>
      <img src={backgroundImage} alt={`${t(translationKey)} Background`} />
    </div>
  )
}

export default PageHeader
