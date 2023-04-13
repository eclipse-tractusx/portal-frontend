/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
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

/* eslint-disable react-hooks/exhaustive-deps */
import StageHeader from 'components/shared/frame/StageHeader'
import { Button, PageSnackbar, Typography } from 'cx-portal-shared-components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import ModelDetailDialog from './ModelDetailDialog'
import ModelTable from './ModelTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSemanticModelById } from 'features/semanticModels/actions'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModelImportDialog from './ModelImportDialog'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import UserService from 'services/UserService'
import { ROLES } from 'types/Constants'
import { useNavigate, useParams } from 'react-router-dom'
import { getAssetBase } from 'services/EnvironmentService'

export default function SemanticHub() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { modelId } = useParams()
  const [showModel, setShowModel] = useState<boolean>(false)
  const [importModel, setImportModel] = useState<boolean>(false)
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)
  const [errorAlertMsg, setErrorAlertMsg] = useState<string>('')
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [successAlertMsg, setSuccessAlertMsg] = useState<string>('')
  const { deleteError, deleteModelId, uploadedModel, uploadError } =
    useSelector(semanticModelsSelector)

  useEffect(() => {
    if (deleteError.length > 0) {
      setErrorAlertMsg(deleteError)
      setShowErrorAlert(true)
    }
  }, [deleteError])

  const resetMessages = () => {
    setShowErrorAlert(false)
    setShowSuccessAlert(false)
  }

  useEffect(() => {
    if (modelId) {
      resetMessages()
      setShowModel(true)
      const encodedUrn = encodeURIComponent(modelId)
      dispatch(fetchSemanticModelById(encodedUrn))
    }
  }, [modelId])

  useEffect(() => {
    if (uploadError.length > 0) {
      setErrorAlertMsg(uploadError)
      setShowErrorAlert(true)
    }
  }, [uploadError])

  useEffect(() => {
    if (deleteModelId.length > 0) {
      setShowModel(false)
      setSuccessAlertMsg(t('content.semantichub.alerts.deleteSuccess'))
      setShowSuccessAlert(true)
    }
  }, [deleteModelId])

  useEffect(() => {
    if (uploadedModel !== null) {
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
      <StageHeader title={t('content.semantichub.title')} />
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
              {UserService.hasRole(ROLES.SEMANTICHUB_ADD) && (
                <Button
                  onClick={() => setImportModel(true)}
                  startIcon={<AddCircleOutlineIcon fontSize="large" />}
                >
                  {t('content.semantichub.addModel')}
                </Button>
              )}
            </Grid>
            <Grid item xs={4}>
              <img
                style={{ marginTop: '-200px', border: '16px solid white' }}
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
        onClose={() => setImportModel(false)}
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
