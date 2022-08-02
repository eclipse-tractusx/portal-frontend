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

import './TechnicalUserManagement.scss'
import {
  AddTechnicalUserOverlay,
  DefaultFormFieldValuesType,
} from './AddTechnicalUserOverlay'
import { AddTechnicalUserResponseOverlay } from './AddTechnicalUserResponseOverlay'
import { ContentTechnicalUser } from './ContentTechnicalUser'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { PageHeader } from 'cx-portal-shared-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'

export default function TechnicalUserManagement() {
  const [open, setOpen] = useState(false)
  const [openResponse, setOpenResponse] = useState(false)
  const { t } = useTranslation()

  const openAddTechnicalUserOverlay = () => {
    setOpen(true)
  }

  const closeAddTechnicalUserOverlay = () => {
    setOpen(false)
  }

  const openAddTechnicalUserResponseOverlay = () => {
    setOpen(false)
    setOpenResponse(true)
  }

  const closeAddTechnicalUserResponseOverlay = () => {
    setOpenResponse(false)
  }

  const handleAddTechnicalUserConfirm = (
    formValues: DefaultFormFieldValuesType
  ) => {
    openAddTechnicalUserResponseOverlay()

    console.log('Form data: ', formValues)

    // TODO: use above formValues for API call/Redux
    // dispatch(
    //     addItem({
    //       name: `testaccount-${Date.now()}`,
    //       description: 'another test account',
    //       authenticationType: 'SECRET',
    //     })
    //   )
  }

  return (
    <main className="technical-user-management">
      <AddTechnicalUserOverlay
        dialogOpen={open}
        handleClose={closeAddTechnicalUserOverlay}
        handleConfirm={handleAddTechnicalUserConfirm}
      />
      <AddTechnicalUserResponseOverlay
        dialogOpen={openResponse}
        onCloseWithIcon={closeAddTechnicalUserResponseOverlay}
      />
      <PageHeader
        title={t('content.usermanagement.technicalUser.headline', {
          company: UserService.getCompany(),
        })}
        topPage={true}
        headerHeight={314}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <ContentTechnicalUser
        openAddTechnicalUserOverlay={openAddTechnicalUserOverlay}
      />
    </main>
  )
}
