/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { useSelector } from 'react-redux'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './StageSection'
import { AppArea } from './AppArea'
import { StageSubNavigation } from './StageSubNavigation/StageSubNavigation'
import {
  currentAddUserError,
  currentAddUserSuccess,
} from 'features/admin/userApiSlice'
import { PageSnackbar } from 'cx-portal-shared-components'
import './UserManagement.scss'

export default function UserManagement() {
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const isSuccess = useSelector(currentAddUserSuccess)
  const isError = useSelector(currentAddUserError)

  useEffect(() => {
    setShowAlert(isSuccess ? isSuccess : isError)
  }, [isSuccess, isError])

  const onAlertClose = () => {
    setShowAlert(false)
  }

  return (
    <main className="UserManagement">
      <StageSection />
      <StageSubNavigation />
      <AppArea />
      <ActiveUserTable />
      <PageSnackbar
        contactLinks=""
        contactText=""
        description={
          isSuccess ? 'User added successfully' : 'User was not added'
        }
        open={showAlert}
        onCloseNotification={onAlertClose}
        severity={isSuccess ? 'success' : 'error'}
        showIcon
        title={isSuccess ? 'Success' : 'Error'}
        vertical={'bottom'}
        horizontal={'right'}
      />
    </main>
  )
}
