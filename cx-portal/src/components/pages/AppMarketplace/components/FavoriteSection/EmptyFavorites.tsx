import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function EmptyFavorites() {
  const { t } = useTranslation()

  return (
    <div
      style={{
        width: '712px',
        height: '382px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <div style={{ width: 'fit-content', margin: 'auto' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.5',
            margin: 'auto',
            width: 'fit-content',
          }}
        >
          {t('content.appstore.favoriteSection.myFavorite')}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: '400',
            fontSize: '24px',
            lineHeight: '1.5',
            margin: '30px auto',
            width: '580px',
          }}
        >
          {t('content.appstore.favoriteSection.noFavoriteDescription')}
        </Typography>
      </div>
    </div>
  )
}
