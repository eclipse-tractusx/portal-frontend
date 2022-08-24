import StageHeader from 'components/shared/frame/StageHeader'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <main>
      <StageHeader title={t('pages.notfound')} />
      <section>
        <p>{t('content.notfound.message')}</p>
        <ul>
          <li>{t('content.notfound.reason.nopermission')}</li>
          <li>{t('content.notfound.reason.notexisting')}</li>
          <li>{t('content.notfound.reason.notimplemented')}</li>
        </ul>
        <p>{t('content.notfound.further')}</p>
      </section>
    </main>
  )
}
