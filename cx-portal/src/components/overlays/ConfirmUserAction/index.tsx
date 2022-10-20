/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DeleteUserContent from 'components/shared/basic/DeleteUserContent'
import {
  useDeleteUserMutation,
  useFetchUserDetailsQuery,
  useResetPasswordMutation,
} from 'features/admin/userApiSlice'
import { Typography } from 'cx-portal-shared-components'
import { TechnicalUserAddResponseOverlay } from '../AddTechnicalUser/TechnicalUserAddResponseOverlay'
import { closeOverlay } from 'features/control/overlay/actions'
import { useNavigate } from 'react-router-dom'
import UserService from 'services/UserService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

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
  const [deleteUser] = useDeleteUserMutation()
  const [resetPassword] = useResetPasswordMutation()
  const [error, setError] = useState<boolean>(false)
  const [response, setResponse] = useState<boolean>(false)
  const [loading, showLoading] = useState<boolean>(false)

  const messageMap: any = {
    user: {
      header: t('content.usermanagement.deleteUserConfirm.header'),
      subHeader: t('content.usermanagement.deleteUserConfirm.confirmDelete'),
      subHeaderNote: t('content.usermanagement.deleteUserConfirm.note'),
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
      subHeader: t('content.usermanagement.suspendUserConfirm.confirmDelete'),
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
    admin: {
      header: t('content.usermanagement.deleteUserConfirm.header'),
      subHeader: t('content.usermanagement.deleteUserConfirm.confirmDelete'),
      subHeaderNote: t('content.usermanagement.deleteUserConfirm.note'),
      successTitle: t('content.usermanagement.deleteUserConfirm.successTitle'),
      successDescription: t(
        'content.usermanagement.deleteUserConfirm.successDescription'
      ),
      errorTitle: t('content.usermanagement.deleteUserConfirm.errorTitle'),
      errorDescription: t(
        'content.usermanagement.deleteUserConfirm.errorDescription'
      ),
    },
    resetPassword: {
      header: t('content.usermanagement.resetPasswordConfirm.header'),
      subHeader: t('content.usermanagement.resetPasswordConfirm.confirmDelete'),
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

  const handleRemove = async () => {
    if (!id) return
    showLoading(true)
    if (title === 'user') {
      try {
        const response = await deleteUser(id).unwrap()
        console.log(response)
        setResponse(true)
        showLoading(false)
      } catch (err) {
        console.log(err)
        setError(true)
        showLoading(false)
      }
    } else if (title === 'admin') {
      //delete admin api comes here
      setTimeout(() => {
        setError(true)
        showLoading(false)
      }, 2000)
    } else if (title === 'resetPassword') {
      try {
        const response = await resetPassword(id).unwrap()
        console.log(response)
        setResponse(true)
        showLoading(false)
      } catch (err) {
        console.log(err)
        setError(true)
        showLoading(false)
      }
    } else {
      //suspend user api comes here
      setTimeout(() => {
        setError(true)
        showLoading(false)
      }, 2000)
    }
  }

  const handleCallback = () => {
    dispatch(closeOverlay())
    if (!error) {
      if (title === 'user' || title === 'suspend') {
        navigate('/usermanagement')
      } else if (title === 'admin') {
        UserService.doLogout({ redirectUri: `${document.location.origin}/` })
      } else if (title === 'reset') {
      }
    }
  }

  return (
    <>
      {data && (
        <>
          <DeleteUserContent
            header={messageMap[title].header}
            subHeader={messageMap[title].subHeader}
            subHeaderTitle={messageMap[title].subHeaderTitle}
            subHeaderNote={messageMap[title].subHeaderNote}
            handleRemove={handleRemove}
            confirmTitle={
              title === 'resetPassword'
                ? t('global.actions.confirm')
                : t('global.actions.delete')
            }
            showLoader={loading}
          />
          {response && (
            <TechnicalUserAddResponseOverlay
              title={messageMap[title].successTitle}
              intro={messageMap[title].successDescription}
              dialogOpen={true}
              handleCallback={handleCallback}
            >
              <Typography variant="body2"></Typography>
            </TechnicalUserAddResponseOverlay>
          )}
          {error && (
            <TechnicalUserAddResponseOverlay
              title={messageMap[title].errorTitle}
              intro={messageMap[title].errorDescription}
              dialogOpen={true}
              iconComponent={
                <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
              }
              handleCallback={handleCallback}
            >
              <Typography variant="body2"></Typography>
            </TechnicalUserAddResponseOverlay>
          )}
        </>
      )}
    </>
  )
}
