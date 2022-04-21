import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'

export default function CookiePolicy() {
  const { t } = useTranslation('footer', { keyPrefix: 'cookies' })
  return (
    <main className="cookies-page">
      <Typography variant="h3">{t('title')}</Typography>
      <div className="cookie-description">
        <Typography variant="body2">{t('what')}</Typography>
        <br />
        <Typography variant="body2">{t('purposes.why')}</Typography>
        <ul>
          {[0, 1, 2, 3, 4].map((n) => (
            <li key={n}>{t(`purposes.reason.${n}`)}</li>
          ))}
        </ul>
        <br />
        <Typography variant="body2">{t('types.message')}</Typography>
        <ul>
          {['strict', 'function', 'target'].map((type) => (
            <li key={type}>
              {t(`types.${type}`)}
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>XXX</th>
                    <th>XXX</th>
                    <th>XXX</th>
                  </tr>
                </thead>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
