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

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import { StageSubNavigation } from './StageSubNavigation/StageSubNavigation'
import {
  currentAddUserError,
  currentAddUserSuccess,
  setAddUserError,
  setAddUserSuccess,
} from 'features/admin/userApiSlice'
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import { useTranslation } from 'react-i18next'

export default function UserManagement() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const isSuccess = useSelector(currentAddUserSuccess)
  const isError = useSelector(currentAddUserError)

  useEffect(() => {
    setShowAlert(isSuccess ? isSuccess : isError)
  }, [isSuccess, isError])

  const alertClose = () => {
    dispatch(setAddUserSuccess(false))
    dispatch(setAddUserError(false))
    setShowAlert(false)
  }

  return (
    <main className="UserManagement">
      <StageSection />
      <StageSubNavigation />
      <AppArea />
      <ActiveUserTable addUserResponse={isSuccess} />
      {/* success or error dialog/overlay */}
      {(isError || isSuccess) && (
        <Dialog
          open={showAlert}
          sx={{ '.MuiDialog-paper': { maxWidth: '55%' } }}
        >
          <DialogContent>
            <IconButton
              aria-label="close"
              onClick={() => {
                alertClose()
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
              {isSuccess ? (
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
              {isSuccess
                ? t('content.userAdded.success')
                : t('content.userAdded.failure')}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </main>
  )
}
