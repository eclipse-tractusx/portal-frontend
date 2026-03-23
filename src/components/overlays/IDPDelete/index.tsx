/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
} from '@arena2036/portal-shared-components-construct-x'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

import { useTranslation, Trans } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useRemoveIDPMutation } from 'features/admin/idpApiSlice'

import './style.scss'

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

  return <></>
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

const getIntro = (status: Status, retry: () => void) => {
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

  if (status.success) {
    return <Trans i18nKey="overlays.idp_delete_success_intro"></Trans>
  }

  return <Trans i18nKey="overlays.idp_delete_info_intro"></Trans>
}

function IDPDelete({ id, title }: { id: string; title?: string }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [removeIDP, { isLoading }] = useRemoveIDPMutation()
  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
  })

  const handleDelete = async () => {
    try {
      await removeIDP(id)
      setStatus({ success: true, error: false })

      //to close the overlay on success after three seconds
      setTimeout(() => {
        dispatch(closeOverlay())
      }, 3000)
    } catch (error) {
      setStatus({ error: true, success: false })
    }
  }

  const retry = () => void handleDelete()

  return (
    <>
      <DialogHeader
        {...{
          title: t(`${getTitle(status)}`, { name: title }),
          closeWithIcon: true,
          icon: true,
          iconComponent: getIcon(status),
          onCloseWithIcon: () => dispatch(closeOverlay()),
          intro: getIntro(status, retry),
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

export default IDPDelete
