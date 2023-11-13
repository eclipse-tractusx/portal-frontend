/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useState } from 'react'
import {
  Button,
  DialogActions,
  DialogHeader,
  LoadingButton,
} from '@catena-x/portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'
import i18next from 'i18next'
import { useEnableIDPMutation } from 'features/admin/idpApiSlice'
import { useDispatch } from 'react-redux'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { closeOverlay } from 'features/control/overlay'

type Status = { error: boolean; success: boolean }

const getStatus = (status: boolean, addSuffix?: boolean) => {
  if (addSuffix) {
    return i18next.t(`global.state.${!status ? 'enabled' : 'disabled'}`)
  }

  return i18next.t(`global.state.${!status ? 'enable' : 'disable'}`)
}

const getTitle = (status: Status, idpStatus: boolean, title?: string) => {
  if (status.success) {
    return (
      <Trans
        i18nKey={'overlays.idp_status_change_success'}
        values={{ name: title, status: getStatus(idpStatus, true) }}
      ></Trans>
    )
  }

  if (status.error) {
    return (
      <Trans
        i18nKey={'overlays.idp_status_change_error'}
        values={{ status: getStatus(idpStatus, true) }}
      ></Trans>
    )
  }

  return (
    <Trans
      i18nKey={'overlays.idp_status_change_info'}
      values={{ status: getStatus(idpStatus) }}
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
        <span
          className="idp-retry-link"
          onClick={retry}
          onKeyUp={() => {
            // do nothing
          }}
        >
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

  const retry = () => void handleStatusChange()

  return (
    <>
      <DialogHeader
        {...{
          title: getTitle(status, idpStatus!, title),
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
