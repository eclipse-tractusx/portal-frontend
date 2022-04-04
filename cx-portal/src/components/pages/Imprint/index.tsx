import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.imprint')}</h2>
      <Typography variant="h5">{t('content.imprint.directors')}</Typography>
      <Typography variant="body2">
        Oliver Ganser ({t('content.imprint.ceo')})
      </Typography>
      <Typography variant="body2">
        Prof. Dr.-Ing. Boris Otto ({t('content.imprint.deputyCeo')})
      </Typography>
      <Typography variant="body2">
        Claus Cremers ({t('content.imprint.treasurer')})
      </Typography>
      <br />
      <Typography variant="body2">{t('content.imprint.address')}</Typography>
      <Typography variant="body2">Catena-X Automotive Network e.V.</Typography>
      <Typography variant="body2">c/o IFOK GmbH</Typography>
      <Typography variant="body2">Reinhardtstraße 58</Typography>
      <Typography variant="body2">10117 Berlin</Typography>
      <br />
      <Typography variant="h5">
        {t('content.imprint.contact&support')}
      </Typography>
      <Typography variant="body2">
        {t('content.imprint.contact&supportDesc')}
      </Typography>
      <br />
      <Typography variant="h5">{t('content.imprint.privacy')}</Typography>
      <Typography variant="body2">
        {t('content.imprint.privacyDesc')}
      </Typography>
      <a href=".">xxx.xxx.xxx</a>
    </main>
  )
}
