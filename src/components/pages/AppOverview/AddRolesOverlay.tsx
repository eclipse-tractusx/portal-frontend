/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  StaticTable,
  type TableType,
  Typography,
} from '@catena-x/portal-shared-components'
import { PAGES } from 'types/Constants'
import { Box, Grid } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import { ErrorType } from 'features/appManagement/types'
import { useState } from 'react'
import { useUpdateActiveAppMutation } from 'features/appManagement/apiSlice'
import { useNavigate } from 'react-router-dom'
import { error, success } from 'services/NotifyService'

interface AddRolesOverlayProps {
  openDialog: boolean
  handleOverlayClose: () => void
  appId: string
}
const AddRolesOverlay = ({
  openDialog = false,
  handleOverlayClose,
  appId,
}: AddRolesOverlayProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [rolesPreviews, setRolesPreviews] = useState<string[]>([])
  const [rolesDescription, setRolesDescription] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadCSVError, setUploadCSVError] = useState(false)
  const [updateActiveApp] = useUpdateActiveAppMutation()
  const defaultValues = {
    uploadAppRoles: '',
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const csvRolesPreview = (files: File[]) => {
    files
      .filter((file: File) => file.type === 'text/csv')
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onerror = () => {
          console.log('file reading has failed')
        }
        reader.onabort = () => {
          console.log('file reading was aborted')
        }
        reader.onload = () => {
          const str = reader.result
          if (!isString(str)) return
          const CSVCells = str
            ?.split('\n')
            .filter((item) => item !== '')
            .map((item) => item)

          if (
            CSVCells[0] === 'roles;description\r' ||
            CSVCells[0] === 'roles;description'
          ) {
            const roleDescription = str
              ?.split('\n')
              .filter((item) => item !== '')
              .map((item) => item.substring(item.indexOf(';') + 1))

            const roles = str
              ?.split('\n')
              .filter((item) => item !== '')
              .map((item) => item.substring(0, item.indexOf(';')))

            setRolesPreviews(roles?.splice(1))
            setRolesDescription(roleDescription?.splice(1))
            setUploadCSVError(false)
          } else {
            setRolesPreviews([])
            setRolesDescription([])
            setUploadCSVError(true)
          }
        }
        reader.readAsText(file)
      })
  }
  const tableData: TableType = {
    head: [t('content.addRoles.newRolesToAdd')],
    body: rolesPreviews?.map((item) => [item]),
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    const rolesDescriptionData = rolesPreviews.map((data, i) => [
      data,
      rolesDescription[i],
    ])

    const updatedData = {
      appId,
      body: rolesDescriptionData?.map((item) => ({
        role: item[0],
        descriptions: [
          {
            languageCode: 'en',
            description: item[1],
          },
          {
            languageCode: 'de',
            description: item[1],
          },
        ],
      })),
    }

    await updateActiveApp(updatedData)
      .unwrap()
      .then(() => {
        navigate(`/${PAGES.APPOVERVIEW}`, {
          state: 'add-roles-success',
        })
        success(t('content.addRoles.successMsg'))
      })
      .catch((err) => {
        setIsLoading(false)
        error(t('content.addRoles.errorMsg'), '', err)
      })
  }

  const handleClose = () => {
    handleOverlayClose()
    setRolesPreviews([])
    setRolesDescription([])
    setUploadCSVError(false)
  }

  return (
    <div className="detailsOverlay">
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: '60%',
        }}
      >
        <DialogHeader
          title={t('content.addRoles.uploadAdditionalRoles')}
          intro={t('content.addRoles.uploadAdditionalRolesDescription')}
          closeWithIcon={true}
          onCloseWithIcon={() => {
            handleClose()
          }}
        />
        <DialogContent
          sx={{
            padding: '0px 120px 40px 120px',
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ mr: 2, mt: '5px', mb: 5, textAlign: 'center' }}
          >
            <a
              href="../../app-provider-role-upload-example.csv"
              style={{ textDecoration: 'none' }}
              download
            >
              <Button
                variant="outlined"
                endIcon={<FileDownloadOutlinedIcon />}
                sx={{ fontSize: '16px' }}
                size="small"
              >
                {t('content.apprelease.technicalIntegration.template')}
              </Button>
            </a>
            <Button
              sx={{ ml: 2, fontSize: '16px' }}
              color="secondary"
              size="small"
              variant="contained"
              onClick={() =>
                window.open(
                  '/documentation/?path=docs%2F04.+App%28s%29%2FRelease-Process%2FApp+Release+Workflow.md',
                  '_blank',
                  'noopener'
                )
              }
            >
              {t('content.apprelease.technicalIntegration.getHelp')}
            </Button>
          </Grid>
          <Controller
            control={control}
            name={'uploadAppRoles'}
            render={({ field: { onChange: reactHookFormOnChange } }) => (
              <Dropzone
                onChange={(files, addedFiles, deletedFiles) => {
                  if (deletedFiles?.length) {
                    setRolesDescription([])
                    setRolesPreviews([])
                  }
                  reactHookFormOnChange(files[0]?.name)
                  trigger('uploadAppRoles')
                  csvRolesPreview(files)
                }}
                acceptFormat={{ 'text/csv': ['.csv'] }}
                maxFilesToUpload={1}
                enableDeleteOverlay={false}
              />
            )}
          />
          {uploadCSVError && (
            <Typography variant="body2" className="file-error-msg">
              {t(
                'content.apprelease.technicalIntegration.incorrectCSVFileFormat'
              )}
            </Typography>
          )}
          {errors?.uploadAppRoles?.type === ErrorType.REQUIRED && (
            <Typography variant="body2" className="file-error-msg">
              {t('content.apprelease.appReleaseForm.fileUploadIsMandatory')}
            </Typography>
          )}

          {rolesPreviews?.length > 0 && (
            <Box sx={{ width: '80%', margin: '40px auto 0' }}>
              <StaticTable data={tableData} horizontal={false} />
            </Box>
          )}
          <Typography align="center" variant="body2" sx={{ mt: 5, mb: 2 }}>
            {t('content.addRoles.confirmButtonDescription')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose()
            }}
          >
            {t('global.actions.cancel')}
          </Button>

          {isLoading ? (
            <LoadingButton
              size="small"
              variant="contained"
              onButtonClick={() => {
                // do nothing
              }}
              loading={isLoading}
              label={`${t('global.actions.confirm')}`}
              loadIndicator="Loading..."
              sx={{ ml: 3 }}
            />
          ) : (
            <Button
              variant="contained"
              onClick={() => handleConfirm()}
              disabled={rolesPreviews?.length <= 0}
            >
              {t('global.actions.confirm')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddRolesOverlay
