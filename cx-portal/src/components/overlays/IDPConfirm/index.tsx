import React, { useState } from 'react'

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { useRemoveIDPMutation } from 'features/admin/idpApiSlice'

const WarningText = () => {}

const ErrorText = () => {}

function IDPConfirm({ id }: { id: string }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [removeIDP] = useRemoveIDPMutation()
  const [error, setError] = useState<null | Error>(null)

  const handleDelete = async () => {
    try {
      // await removeIDP(id)
      dispatch(updateData(UPDATES.IDP_LIST))
    } catch (error) {
      setError(error as Error)
    }
  }

  return (
    <>
      <DialogHeader
        {...{
          title: 'Deletion of the identity provider',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />

      <DialogContent>{<>test</>}</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {`${t('global.actions.back')}`}
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          {`${t('global.actions.confirm')}`}
        </Button>
      </DialogActions>
    </>
  )
}

export default IDPConfirm
