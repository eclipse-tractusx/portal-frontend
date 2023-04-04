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

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import { closeOverlay } from 'features/control/overlay/actions'
import {
  useFetchIDPDetailQuery,
  useRemoveIDPMutation,
} from 'features/admin/idpApiSlice'
import DeleteObjectContent from 'components/shared/basic/DeleteObjectContent'
import IDPStateNotification, {
  IDPState,
} from 'components/pages/IDPManagement/IDPStateNotification'
import { useState } from 'react'

export const DeleteIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useFetchIDPDetailQuery(id ?? '')
  const [removeIDP] = useRemoveIDPMutation()
  const [status, setStatus] = useState<IDPState>(IDPState.NONE)

  const deleteIDPSuccess = () => {
    setTimeout(() => dispatch(closeOverlay()), 3500)
    setStatus(IDPState.SUCCESS_DELETE_IDP)
    navigate(`/${PAGES.IDP_MANAGEMENT}`)
  }

  const deleteIDPFailure = () => {
    setTimeout(() => dispatch(closeOverlay()), 3500)
    setStatus(IDPState.ERROR_DELETE_IDP)
    navigate(`/${PAGES.IDP_MANAGEMENT}`)
  }

  const handleRemove = async () => {
    if (!data) return
    try {
      await removeIDP(data.identityProviderId).unwrap()
      deleteIDPSuccess()
    } catch (err) {
      console.log(err)
      deleteIDPFailure()
    }
  }
  return data ? (
    <>
      <DeleteObjectContent
        header={`${t('global.actions.delete')} ${t('global.objects.idp')} ${
          data.displayName
        }`}
        subHeader={t('global.actions.confirmDelete', {
          object: t('global.objects.idp'),
          name: data.displayName,
        })}
        subHeaderTitle={t('global.actions.noteDelete', {
          object: t('global.objects.idp'),
        })}
        handleConfirm={handleRemove}
        confirmTitle={t('global.actions.delete')}
      />
      <IDPStateNotification state={status} />
    </>
  ) : null
}
