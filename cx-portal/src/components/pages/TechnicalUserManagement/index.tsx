import { useState } from 'react'
import { PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AddTechnicalUserOverlay } from './AddTechnicalUserOverlay'
import { ContentTechnicalUser } from './ContentTechnicalUser'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import './TechnicalUserManagement.scss'
import { AddTechnicalUserResponseOverlay } from './AddTechnicalUserResponseOverlay'

export default function TechnicalUserManagement() {
  const [open, setOpen] = useState(false)
  const [openResponse, setOpenResponse] = useState(false)
  const { t } = useTranslation()

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

  const handleAddUTechnicalUserConfirm = () => {
    // TODO: API call and make response open followup dialog with openAddTechnicalUserResponseOverlay()
    openAddTechnicalUserResponseOverlay()
  }

  return (
    <main className="technical-user-management">
      <AddTechnicalUserOverlay
        dialogOpen={open}
        handleClose={closeAddTechnicalUserOverlay}
        handleConfirm={handleAddUTechnicalUserConfirm}
      />
      <AddTechnicalUserResponseOverlay dialogOpen={openResponse} onCloseWithIcon={closeAddTechnicalUserResponseOverlay} />
      <PageHeader
        title={t('content.usermanagement.technicalUser.headline')}
        spacingTop={-84}
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
