/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  Typography,
  PageHeader,
  Button,
  Tooltips,
  LoadingButton,
  IconButton,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import { useState } from 'react'
import type { DocumentData } from 'features/appManagement/apiSlice'
import { useFetchAppDocumentsQuery } from 'features/appManagement/apiSlice'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

enum DocumentNameType {
  APP_IMAGE = 'App Image',
  APP_TECHNICAL_INFORMATION = 'App Technical Information',
  APP_CONTRACT = 'App Contract',
  ADDITIONAL_DETAILS = 'Additional Details',
}

export default function ChangeDocuments() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items: any = state
  const app = items?.filter((item: any) => item.id === appId)
  const [imageChanged, setImageChanged] = useState(false)
  const { data } = useFetchAppDocumentsQuery(appId ?? '')

  const handleSaveClick = async () => {
    setIsLoading(true)
    setImageChanged(true)
  }

  const renderdocs = (doctype: string, documents: DocumentData[]) => {
    return (
      <div>
        <Box width={500} margin={'0 auto'} justifyContent="center">
          <Typography
            variant="label3"
            sx={{ color: '#1977cc', display: 'flex', marginTop: '28px' }}
          >
            <ArrowForwardIcon fontSize="small" sx={{ mr: 1 }} /> {doctype}
          </Typography>
          <Box sx={{ mb: '20px', mt: '10px' }}>
            {documents?.map((doc: DocumentData) => {
              return (
                <div key={doc.documentId}>
                  <Typography variant="label4" sx={{ ml: '28px' }}>
                    {doc.documentName}
                  </Typography>
                  <IconButton
                    disabled
                    sx={{ height: '18px', width: '18px', float: 'right' }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </div>
              )
            })}
          </Box>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleSaveClick}
            sx={{ fontSize: '12px' }}
          >
            {t('content.changeDocuments.uploadNewDocument')}
          </Button>
          {doctype !== DocumentNameType.ADDITIONAL_DETAILS && (
            <Divider sx={{ margin: '34px auto' }} />
          )}
        </Box>
      </div>
    )
  }

  return (
    <main className="deactivate-main">
      <PageHeader title={app?.[0]?.title} topPage={true} headerHeight={200}>
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>

      <section>
        <Typography mb={3} align="center" variant="body2">
          {app?.[0]?.title}
        </Typography>

        <Typography align="center" mb={3} variant="h2">
          {t('content.changeDocuments.headerTitle')}
        </Typography>

        <Typography variant="body2" align="center">
          {t('content.changeDocuments.description')}
        </Typography>
      </section>
      <section>
        <div className="main-container">
          <div className="main-row">
            {data?.documents && (
              <>
                {renderdocs(
                  DocumentNameType.APP_IMAGE,
                  data.documents.APP_IMAGE
                )}
                {renderdocs(
                  DocumentNameType.APP_TECHNICAL_INFORMATION,
                  data.documents.APP_TECHNICAL_INFORMATION
                )}
                {renderdocs(
                  DocumentNameType.APP_CONTRACT,
                  data.documents.APP_CONTRACT
                )}
                {renderdocs(
                  DocumentNameType.ADDITIONAL_DETAILS,
                  data.documents.ADDITIONAL_DETAILS
                )}
              </>
            )}
          </div>
        </div>
        <hr
          style={{
            border: 0,
            borderTop: '1px solid #DCDCDC',
            marginTop: '80px',
          }}
        />
        <Box sx={{ position: 'relative', marginTop: '30px' }}>
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              navigate('/appoverview')
            }}
          >
            {t('global.actions.cancel')}
          </Button>
          <Tooltips
            tooltipPlacement="bottom-start"
            tooltipText={
              !imageChanged ? t('content.changeDocuments.saveTooltipMsg') : ''
            }
            children={
              <span style={{ position: 'absolute', right: '10px' }}>
                {isLoading ? (
                  <LoadingButton
                    size="small"
                    loading={isLoading}
                    variant="contained"
                    onButtonClick={() => {}}
                    loadIndicator="Loading..."
                    label={`${t('global.actions.confirm')}`}
                  />
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!imageChanged}
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
