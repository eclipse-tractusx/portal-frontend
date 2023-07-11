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

import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  DropAreaProps,
  Typography,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { fetchAny } from 'features/admin/userOwn/actions'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Dialog } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import { OVERLAYS } from 'types/Constants'
import { closeOverlay, show } from 'features/control/overlay'
import { store } from 'features/store'
import { Dropzone } from '../../shared/basic/Dropzone'
import './style.scss'

export default function UpdateCertificate({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [submitClicked, setSubmitClicked] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchAny(id))
  }, [dispatch, id])

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  const handleSubmit = () => {
    setSubmitClicked(true)
  }

  return (
    <>
      {submitClicked ? (
        <Dialog open={true} maxWidth="md">
          <DialogHeader
            {...{
              title: t('content.certificates.successCertificate.title'),
              intro: '',
              closeWithIcon: true,
              onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
            }}
          />

          <DialogContent>
            <div className="success-certificate">
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#f5f9ee',
                  padding: '5px 20px',
                  marginBottom: '10px',
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: '#00aa55',
                    margin: '2px 20px 0 0',
                  }}
                />
                <Typography
                  variant="body3"
                  sx={{
                    lineHeight: '20px',
                    height: '18px',
                    margin: '2px 0',
                  }}
                >
                  {t('content.certificates.successCertificate.fileUpload')}
                </Typography>
                <Chip
                  color="success"
                  variant="filled"
                  label={t('content.certificates.successCertificate.completed')}
                  size="small"
                  withIcon={false}
                  sx={{
                    marginRight: '0 !important',
                    margin: '0 auto',
                  }}
                />
              </Box>
              <Typography variant="h5" className="nextStep">
                {t('content.certificates.successCertificate.nextSteps')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#fff7ec',
                  padding: '5px 20px',
                  marginBottom: '10px',
                }}
              >
                <PendingOutlinedIcon
                  sx={{
                    color: '#b18258',
                    margin: '2px 20px 0 0',
                  }}
                />
                <Typography
                  variant="body3"
                  sx={{
                    lineHeight: '20px',
                    height: '18px',
                    margin: '2px 0',
                  }}
                >
                  {t('content.certificates.successCertificate.verification')}
                </Typography>
                <Chip
                  color="warning"
                  variant="filled"
                  label={t('content.certificates.successCertificate.pending')}
                  size="small"
                  withIcon={false}
                  sx={{
                    marginRight: '0 !important',
                    margin: '0 auto',
                  }}
                />
              </Box>
              <Typography variant="caption3" className="queryDescription">
                {t('content.certificates.successCertificate.queryDescription')}
              </Typography>
              <Typography
                variant="caption3"
                sx={{
                  lineHeight: '20px',
                  margin: '2px 0',
                }}
              >
                {t('content.certificates.successCertificate.email')}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.cancel')}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <>
          <DialogHeader
            {...{
              title: t('content.certificates.updateCertificate.title'),
              intro: t('content.certificates.updateCertificate.description'),
              closeWithIcon: true,
              onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
            }}
          />

          <DialogContent>
            <div className="update-certificate">
              <Typography variant="h4" className="uploadDocumentTitle">
                {t(
                  'content.certificates.updateCertificate.uploadDocumentTitle'
                )}
              </Typography>
              <Dropzone
                acceptFormat={{ 'application/pdf': [] }}
                maxFilesToUpload={1}
                onChange={([file]) => {
                  setUploadedFile(file)
                }}
                errorText={'helperText'}
                DropStatusHeader={false}
                DropArea={renderDropArea}
              />
              <div className="note">
                <Typography variant="label2">
                  {t('content.certificates.updateCertificate.note')}
                </Typography>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={uploadedFile === undefined}
            >
              {t('global.actions.submit')}
            </Button>
          </DialogActions>
        </>
      )}
    </>
  )
}
