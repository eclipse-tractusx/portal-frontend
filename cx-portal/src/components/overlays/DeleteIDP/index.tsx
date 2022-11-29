/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { PageNotificationsProps } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { setNotification } from 'features/notification/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { closeOverlay } from 'features/control/overlay/actions'
import {
  useFetchIDPDetailQuery,
  useRemoveIDPMutation,
} from 'features/admin/idpApiSlice'
import DeleteObjectContent from 'components/shared/basic/DeleteObjectContent'

export const DeleteIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useFetchIDPDetailQuery(id ?? '')
  const [removeIDP] = useRemoveIDPMutation()

  const deleteIDPSuccess = () => {
    const notification: PageNotificationsProps = {
      open: true,
      severity: 'success',
      title: 'content.idpManagement.notification.confirmDeleteTitle',
      description:
        'content.idpmanagement.notification.confirmDeleteDescription',
    }
    dispatch(closeOverlay())
    dispatch(updateData(UPDATES.IDP_LIST))
    dispatch(setNotification(notification))
    navigate(`/${PAGES.IDP_MANAGEMENT}`)
  }

  const deleteIDPFailure = () => {
    const notification: PageNotificationsProps = {
      open: true,
      severity: 'error',
      title: 'content.idpManagement.notification.failureDeleteTitle',
      description:
        'content.idpmanagement.notification.failureDeleteDescription',
    }
    dispatch(closeOverlay())
    dispatch(updateData(UPDATES.IDP_LIST))
    dispatch(setNotification(notification))
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
    </>
  ) : null
}
