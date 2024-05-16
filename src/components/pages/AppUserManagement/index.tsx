/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AppUserDetailsHeader from './components/AppUserDetailsHeader'
import { AppUserDetailsTable } from './components/AppUserDetailsTable'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  Dialog,
  DialogContent,
  IconButton,
  PageHeader,
  Typography,
} from '@catena-x/portal-shared-components'
import {
  currentUserRoleResp,
  setUserRoleResp,
  SuccessErrorType,
  useFetchAppRolesQuery,
} from 'features/admin/appuserApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import './AppUserManagement.scss'

export default function AppUserManagement() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appId = useParams().appId
  const appDetails = useFetchAppDetailsQuery(appId ?? '').data
  const { data, isError } = useFetchAppRolesQuery(appId ?? '')

  const userRoleResponse = useSelector(currentUserRoleResp)

  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    setShowAlert(
      userRoleResponse === SuccessErrorType.ERROR ||
        userRoleResponse === SuccessErrorType.SUCCESS
    )
  }, [userRoleResponse])

  useEffect(() => {
    dispatch(setUserRoleResp(''))
  }, [dispatch])

  const onAlertClose = () => {
    dispatch(setUserRoleResp(''))
    setShowAlert(false)
  }

  return (
    <main className="app-user-management">
      <PageHeader
        title={t('content.usermanagement.appUserDetails.headline', {
          app: appDetails?.title,
        })}
        topPage={true}
        headerHeight={314}
      >
        <PageBreadcrumb />
      </PageHeader>
      <AppUserDetailsHeader
        roles={data}
        error={isError ? JSON.stringify(data) : ''}
      />
      <AppUserDetailsTable roles={data} userRoleResponse={userRoleResponse} />
      {/* success or error dialog/overlay */}
      {userRoleResponse && (
        <Dialog
          open={showAlert}
          sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
        >
          <DialogContent>
            <IconButton
              aria-label="close"
              onClick={() => {
                onAlertClose()
              }}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: '#939393',
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography mt={7} mb={2} variant="body2" align="center">
              {userRoleResponse === SuccessErrorType.SUCCESS ? (
                <CheckCircleOutlineIcon
                  color="success"
                  sx={{ width: 46, height: 46 }}
                />
              ) : (
                <ErrorOutlineIcon
                  color="error"
                  style={{ height: 20, width: 20 }}
                />
              )}
            </Typography>
            <Typography mb={2} variant="h4" align="center">
              {userRoleResponse === SuccessErrorType.SUCCESS
                ? t('content.usermanagement.appUserDetails.userRoleSuccessMsg')
                : t('content.usermanagement.appUserDetails.userRoleErrorMsg')}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </main>
  )
}
