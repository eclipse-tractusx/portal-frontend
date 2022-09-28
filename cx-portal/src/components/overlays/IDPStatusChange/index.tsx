import React from 'react'

import {
  Button,
  DialogActions,
  DialogHeader,
} from 'cx-portal-shared-components'

import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'

function IDPStatusChange({ id, title }: { id: string; title?: string }) {
  const dispatch = useDispatch()

  return (
    <>
      <DialogHeader
        {...{
          title: 'Title',
          closeWithIcon: true,
          icon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />

      <DialogActions>
        <Button variant="outlined">Back</Button>
        <Button variant="contained" sx={{ marginLeft: '10px' }}>
          Button
        </Button>
      </DialogActions>
    </>
  )
}

export default IDPStatusChange
