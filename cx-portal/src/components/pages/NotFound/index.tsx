import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <main>
      <h2>{t('pages.notfound')}</h2>
      <p>{t('content.notfound.message')}</p>
      <ul>
        <li>{t('content.notfound.reason.nopermission')}</li>
        <li>{t('content.notfound.reason.notexisting')}</li>
        <li>{t('content.notfound.reason.notimplemented')}</li>
      </ul>
      <p>{t('content.notfound.further')}</p>
    </main>
  )
}
