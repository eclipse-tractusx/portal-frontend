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
import { closeOverlay, show } from 'features/control/overlay'
import './style.scss'
import {
  useFetchDocumentQuery,
  useFetchCompanyCertificateQuery,
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
import { OVERLAYS } from 'types/Constants'
import dayjs from 'dayjs'
import LoadingProgress from 'components/shared/basic/LoadingProgress'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'

export enum StatusTag {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  COMPLETED = 'completed',
}

export default function CompanyCertificateDetails({
  id,
}: {
  readonly id: string
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const close = () => {
    dispatch(closeOverlay())
  }
  const { data: document } = useFetchDocumentQuery(id)
  const { data: companyDetails, isFetching } = useFetchOwnCompanyDetailsQuery()
  const { data } = useFetchCompanyCertificateQuery(companyDetails?.bpn ?? '')

  const companyData = data?.filter((cert) => cert.documentId === id)
  const selected = companyData?.[0]
  const [pdf, setPdf] = useState<string>()

  useEffect(() => {
    if (document) {
      const file = document.data
      const fileURL = URL.createObjectURL(file)
      setPdf(fileURL)
    }
  }, [document])

  const flag = selected?.companyCertificateStatus === StatusTag.PENDING

  const getButtonStatusTag = (statusId: string) => {
    if (statusId === ProgressStatus.IN_PROGRESS) {
      return 'label'
    } else {
      return 'confirmed'
    }
  }

  const getButtonStatusId = () => {
    if (selected?.companyCertificateStatus === StatusTag.PENDING) {
      return ProgressStatus.IN_PROGRESS
    } else {
      return ProgressStatus.DONE
    }
  }

  const statusId = getButtonStatusId()

  const button: ProgressButtonsType = {
    statusId,
    typeId: '',
    backgroundColor: flag ? '#EAF1FE' : '#F5F9EE',
    icon: flag ? (
      <PendingActionsIcon
        style={{
          color: '#0F71CB',
          height: '20px',
          width: '20px',
        }}
      />
    ) : (
      <CheckCircleOutlineIcon
        style={{
          color: '#00AA55',
          height: '30px',
          width: '20px',
        }}
      />
    ),
    label: flag
      ? t('content.companyCertificate.details.fileUpload')
      : t('content.companyCertificate.details.verification'),
    statusTag: getButtonStatusTag(
      flag ? ProgressStatus.IN_PROGRESS : ProgressStatus.DONE
    ),
    statusLabel: flag ? StatusTag.PENDING : StatusTag.COMPLETED,
  }

  const showLoader = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 0px',
        }}
      >
        <LoadingProgress />
      </Box>
    )
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
      {!isFetching && selected ? (
        <DialogContent>
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
                  {dayjs(selected.validTill).format('YYYY-MM-DD')}
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
                  onClick={() => {
                    dispatch(closeOverlay())
                    dispatch(
                      show(
                        OVERLAYS.COMPANY_CERTIFICATE_CONFIRM_DELETE,
                        id,
                        selected.companyCertificateType
                      )
                    )
                  }}
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
            {pdf ? (
              <iframe
                title="certificate document"
                src={pdf}
                width="100%"
                height="500px"
              />
            ) : (
              showLoader()
            )}
          </Box>
        </DialogContent>
      ) : (
        showLoader()
      )}

      <DialogActions>
        <Button variant="outlined" onClick={close}>
          {t('global.actions.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
