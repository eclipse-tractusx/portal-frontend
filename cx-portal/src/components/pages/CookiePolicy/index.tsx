import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'

export default function CookiePolicy() {
  const { t } = useTranslation()
  return (
    <main className="cookies-page">
      <Typography variant="h3">{t('pages.cookiepolicy')}</Typography>
      <div className="cookie-description">
        <Typography variant="body2">
          {t('content.cookiepolicy.description1')}
        </Typography>
        <br />
        <Typography variant="body2">
          {t('content.cookiepolicy.description2')}
        </Typography>
        <ul>
          <li>{t('content.cookiepolicy.description2_first')}</li>
          <li>{t('content.cookiepolicy.description2_second')}</li>
          <li>{t('content.cookiepolicy.description2_third')}</li>
          <li>{t('content.cookiepolicy.description2_fourth')}</li>
          <li>{t('content.cookiepolicy.description2_fifth')}</li>
        </ul>
        <br />
        <Typography variant="body2">
          {t('content.cookiepolicy.description3')}
        </Typography>
        <ul>
          <li>{t('content.cookiepolicy.description3_first')}</li>
        </ul>
        <table className="cookie-table">
          <thead>
            <tr>
              <th>XXX</th>
              <th>XXX</th>
              <th>XXX</th>
            </tr>
          </thead>
        </table>
        <ul>
          <li>{t('content.cookiepolicy.description3_second')}</li>
        </ul>
        <table className="cookie-table">
          <thead>
            <tr>
              <th>XXX</th>
              <th>XXX</th>
              <th>XXX</th>
            </tr>
          </thead>
        </table>
        <ul>
          <li>{t('content.cookiepolicy.description3_third')}</li>
        </ul>
        <table className="cookie-table">
          <thead>
            <tr>
              <th>XXX</th>
              <th>XXX</th>
              <th>XXX</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  )
}
