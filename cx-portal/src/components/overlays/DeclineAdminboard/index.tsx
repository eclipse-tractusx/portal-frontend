/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
  LoadingButton,
  Typography,
} from 'cx-portal-shared-components'
import { store } from 'features/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { useDeclineRequestMutation } from 'features/adminBoard/adminBoardApiSlice'
import { setErrorType, setSuccessType } from 'features/adminBoard/slice'

export default function DeclineAdminBoard({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const { data } = useFetchAppDetailsQuery(id ?? '')
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const [declineRequest] = useDeclineRequestMutation()

  useEffect(() => {
    dispatch(setSuccessType(false))
    dispatch(setErrorType(false))
  }, [dispatch])

  const handleConfirm = async () => {
    setLoading(true)
    await declineRequest({
      appId: id,
      message: inputMessage,
    })
      .unwrap()
      .then(() => {
        dispatch(setSuccessType(true))
      })
      .catch((error) => dispatch(setErrorType(true)))
    dispatch(closeOverlay())
  }

  return (
    <div className="decline-modal-main">
      <DialogHeader
        {...{
          title: t('content.adminBoard.declineModal.title').replace(
            '{appName}',
            data ? data.title : ''
          ),
          intro: t('content.adminBoard.declineModal.subheading'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(closeOverlay()),
        }}
      />
      <DialogContent>
        <div className="decline-modal-input">
          <Typography variant="label2">
            {t('content.adminBoard.declineModal.declineReason')}
          </Typography>
          <ul>
            <li>
              <Typography variant="label2">
                {t('content.adminBoard.declineModal.declineReason1Label')}
              </Typography>
            </li>
            <li>
              <Typography variant="label2">
                {t('content.adminBoard.declineModal.declineReason2Label')}
              </Typography>
            </li>
            <li>
              <Typography variant="label2">
                {t('content.adminBoard.declineModal.declineReason3Label')}
              </Typography>
            </li>
          </ul>
          <Input
            label={t('content.adminBoard.declineModal.inputLabel')}
            sx={{
              paddingTop: '10px',
            }}
            multiline
            rows={2}
            maxRows={4}
            placeholder={''}
            onChange={(e: any) => {
              setInputMessage(e.target.value)
            }}
            value={inputMessage}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          Close
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="medium"
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button variant="contained" onClick={handleConfirm}>
            {t('global.actions.confirm')}
          </Button>
        )}
      </DialogActions>
    </div>
  )
}
