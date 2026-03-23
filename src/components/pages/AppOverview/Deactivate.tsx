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

import {
  Typography,
  PageHeader,
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
import { useDeactivateAppMutation } from 'features/apps/apiSlice'
import { getApiBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'
import type { ItemType } from './AddRoles'

export default function Deactivate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items = state
  const app = items?.filter((item: ItemType) => item.id === appId)
  const [deactivateApp] = useDeactivateAppMutation()
  const leadImageId = app?.[0]?.leadPictureId

  const handleSaveClick = async () => {
    setIsLoading(true)
    await deactivateApp(app[0].id)
      .unwrap()
      .then(() => {
        navigate('/appOverview', {
          state: 'deactivate-success',
        })
      })
      .catch(() => {
        navigate('/appOverview', {
          state: 'deactivate-error',
        })
      })
  }

  return (
    <main className="deactivate-main">
      <PageHeader title={app?.[0]?.title} topPage={true} headerHeight={200} />
      <section>
        <Typography variant="body2" mb={3} align="center">
          {app?.[0]?.title}
        </Typography>
        <Typography variant="h2" mb={3} align="center">
          {t('content.deactivate.headerTitle')}
        </Typography>
        <Typography variant="body2" align="center">
          {t('content.deactivate.description')}
        </Typography>
      </section>
      <div className="mainContainer">
        <div className="mainRow">
          {app && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Card
                  image={{
                    src: `${getApiBase()}/api/apps/${
                      appId ?? ''
                    }/appDocuments/${leadImageId}`,
                  }}
                  title={app[0]?.title || ''}
                  subtitle={app[0]?.provider}
                  variant="minimal"
                  expandOnHover={false}
                  buttonText={''}
                  imageShape="round"
                  filledBackground={false}
                  imageSize="small"
                  imageLoader={fetchImageWithToken}
                />
              </Box>
              <Box sx={{ marginTop: '10%' }}>
                <Checkbox
                  label={`${t('content.deactivate.checkboxLabel')}`}
                  key={app[0].id}
                  onChange={(e) => {
                    e.target.checked ? setChecked(true) : setChecked(false)
                  }}
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
            color="secondary"
            size="small"
            onClick={() => {
              navigate('/appOverview')
            }}
          >
            {t('global.actions.cancel')}
          </Button>
          <Tooltips
            tooltipPlacement="bottom-start"
            tooltipText={
              !checked ? t('content.deactivate.checkboxErrorMsg') : ''
            }
            children={
              <span style={{ position: 'absolute', right: '10px' }}>
                {isLoading ? (
                  <LoadingButton
                    size="small"
                    loading={isLoading}
                    variant="contained"
                    onButtonClick={() => {
                      // do nothing
                    }}
                    loadIndicator="Loading..."
                    label={`${t('global.actions.confirm')}`}
                  />
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!checked}
                    onClick={handleSaveClick}
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
