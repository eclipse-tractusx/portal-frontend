import { useEffect, useState } from 'react'
import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { useTranslation } from 'react-i18next'
import { AppUserDetailsTable } from './components/AppUserDetailsTable'
import SubHeader from 'components/shared/frame/SubHeader'
import AddUserRightOverlay from '../AddUserRightOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { itemSelector } from 'features/admin/approle/slice'
import { fetchItems } from 'features/admin/approle/actions'
import { useParams } from 'react-router-dom'
import './AppUserDetails.scss'

export default function AppUserDetails() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const items = useSelector(itemSelector)
  const [open, setOpen] = useState(false)
  const appId = useParams().appId

  useEffect(() => {
    if (appId) {
      dispatch(fetchItems(appId))
    }
  }, [dispatch, appId])

  const openAddUserRightLayout = () => {
    setOpen(true)
  }

  const closeAddUserRightLayout = () => {
    setOpen(false)
  }

  const confirmNewUserRight = () => {
    console.log('confirmed user right!')
  }

  return (
    <main className="app-user-details">
      <AddUserRightOverlay
        openDialog={open}
        handleClose={closeAddUserRightLayout}
        handleConfirm={confirmNewUserRight}
      />

      <SubHeader
        title={t('content.usermanagement.appUserDetails.headline')}
        hasBackButton={false}
        hasBreadcrumb={true}
      />

      {items.length > 0 && (
        <>
          <AppUserDetailsHeader roles={items} />
          <AppUserDetailsTable onAddUserButtonClick={openAddUserRightLayout} />
        </>
      )}
    </main>
  )
}
