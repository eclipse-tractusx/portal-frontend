import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'state/store'
import SubHeader from '../../shared/frame/SubHeader'
import './MyAccount.scss'
import { MyUserDetails } from './components/MyUserDetails'

export default function MyAccount() {
  const { t } = useTranslation()
  const parsedToken = useSelector((state: RootState) => state.user.parsedToken)
  const token = useSelector((state: RootState) => state.user.token)
  return (
    <main className="my-account">
      {/*<p>{t('content.account.token')}</p>*/}
      <SubHeader title={t('pages.account')} hasBackButton={true} />
      <MyUserDetails>{/*<UserDetailCard></UserDetailCard>*/}</MyUserDetails>

      {/*<Table></Table>*/}

      {/*<Button*/}
      {/*  color="secondary"*/}
      {/*  onClick={() => {*/}
      {/*    navigator.clipboard.writeText(token)*/}
      {/*  }}*/}
      {/*  onFocusVisible={function noRefCheck() {}}*/}
      {/*  size="small"*/}
      {/*>*/}
      {/*  {t('content.account.copy_to_clipboard')}*/}
      {/*</Button>*/}
      {/*<pre>{JSON.stringify(parsedToken, null, 2)}</pre>*/}
    </main>
  )
}
