/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import type { store } from 'features/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { useDeclineRequestMutation } from 'features/adminBoard/adminBoardApiSlice'
import { setErrorType, setSuccessType } from 'features/adminBoard/slice'
import DeclineAdminBoard from '.'

export default function AppDeclineAdminboard({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const { data } = useFetchAppDetailsQuery(id ?? '')

  const [declineRequest] = useDeclineRequestMutation()

  useEffect(() => {
    dispatch(setSuccessType(false))
    dispatch(setErrorType(false))
  }, [dispatch])

  const handleConfirm = async (msg: string) => {
    await declineRequest({
      appId: id,
      message: msg,
    })
      .unwrap()
      .then(() => {
        dispatch(setSuccessType(true))
      })
      .catch(() => dispatch(setErrorType(true)))
    dispatch(closeOverlay())
  }

  return (
    <>
      <DeclineAdminBoard
        handleConfirm={(msg) => void handleConfirm(msg)}
        confirmBtn={t('content.adminBoard.declineModal.confirm')}
        closeBtn={t('content.adminBoard.declineModal.close')}
        title={t('content.adminBoard.declineModal.title').replace(
          '{appName}',
          data ? data.title : ''
        )}
        subHeading={t('content.adminBoard.declineModal.subheading')}
        declineReason={t('content.adminBoard.declineModal.declineReason')}
        declineReason1Label={t(
          'content.adminBoard.declineModal.declineReason1Label'
        )}
        declineReason2Label={t(
          'content.adminBoard.declineModal.declineReason2Label'
        )}
        declineReason3Label={t(
          'content.adminBoard.declineModal.declineReason3Label'
        )}
        inputLabel={t('content.adminBoard.declineModal.inputLabel')}
      />
    </>
  )
}
