/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@catena-x/portal-shared-components'
import { closeOverlay } from 'features/control/overlay'
import './style.scss'
import { setOverlayCancel } from 'features/companyRoles/slice'
import {
  type ComapnyCertificateData,
  useFetchCertificatesQuery,
  useFetchDocumentQuery,
} from 'features/companyCertification/companyCertificateApiSlice'
import { Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ProgressVerificationButton } from 'components/shared/basic/ProgressVerificationButton'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import {
  type ProgressButtonsType,
  ProgressStatus,
} from 'features/admin/applicationRequestApiSlice'
import { useEffect, useState } from 'react'

export enum StatusTag {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  COMPLETED = 'completed',
}

export default function CompanyCertificateDetails({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const close = () => {
    dispatch(setOverlayCancel(true))
    dispatch(closeOverlay())
  }

  const { data } = useFetchCertificatesQuery()
  const { data: document } = useFetchDocumentQuery(id ?? '')

  const companyData = data?.content.filter((cert) => cert.documentId === id)
  const [selected, setSelected] = useState<ComapnyCertificateData>()
  const [pdf, setPdf] = useState<string>()

  if (companyData && companyData?.length > 0) {
    setSelected(companyData[0])
  }

  useEffect(() => {
    //set file here
    setPdf('')
  }, [document])

  const flag = selected?.companyCertificateStatus === StatusTag.PENDING

  const getButtonStatusTag = (statusId: string) => {
    switch (statusId) {
      case ProgressStatus.IN_PROGRESS:
        return 'label'
      default:
        return 'confirmed'
    }
  }

  const getButtonStatusId = () => {
    switch (selected?.companyCertificateStatus) {
      case StatusTag.PENDING:
        return ProgressStatus.IN_PROGRESS
      default:
        return ProgressStatus.DONE
    }
  }

  const statusId = getButtonStatusId()

  const button: ProgressButtonsType = {
    statusId,
    typeId: '',
    backgroundColor: flag ? '#F5F9EE' : '#EAF1FE',
    icon: flag ? (
      <CheckCircleOutlineIcon
        style={{
          color: '#00AA55',
          height: '30px',
          width: '20px',
        }}
      />
    ) : (
      <PendingActionsIcon
        style={{
          color: '#0F71CB',
          height: '20px',
          width: '20px',
        }}
      />
    ),
    label: flag
      ? t('content.companyCertificate.details.fileUpload')
      : t('content.companyCertificate.details.verification'),
    statusTag: getButtonStatusTag(
      flag ? ProgressStatus.DONE : ProgressStatus.IN_PROGRESS
    ),
    statusLabel: flag ? StatusTag.COMPLETED : StatusTag.PENDING,
  }

  return (
    <Dialog
      open={true}
      additionalModalRootStyles={{
        '.MuiPaper-root': {
          maxWidth: '60% !important',
        },
      }}
    >
      <DialogContent>
        {selected ? (
          <>
            <Box className="box-container">
              <Box className="header-container">
                <Box className="flex-container">
                  <Typography variant="label3">
                    {t('content.companyCertificate.details.type')} :{' '}
                    {selected.companyCertificateType}
                  </Typography>
                  <Typography variant="h5">{selected.documentId}</Typography>
                  <Typography variant="label4">
                    {t('content.companyCertificate.details.validtill')} :{' '}
                    {selected.validTill}
                  </Typography>
                  <Typography variant="label4">
                    {t('content.companyCertificate.details.status')} :{' '}
                    {selected.companyCertificateStatus}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    size="small"
                    onClick={close}
                  >
                    {t('content.companyCertificate.details.deletebutton')}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="iframe-container">
              <Box className="verification-container">
                <ProgressVerificationButton {...button} />
              </Box>
              {pdf && <iframe src={pdf} width="100%" height="500px" />}
            </Box>
          </>
        ) : (
          <Typography variant="body1">
            {t('content.companyCertificate.noData')}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          {t('global.actions.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
