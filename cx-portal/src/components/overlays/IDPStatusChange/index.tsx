import { useState } from 'react'
import {
  Button,
  DialogActions,
  DialogHeader,
  LoadingButton,
} from 'cx-portal-shared-components'
import { useTranslation, Trans, TFunction } from 'react-i18next'
import { useEnableIDPMutation } from 'features/admin/idpApiSlice'
import { useDispatch } from 'react-redux'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { closeOverlay } from 'features/control/overlay'

type Status = { error: boolean; success: boolean }

const getStatus = (
  status: boolean,
  t: TFunction<'translation', undefined>,
  addSuffix?: boolean
) => {
  if (addSuffix) {
    return t(`global.state.${!status ? 'enabled' : 'disabled'}`)
  }

  return t(`global.state.${!status ? 'enable' : 'disable'}`)
}

const getTitle = (
  status: Status,
  t: TFunction<'translation', undefined>,
  idpStatus: boolean,
  title?: string
) => {
  if (status.success) {
    return (
      <Trans
        i18nKey={'overlays.idp_status_change_success'}
        values={{ name: title, status: getStatus(idpStatus, t, true) }}
      ></Trans>
    )
  }

  if (status.error) {
    return (
      <Trans
        i18nKey={'overlays.idp_status_change_error'}
        values={{ status: getStatus(idpStatus, t, true) }}
      ></Trans>
    )
  }

  return (
    <Trans
      i18nKey={'overlays.idp_status_change_info'}
      values={{ status: getStatus(idpStatus, t) }}
    ></Trans>
  )
}

const getIntro = (status: Status, retry: () => void, idpStatus?: boolean) => {
  if (status.success) {
    return <Trans i18nKey="overlays.idp_delete_success_intro"></Trans>
  }

  if (status.error) {
    return (
      <Trans i18nKey="[span]overlays.idp_delete_error_intro">
        Please{' '}
        <span className="idp-retry-link" onClick={retry}>
          {' '}
          retry
        </span>{' '}
        or contact an administrator if the failure persist.
      </Trans>
    )
  }

  return (
    <Trans
      i18nKey={
        idpStatus
          ? 'overlays.idp_status_change_intro1'
          : 'overlays.idp_status_change_intro2'
      }
    ></Trans>
  )
}

const getIcon = (status: Status) => {
  if (status.success) {
    return <CheckCircleOutlinedIcon sx={{ fontSize: 60 }} color="success" />
  }

  if (status.error) {
    return <CancelOutlinedIcon sx={{ fontSize: 60 }} color="error" />
  }

  return <></>
}

function IDPStatusChange({
  id,
  title,
  idpStatus,
}: {
  id: string
  title?: string
  idpStatus?: boolean
}) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [enableIDP, { isLoading }] = useEnableIDPMutation()
  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
  })

  const handleStatusChange = async () => {
    try {
      await enableIDP({ id, enabled: !idpStatus })
      setStatus({ success: true, error: false })
    } catch (error) {
      console.log(error)
      setStatus({ success: false, error: true })
    }
  }

  const retry = () => handleStatusChange()

  return (
    <>
      <DialogHeader
        {...{
          title: getTitle(status, t, idpStatus!, title),
          closeWithIcon: true,
          icon: true,
          iconComponent: getIcon(status),
          onCloseWithIcon: () => dispatch(closeOverlay()),
          intro: getIntro(status, retry, idpStatus),
        }}
      />

      <DialogActions>
        <Button
          onClick={() => dispatch(closeOverlay())}
          variant="outlined"
        >{`${t('global.actions.back')}`}</Button>
        {status.error || status.success || (
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onButtonClick={handleStatusChange}
            sx={{ marginLeft: '10px' }}
            loadIndicator="Loading..."
            label={`${t('global.actions.confirm')}`}
          ></LoadingButton>
        )}
      </DialogActions>
    </>
  )
}

export default IDPStatusChange
