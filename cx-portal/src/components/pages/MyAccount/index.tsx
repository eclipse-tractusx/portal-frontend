import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'state/store'

export default function MyAccount() {
  const { t } = useTranslation()
  const parsedToken = useSelector((state: RootState) => state.user.parsedToken)
  const token = useSelector((state: RootState) => state.user.token)
  return (
    <main>
      <h2>{t('pages.account')}</h2>
      <p>{t('content.account.token')}</p>
      <Button
        color="secondary"
        onClick={() => {
          navigator.clipboard.writeText(token)
        }}
        onFocusVisible={function noRefCheck() {}}
        size="small"
      >
        {t('content.account.copy_to_clipboard')}
      </Button>
      <pre>{JSON.stringify(parsedToken, null, 2)}</pre>
    </main>
  )
}
