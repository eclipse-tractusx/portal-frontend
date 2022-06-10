import AccessService from '../../../services/AccessService'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../shared/frame/Header'
import { ErrorPage } from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { errorSelector } from 'features/error/slice'
import { resetError } from 'features/error/actions'

export default function ErrorBoundary() {
  const { t } = useTranslation()
  const error = useSelector(errorSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reloadButtonTitleText = () => {
    if (error.reloadButtonTitle) {
      return t(error.reloadButtonTitle)
    }

    return t('global.actions.reload')
  }

  const homeButtonTitleText = () => {
    if (error.homeButtonTitle) {
      return t(error.homeButtonTitle)
    }

    return t('global.actions.homepage')
  }

  const handleReload = () => {
    if (error.reloadPageLink) {
      navigate(error.reloadPageLink)
    } else {
      navigate('/home')
    }
    dispatch(resetError())
  }

  const handleHome = () => {
    if (error.homePageLink) {
      navigate(error.homePageLink)
    } else {
      navigate('/home')
    }
    dispatch(resetError())
  }

  const title = () => {
    if (error.title) {
      return error.title
    }

    return t('global.errors.title')
  }

  const description = () => {
    if (error.description) {
      return error.description
    }

    return t('global.errors.description')
  }

  const additionalDescription = () => {
    return t('global.errors.additionalDescription')
  }

  return (
    <div>
      {error.hasNavigation && (
        <Header
          main={AccessService.mainMenuTree()}
          user={AccessService.userMenu()}
        />
      )}

      <ErrorPage
        hasNavigation={error.hasNavigation}
        header={error.header}
        title={title()}
        description={description()}
        additionalDescription={additionalDescription()}
        reloadButtonTitle={reloadButtonTitleText()}
        homeButtonTitle={homeButtonTitleText()}
        onReloadClick={() => handleReload()}
        onHomeClick={() => handleHome()}
      />
    </div>
  )
}
