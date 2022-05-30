import React, { useState } from 'react'
import { Button } from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AddTechnicalUserOverlay } from './AddTechnicalUserOverlay'

export default function TechnicalUserManagement() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const openAddTichnicalUserOverlay = () => {
    setOpen(true)
  }

  const closeAddTichnicalUserOverlay = () => {
    setOpen(false)
  }

  return (
    <main className="TechnicalUserManagement">
      <AddTechnicalUserOverlay
        dialogOpen={open}
        handleClose={closeAddTichnicalUserOverlay}
      />
      <Button size="small" onClick={openAddTichnicalUserOverlay}>
        {t('content.usermanagement.technicalUser.create')}
      </Button>
    </main>
  )
}
