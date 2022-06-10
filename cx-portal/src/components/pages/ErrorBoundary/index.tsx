import AccessService from '../../../services/AccessService'
import { Header } from '../../shared/frame/Header'
import { ErrorPage } from 'cx-portal-shared-components'

export default function ErrorBoundary() {
  return (
    <div>
      <Header
        main={AccessService.mainMenuTree()}
        user={AccessService.userMenu()}
      />

      <ErrorPage
        hasNavigation={true}
        header="500 Internal Server Error"
        title="Oops, Something went wrong."
        description="The server encountered an internal error or misconfiguration and was unable to complete your request. Please contact your admin."
        reloadButtonTitle="Reload Page"
        homeButtonTitle="Homepage"
        onReloadClick={() => console.log('reload')}
        onHomeClick={() => console.log('home page')}
      />
    </div>
  )
}
