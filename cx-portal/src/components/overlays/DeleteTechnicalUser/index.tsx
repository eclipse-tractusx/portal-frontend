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

import {
  DialogActions,
  DialogHeader,
  DialogContent,
  Button,
  PageNotificationsProps,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import {
  useFetchServiceAccountDetailQuery,
  useRemoveServiceAccountMutation,
} from 'features/admin/serviceApiSlice'
import { setNotification } from 'features/notification/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { closeOverlay } from 'features/control/overlay/actions'
import './style.scss'

export const DeleteTechnicalUser = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useFetchServiceAccountDetailQuery(id ?? '')
  const [removeServiceAccount] = useRemoveServiceAccountMutation()

  const deleteUserSuccess = () => {
    const notification: PageNotificationsProps = {
      open: true,
      severity: 'success',
      title:
        'content.usermanagement.technicalUser.confirmDeleteNotificationTitle',
      description:
        'content.usermanagement.technicalUser.confirmDeleteNotificationDescription',
    }
    dispatch(closeOverlay())
    dispatch(updateData(UPDATES.TECHUSER_LIST))
    dispatch(setNotification(notification))
    navigate(`/${PAGES.TECHUSER_MANAGEMENT}`)
  }

  const handleRemove = async () => {
    if (!data) return
    try {
      const response = await removeServiceAccount(
        data.serviceAccountId
      ).unwrap()
      deleteUserSuccess()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  return data ? (
    <>
      <DialogHeader title={`${t('global.actions.delete')} ${data.name}`} />

      <DialogContent>
        <div className="remove-technical-user-content">
          <SubHeaderTitle
            title={t('content.usermanagement.technicalUser.confirmDeleteUser', {
              user: data.name,
            })}
            variant="h6"
          />
          <SubHeaderTitle
            title={t('content.usermanagement.technicalUser.noteDeleteUser', {
              user: data.name,
            })}
            variant="h5"
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" onClick={handleRemove}>
          {t('global.actions.delete')}
        </Button>
      </DialogActions>
    </>
  ) : null
}
