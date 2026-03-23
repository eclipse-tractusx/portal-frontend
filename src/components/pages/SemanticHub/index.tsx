/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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
  Button,
  PageHeader2,
  PageSnackbar,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import ModelDetailDialog from './ModelDetailDialog'
import ModelTable from './ModelTable'
import { useDeleteModelByIdMutation } from 'features/semanticModels/apiSlice'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModelImportDialog from './ModelImportDialog'
import { ROLES } from 'types/Constants'
import { useNavigate, useParams } from 'react-router-dom'
import { getAssetBase } from 'services/EnvironmentService'
import { userHasSemanticHubRole } from 'services/AccessService'
import { useSelector } from 'react-redux'
import { semanticModelsSelector } from 'features/semanticModels/slice'

export default function SemanticHub() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { modelId } = useParams()
  const [showModel, setShowModel] = useState<boolean>(false)
  const [importModel, setImportModel] = useState<boolean>(false)
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)
  const [errorAlertMsg, setErrorAlertMsg] = useState<string>('')
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [successAlertMsg, setSuccessAlertMsg] = useState<string>('')

  const { uploadedModel, uploadError } = useSelector(semanticModelsSelector)
  const [deleteModelById, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteModelByIdMutation()

  const resetMessages = () => {
    setShowErrorAlert(false)
    setShowSuccessAlert(false)
  }

  useEffect(() => {
    if (modelId) {
      resetMessages()
      setShowModel(true)
    }
  }, [modelId])

  useEffect(() => {
    if (uploadError.length > 0) {
      setErrorAlertMsg(uploadError)
      setShowErrorAlert(true)
    }
  }, [uploadError])

  useEffect(() => {
    if (deleteError) {
      if ('status' in deleteError && deleteError.status) {
        const errorMessage =
          deleteError.data && typeof deleteError.data === 'string'
            ? deleteError.data
            : 'An error occurred'
        setErrorAlertMsg(errorMessage)
        setShowErrorAlert(true)
      } else if ('message' in deleteError && deleteError.message) {
        setErrorAlertMsg(deleteError.message)
        setShowErrorAlert(true)
      }
    }
  }, [deleteError])

  useEffect(() => {
    if (deleteModelById.length > 0 && deleteSuccess) {
      setShowModel(false)
      setSuccessAlertMsg(t('content.semantichub.alerts.deleteSuccess'))
      setShowSuccessAlert(true)
    }
  }, [deleteSuccess, t])

  useEffect(() => {
    if (uploadedModel) {
      setShowModel(false)
      setSuccessAlertMsg(t('content.semantichub.alerts.uploadSuccess'))
      setShowSuccessAlert(true)
    }
  }, [uploadedModel])

  const onErrorAlertClose = () => {
    setShowErrorAlert(false)
    setErrorAlertMsg('')
  }

  const onSuccessAlertClose = () => {
    setShowSuccessAlert(false)
    setSuccessAlertMsg('')
  }

  const onModelSelect = (urn: string) => {
    navigate(`/semantichub/${encodeURIComponent(urn)}`)
  }

  const onDetailClose = () => {
    navigate('/semantichub/')
    setShowModel(false)
    resetMessages()
  }

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          '& .cx-main-header__content': {
            paddingTop: '0px !important',
          },
        }}
      >
        <PageHeader2
          headerHeight={200}
          topPage={true}
          title={t('content.semantichub.title')}
        />
      </Box>
      <main className="semantic-models">
        <section>
          <Grid container justifyContent="space-between">
            <Grid item xs={5}>
              <Typography variant="body2" mb={2}>
                {t('content.semantichub.introText_0')}
              </Typography>
              <Typography variant="body2" mb={4}>
                {t('content.semantichub.introText_1')}
              </Typography>
              {userHasSemanticHubRole(ROLES.SEMANTICHUB_ADD) && (
                <Button
                  onClick={() => {
                    setImportModel(true)
                  }}
                  startIcon={<AddCircleOutlineIcon fontSize="large" />}
                >
                  {t('content.semantichub.addModel')}
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              <img
                style={{
                  marginTop: '-50%',
                  border: '16px solid white',
                  display: 'block',
                  position: 'relative',
                }}
                src={`${getAssetBase()}/images/content/teaser.png`}
                width="100%"
                alt={'alt tag info'}
              />
            </Grid>
          </Grid>
        </section>
        <ModelTable onModelSelect={onModelSelect} />
      </main>
      <ModelDetailDialog show={showModel} onClose={onDetailClose} />
      <ModelImportDialog
        show={importModel}
        onClose={() => {
          setImportModel(false)
        }}
      />
      <PageSnackbar
        open={showErrorAlert}
        onCloseNotification={onErrorAlertClose}
        severity="error"
        title={t('content.semantichub.alerts.alertErrorTitle')}
        description={errorAlertMsg}
        showIcon={true}
      />
      <PageSnackbar
        open={showSuccessAlert}
        onCloseNotification={onSuccessAlertClose}
        severity="success"
        title={t('content.semantichub.alerts.alertSuccessTitle')}
        description={successAlertMsg}
        showIcon={true}
      />
    </>
  )
}
