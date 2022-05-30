import React from 'react'
import { Button } from 'cx-portal-shared-components'
import { openTechnicalUserAdd } from 'features/admin/user/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AddTechnicalUserOverlay } from './AddTechnicalUserOverlay'

export default function TechnicalUserManagement() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <main className="TechnicalUserManagement">
      <AddTechnicalUserOverlay />
      <Button size="small" onClick={() => dispatch(openTechnicalUserAdd())}>
        {t('content.usermanagement.technicalUser.create')}
      </Button>
    </main>
  )
}
