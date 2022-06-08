import './TechnicalUserManagement.scss'
import {
  AddTechnicalUserOverlay,
  DefaultFormFieldValuesType,
} from './AddTechnicalUserOverlay'
import { AddTechnicalUserResponseOverlay } from './AddTechnicalUserResponseOverlay'
import { ContentTechnicalUser } from './ContentTechnicalUser'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { PageHeader } from 'cx-portal-shared-components'
import { RequestState } from 'types/MainTypes'
import { fetchPage } from 'features/admin/service/actions'
import { stateSelector as createSelector } from 'features/admin/service/screate'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TechnicalUserManagement() {
  const [open, setOpen] = useState(false)
  const [openResponse, setOpenResponse] = useState(false)
  const { t } = useTranslation()

  const dispatch = useDispatch()
  // TODO: Check if creatResult data is still valid since form validation is done by React Hook Form
  const createResult = useSelector(createSelector)
  useEffect(() => {
    //reload the data after successful create
    if (createResult.request === RequestState.OK) {
      dispatch(fetchPage(0))
    }
  }, [dispatch, createResult])

  const openAddTechnicalUserOverlay = () => {
    setOpen(true)
  }

  const closeAddTechnicalUserOverlay = () => {
    setOpen(false)
  }

  const openAddTechnicalUserResponseOverlay = () => {
    setOpenResponse(true)
  }

  const closeAddTechnicalUserResponseOverlay = () => {
    setOpenResponse(false)
  }

  const handleAddTechnicalUserConfirm = (
    formValues: DefaultFormFieldValuesType
  ) => {
    openAddTechnicalUserResponseOverlay()

    console.log('Form data: ', formValues)

    // TODO: use above formValues for API call/Redux
    // dispatch(
    //     addItem({
    //       name: `testaccount-${Date.now()}`,
    //       description: 'another test account',
    //       authenticationType: 'SECRET',
    //     })
    //   )
  }

  return (
    <main className="technical-user-management">
      <AddTechnicalUserOverlay
        dialogOpen={open}
        handleClose={closeAddTechnicalUserOverlay}
        handleConfirm={handleAddTechnicalUserConfirm}
      />
      <AddTechnicalUserResponseOverlay
        dialogOpen={openResponse}
        onCloseWithIcon={closeAddTechnicalUserResponseOverlay}
      />
      <PageHeader
        title={t('content.usermanagement.technicalUser.headline')}
        topPage={true}
        headerHeight={314}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <ContentTechnicalUser
        openAddTechnicalUserOverlay={openAddTechnicalUserOverlay}
      />
    </main>
  )
}
