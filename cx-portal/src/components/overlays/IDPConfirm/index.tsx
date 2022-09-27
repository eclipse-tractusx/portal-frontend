import React, { useState } from 'react'

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
} from 'cx-portal-shared-components'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { useRemoveIDPMutation } from 'features/admin/idpApiSlice'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'

interface Status {
  error: boolean
  success: boolean
}

const getIcon = (status: Status) => {
  if (status.error) {
    return <CancelOutlinedIcon sx={{ fontSize: 60 }} color="error" />
  }

  if (status.success) {
    return <CheckCircleOutlinedIcon sx={{ fontSize: 60 }} color="success" />
  }

  return null
}

const getTitle = (status: Status) => {
  if (status.error) {
    return 'overlays.idp_delete_error_title'
  }

  if (status.success) {
    return 'overlays.idp_delete_success_title'
  }

  return 'overlays.idp_delete_info_title'
}

const getIntro = (status: Status) => {
  if (status.error) {
    return 'overlays.idp_delete_error_intro'
  }

  if (status.success) {
    return 'overlays.idp_delete_success_intro'
  }

  return 'overlays.idp_delete_info_intro'
}

function IDPConfirm({ id, title }: { id: string; title?: string }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [removeIDP, { isLoading }] = useRemoveIDPMutation()
  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
  })

  const handleDelete = async () => {
    try {
      // await removeIDP(id)
      dispatch(updateData(UPDATES.IDP_LIST))
      setStatus({ success: true, error: false })

      //to close the overlay on success after few seconds
      setTimeout(() => {
        dispatch(closeOverlay())
      }, 3000)
    } catch (error) {
      setStatus({ error: true, success: true })
    }
  }

  return (
    <>
      <DialogHeader
        {...{
          title: t(`${getTitle(status)}`, { name: title }),
          closeWithIcon: true,
          icon: true,
          iconComponent: getIcon(status),
          onCloseWithIcon: () => dispatch(closeOverlay()),
          intro: t(`${getIntro(status)}`),
        }}
      />

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {`${t('global.actions.back')}`}
        </Button>
        {status.error || status.success || (
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onButtonClick={handleDelete}
            sx={{ marginLeft: '10px' }}
            loadIndicator="Loading..."
            label={`${t('global.actions.confirm')}`}
          ></LoadingButton>
        )}
      </DialogActions>
    </>
  )
}

export default IDPConfirm
