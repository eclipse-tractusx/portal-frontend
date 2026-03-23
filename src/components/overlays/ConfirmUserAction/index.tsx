/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DeleteUserContent from 'components/shared/basic/DeleteObjectContent'
import {
  useRemoveTenantUserMutation,
  useFetchUserDetailsQuery,
  useResetPasswordMutation,
  useDeleteMyUserMutation,
} from 'features/admin/userApiSlice'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { closeOverlay, exec } from 'features/control/overlay'
import { useNavigate } from 'react-router-dom'
import UserService from 'services/UserService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { ServerResponseOverlay } from '../ServerResponse'
import { ACTIONS } from 'types/Constants'

export const ConfirmUserAction = ({
  id,
  title = 'user',
  subTitle = '',
}: {
  id: string
  title?: string
  subTitle?: string
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data } = useFetchUserDetailsQuery(id ?? '')
  const [deleteTenantUser] = useRemoveTenantUserMutation()
  const [deleteMyUser] = useDeleteMyUserMutation()
  const [resetPassword] = useResetPasswordMutation()
  const [error, setError] = useState<boolean>(false)
  const [response, setResponse] = useState<boolean>(false)
  const [loading, showLoading] = useState<boolean>(false)

  type MessageData = {
    header: string
    subHeader: string
    subHeaderNote: string
    subHeaderDescription?: string
    successTitle: string
    successDescription: string
    errorTitle: string
    errorDescription: string
  }

  type MessageMapType = {
    user: MessageData
    suspend: MessageData
    ownUser: MessageData
    resetPassword: MessageData
  }

  const messageMap: MessageMapType = {
    user: {
      header: t('content.usermanagement.deleteUserConfirm.header'),
      subHeader: t(
        'content.usermanagement.deleteUserConfirm.confirmTitle'
      ).replace('{userName}', `${data?.firstName} ${data?.lastName} `),
      subHeaderNote: t('content.usermanagement.deleteUserConfirm.note'),
      subHeaderDescription: t(
        'content.usermanagement.deleteUserConfirm.description'
      ),
      successTitle: t('content.usermanagement.deleteUserConfirm.successTitle'),
      successDescription: t(
        'content.usermanagement.deleteUserConfirm.successDescription'
      ),
      errorTitle: t('content.usermanagement.deleteUserConfirm.errorTitle'),
      errorDescription: t(
        'content.usermanagement.deleteUserConfirm.errorDescription'
      ),
    },
    suspend: {
      header: t('content.usermanagement.suspendUserConfirm.header'),
      subHeader: t(
        'content.usermanagement.suspendUserConfirm.confirmTitle'
      ).replace('{userName}', `${data?.firstName} ${data?.lastName} `),
      subHeaderDescription: t(
        'content.usermanagement.suspendUserConfirm.description'
      ),
      subHeaderNote: t('content.usermanagement.suspendUserConfirm.note'),
      successTitle: t('content.usermanagement.suspendUserConfirm.successTitle'),
      successDescription: t(
        'content.usermanagement.suspendUserConfirm.successDescription'
      ),
      errorTitle: t('content.usermanagement.suspendUserConfirm.errorTitle'),
      errorDescription: t(
        'content.usermanagement.suspendUserConfirm.errorDescription'
      ),
    },
    ownUser: {
      header: t('content.usermanagement.deleteOwnUserConfirm.header'),
      subHeader: t(
        'content.usermanagement.deleteOwnUserConfirm.confirmTitle'
      ).replace('{userName}', ''),
      subHeaderNote: t('content.usermanagement.deleteOwnUserConfirm.note'),
      subHeaderDescription: t(
        'content.usermanagement.deleteOwnUserConfirm.description'
      ),
      successTitle: t(
        'content.usermanagement.deleteOwnUserConfirm.successTitle'
      ),
      successDescription: t(
        'content.usermanagement.deleteOwnUserConfirm.successDescription'
      ),
      errorTitle: t('content.usermanagement.deleteOwnUserConfirm.errorTitle'),
      errorDescription: t(
        'content.usermanagement.deleteOwnUserConfirm.errorDescription'
      ),
    },
    resetPassword: {
      header: `${t('content.usermanagement.resetPasswordConfirm.header')} ${
        data?.firstName
      } ${data?.lastName} `,
      subHeader: t('content.usermanagement.resetPasswordConfirm.confirmTitle'),
      subHeaderNote: t(
        'content.usermanagement.resetPasswordConfirm.note'
      ).replace('{userName}', subTitle),
      successTitle: t(
        'content.usermanagement.resetPasswordConfirm.successTitle'
      ),
      successDescription: t(
        'content.usermanagement.resetPasswordConfirm.successDescription'
      ).replace('{userName}', subTitle),
      errorTitle: t('content.usermanagement.resetPasswordConfirm.errorTitle'),
      errorDescription: t(
        'content.usermanagement.resetPasswordConfirm.errorDescription'
      ),
    },
  }

  const handleConfirm = async () => {
    if (!id) return
    showLoading(true)
    if (title === 'user') {
      try {
        await deleteTenantUser([id]).unwrap()
        showSuccessPopup()
      } catch (err) {
        showErrorPopup()
      }
    } else if (title === 'ownUser') {
      try {
        await deleteMyUser(id).unwrap()
        showSuccessPopup()
      } catch (err) {
        showErrorPopup()
      }
    } else if (title === 'resetPassword') {
      try {
        await resetPassword(id).unwrap()
        showSuccessPopup()
      } catch (err) {
        showErrorPopup()
      }
    } else {
      //suspend user api comes here
      dispatch(closeOverlay())
    }
  }

  const showSuccessPopup = () => {
    setResponse(true)
    showLoading(false)
    if (title === 'ownUser') {
      setTimeout(() => {
        dispatch(exec(ACTIONS.SIGNOUT))
      }, 5000)
    }
  }

  const showErrorPopup = () => {
    setError(true)
    showLoading(false)
  }

  const handleCallback = () => {
    dispatch(closeOverlay())
    if (!error) {
      if (title === 'user' || title === 'suspend') {
        navigate('/usermanagement/#identity')
      } else if (title === 'ownUser') {
        UserService.doLogout({ redirectUri: `${document.location.origin}/` })
      }
    }
  }

  const canHideOverlay = () => !!response === !!error

  return (
    <>
      {data && canHideOverlay() && (
        <DeleteUserContent
          header={messageMap[title as keyof MessageMapType].header}
          subHeader={messageMap[title as keyof MessageMapType].subHeader}
          subHeaderTitle={messageMap[title as keyof MessageMapType].subHeader}
          subHeaderNote={
            messageMap[title as keyof MessageMapType].subHeaderNote
          }
          subHeaderDescription={
            messageMap[title as keyof MessageMapType].subHeaderDescription
          }
          handleConfirm={handleConfirm}
          confirmTitle={
            title === 'resetPassword' || title === 'suspend'
              ? t('global.actions.confirm')
              : t('global.actions.delete')
          }
          showLoader={loading}
        />
      )}
      {response && (
        <ServerResponseOverlay
          title={messageMap[title as keyof MessageMapType].successTitle}
          intro={messageMap[title as keyof MessageMapType].successDescription}
          dialogOpen={true}
          handleCallback={handleCallback}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      {error && (
        <ServerResponseOverlay
          title={messageMap[title as keyof MessageMapType].errorTitle}
          intro={messageMap[title as keyof MessageMapType].errorDescription}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
          handleCallback={handleCallback}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
    </>
  )
}
