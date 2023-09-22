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
import { setErrorType, setSuccessType } from 'features/adminBoard/slice'
import DeclineAdminBoard from '.'
import {
  useDeclineServiceRequestMutation,
  useFetchBoardServiceDetailsQuery,
} from 'features/adminBoard/serviceAdminBoardApiSlice'

export default function ServiceDeclineAdminboard({ id }: { id: string }) {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch<typeof store.dispatch>()
  const { data } = useFetchBoardServiceDetailsQuery(id ?? '')

  const [declineServiceRequest] = useDeclineServiceRequestMutation()

  const onConfirm = async (msg: string) => {
    await declineServiceRequest({
      appId: id,
      message: msg,
    })
      .unwrap()
      .then(() => {
        dispatch(setSuccessType(true))
      })
      .catch((error) => dispatch(setErrorType(true)))
    dispatch(closeOverlay())
  }

  useEffect(() => {
    dispatch(setSuccessType(false))
    dispatch(setErrorType(false))
  }, [dispatch])

  return (
    <>
      <DeclineAdminBoard
        handleConfirm={(msg) => void onConfirm(msg)}
        confirmBtn={t('adminBoard.declineModal.confirm')}
        closeBtn={t('adminBoard.declineModal.close')}
        title={t('adminBoard.declineModal.title').replace(
          '{appName}',
          data ? data.title : ''
        )}
        subHeading={t('adminBoard.declineModal.subheading')}
        declineReason={t('adminBoard.declineModal.declineReason')}
        declineReason1Label={t('adminBoard.declineModal.declineReason1Label')}
        declineReason2Label={t('adminBoard.declineModal.declineReason2Label')}
        declineReason3Label={t('adminBoard.declineModal.declineReason3Label')}
        inputLabel={t('adminBoard.declineModal.inputLabel')}
      />
    </>
  )
}
