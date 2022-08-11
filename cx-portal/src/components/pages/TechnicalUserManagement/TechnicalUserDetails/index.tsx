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

import { Button, PageNotificationsProps } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { TechnicalUserDetailsGrid } from './TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { RemoveTechnicalUserOverlay } from './RemoveTechnicalUserOverlay'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from 'features/notification/actions'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useFetchServiceAccountDetailQuery } from 'features/admin/serviceApiSlice'
import { PAGES } from 'types/Constants'
import PageHeaderWithCrumbs from 'components/shared/frame/PageHeaderWithCrumbs'

export default function TechnicalUserDetails() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { userId } = useParams()
  const { data } = useFetchServiceAccountDetailQuery(userId ?? '')
  const [open, setOpen] = useState(false)

  const openAddTechnicalUserOverlay = () => {
    setOpen(true)
  }
  const closeAddTechnicalUserOverlay = () => {
    setOpen(false)
  }

  const deleteUserIsSuccess = () => {
    // Add delete user logic:
    // If delete is success then show notification:
    const notification: PageNotificationsProps = {
      open: true,
      severity: 'success',
      title:
        'content.usermanagement.technicalUser.confirmDeleteNotificationTitle',
      description:
        'content.usermanagement.technicalUser.confirmDeleteNotificationDescription',
    }

    dispatch(setNotification(notification))
  }

  const removeTechnicalUser = () => {
    console.log('TODO: Remove technical user function!')
    openAddTechnicalUserOverlay()
  }

  return (
    <main className="technical-user-details">
      {data && (
        <>
          <RemoveTechnicalUserOverlay
            serviceaccount={data}
            dialogOpen={open}
            handleClose={closeAddTechnicalUserOverlay}
            deleteUser={deleteUserIsSuccess}
          />

          <PageHeaderWithCrumbs
            crumbs={[
              PAGES.USER_MANAGEMENT,
              PAGES.TECHUSER_MANAGEMENT,
              PAGES.TECHUSER_DETAILS,
            ]}
          />

          <section>
            <Button
              size="small"
              variant="outlined"
              startIcon={<HighlightOffIcon />}
              onClick={removeTechnicalUser}
            >
              {t('content.usermanagement.technicalUser.delete')}
            </Button>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '130px',
                marginBottom: '92px',
                width: '100%',
              }}
            >
              <TechnicalUserDetailsGrid
                items={['Client ID', 'Auth Type', 'Client Secret']}
                title={t(
                  'content.usermanagement.technicalUser.detailsPage.userDetails'
                )}
              />

              <TechnicalUserDetailsGrid
                items={[
                  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat',
                ]}
                title={t(
                  'content.usermanagement.technicalUser.detailsPage.description'
                )}
              />

              <TechnicalUserDetailsGrid
                items={['Organisation name', 'User Name', 'admin@gmail.com']}
                title={t(
                  'content.usermanagement.technicalUser.detailsPage.spoc'
                )}
              />

              <TechnicalUserDetailsGrid
                items={[
                  'load registry data',
                  'view registry data',
                  'access_xy',
                ]}
                title={t(
                  'content.usermanagement.technicalUser.detailsPage.permission'
                )}
              />
            </Box>
          </section>
        </>
      )}
    </main>
  )
}
