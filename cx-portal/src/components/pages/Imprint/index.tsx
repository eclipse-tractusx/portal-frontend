import StageHeader from 'components/shared/frame/StageHeader'
import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation('footer', { keyPrefix: 'imprint' })
  return (
    <main>
      <StageHeader title={t('title')} />
      <section>
        <Typography variant="h5">{t('directors')}</Typography>
        <Typography variant="body2">Oliver Ganser ({t('ceo')})</Typography>
        <Typography variant="body2">
          Prof. Dr.-Ing. Boris Otto ({t('deputyCeo')})
        </Typography>
        <Typography variant="body2">
          Claus Cremers ({t('treasurer')})
        </Typography>
        <br />
        <Typography variant="body2">{t('address')}</Typography>
        <Typography variant="body2">
          Catena-X Automotive Network e.V.
        </Typography>
        <Typography variant="body2">c/o IFOK GmbH</Typography>
        <Typography variant="body2">Reinhardtstraße 58</Typography>
        <Typography variant="body2">10117 Berlin</Typography>
        <br />
        <Typography variant="h5">{t('contact&support')}</Typography>
        <Typography variant="body2">{t('contact&supportDesc')}</Typography>
        <br />
        <Typography variant="h5">{t('privacy')}</Typography>
        <Typography variant="body2">{t('privacyDesc')}</Typography>
        <a href=".">xxx.xxx.xxx</a>
      </section>
    </main>
  )
}
