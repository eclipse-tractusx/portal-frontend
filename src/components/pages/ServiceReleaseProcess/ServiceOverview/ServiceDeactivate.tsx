/********************************************************************************
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

import {
  Typography,
  PageHeader2,
  Card,
  Checkbox,
  Button,
  Tooltips,
  LoadingButton,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useState } from 'react'
import {
  type ProvidedServiceType,
  ServiceDeactivateEnum,
  useDeactivateServiceMutation,
} from 'features/serviceManagement/apiSlice'
import { PAGES } from 'types/Constants'
import { getApiBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'

export default function ServiceDeactivate() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const serviceId = useParams().serviceId
  const [checked, setChecked] = useState(false)
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const items = state
  const service = items?.filter(
    (item: ProvidedServiceType) => item.id === serviceId
  )
  const [deactivateService] = useDeactivateServiceMutation()
  const leadImageId = service?.[0]?.leadPictureId

  const handleSaveClick = async () => {
    setIsLoading(true)
    await deactivateService(service[0].id)
      .unwrap()
      .then(() => {
        navigate(`/${PAGES.SERVICE_OVERVIEW}`, {
          state: ServiceDeactivateEnum.SERVICE_DEACTIVATE_SUCCESS,
        })
      })
      .catch(() => {
        navigate(`/${PAGES.SERVICE_OVERVIEW}`, {
          state: ServiceDeactivateEnum.SERVICE_DEACTIVATE_ERROR,
        })
      })
  }

  return (
    <main className="deactivate-main">
      <PageHeader2
        title={service?.[0]?.title}
        topPage={true}
        headerHeight={200}
      />
      <section>
        <Typography variant="body2" mb={3} align="center">
          {service?.[0]?.title}
        </Typography>
        <Typography variant="h2" mb={3} align="center">
          {t('serviceOverview.serviceDeactivate.headerTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('serviceOverview.serviceDeactivate.description')}
        </Typography>
      </section>
      <div className="mainContainer">
        <div className="mainRow">
          {service && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Card
                  image={{
                    src: `${getApiBase()}/api/administration/documents/${leadImageId}`,
                  }}
                  title={service[0]?.title || ''}
                  subtitle={service[0]?.provider}
                  variant="minimal"
                  expandOnHover={false}
                  buttonText={''}
                  imageShape="round"
                  imageLoader={fetchImageWithToken}
                  filledBackground={false}
                  imageSize="small"
                />
              </Box>
              <Box sx={{ marginTop: '10%' }}>
                <Checkbox
                  label={`${t(
                    'serviceOverview.serviceDeactivate.checkboxLabel'
                  )}`}
                  onChange={(e) => {
                    e.target.checked ? setChecked(true) : setChecked(false)
                  }}
                  key={service[0].id}
                  className="checkbox-input"
                />
              </Box>
            </Box>
          )}
        </div>
      </div>
      <section>
        <hr style={{ border: 0, borderTop: '1px solid #DCDCDC' }} />
        <Box sx={{ position: 'relative', marginTop: '30px' }}>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              navigate('/serviceOverview')
            }}
          >
            {t('global.actions.cancel')}
          </Button>
          <Tooltips
            tooltipPlacement="bottom-start"
            tooltipText={
              !checked
                ? t('serviceOverview.serviceDeactivate.checkboxErrorMsg')
                : ''
            }
            children={
              <span style={{ position: 'absolute', right: '10px' }}>
                {isLoading ? (
                  <LoadingButton
                    loading={isLoading}
                    loadIndicator="Loading..."
                    variant="contained"
                    size="small"
                    onButtonClick={() => {
                      // do nothing
                    }}
                    label={`${t('global.actions.confirm')}`}
                  />
                ) : (
                  <Button
                    size="small"
                    onClick={handleSaveClick}
                    variant="contained"
                    disabled={!checked}
                  >
                    {t('global.actions.save')}
                  </Button>
                )}
              </span>
            }
          />
        </Box>
      </section>
    </main>
  )
}
