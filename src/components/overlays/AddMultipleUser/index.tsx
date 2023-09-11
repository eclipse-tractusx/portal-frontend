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

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'features/store'
import { Typography } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  DropAreaProps,
  Checkbox,
  Alert,
  LoadingButton,
  TableType,
  StaticTable,
  CircleProgress,
} from '@catena-x/portal-shared-components'
import EditIcon from '@mui/icons-material/Edit'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { OVERLAYS, PAGES } from 'types/Constants'
import { show, closeOverlay } from 'features/control/overlay'
import { Dropzone } from '../../shared/basic/Dropzone'
import { rolesToAddSelector } from 'features/admin/userDeprecated/slice'
import {
  AppRole,
  useFetchCoreoffersRolesQuery,
} from 'features/admin/appuserApiSlice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'
import {
  MultipleUsersResponse,
  useAddMutipleUsersMutation,
} from 'features/appManagement/userManagementApiSlice'
import {
  useFetchIDPListQuery,
  IdentityProvider,
  IDPCategory,
} from 'features/admin/idpApiSlice'
import './AddMultipleUser.scss'
import Papa from 'papaparse'
import { AddUserDeny } from '../AddUser/AddUserDeny'

const HelpPageURL =
  '/documentation/?path=docs%2F03.+User+Management%2F01.+User+Account%2F04.+Create+new+user+account+%28bulk%29.md'

export default function AddMultipleUser() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const { t } = useTranslation()

  const roles = useSelector(rolesToAddSelector)

  const { data } = useFetchCoreoffersRolesQuery()
  const [addMutipleUsers] = useAddMutipleUsersMutation()
  const { data: idpsData, isFetching } = useFetchIDPListQuery()

  const [loading, setLoading] = useState(false)
  const [allRoles, setAllRoles] = useState<any>([])
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false)
  const [totalRowsInCSV, setTotalRowsInCSV] = useState<any>(0)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>('')
  const [idps, setIdps] = useState<IdentityProvider[]>([])
  const [uploadAPIRResponse, setUploadAPIRResponse] =
    useState<MultipleUsersResponse>()
  const [tableErrorData, setTableErrorData] = useState<TableType>()

  useEffect(() => {
    const rolesArray: AppRole[] = []
    data?.map((a) => rolesArray.push(...a.roles))
    setAllRoles(rolesArray)
    dispatch(setRolesToAdd([]))
  }, [data, dispatch])

  useEffect(
    () =>
      setIdps(
        idpsData ? idpsData.filter((idp: IdentityProvider) => idp.enabled) : []
      ),
    [idpsData]
  )

  useEffect(() => {
    uploadAPIRResponse &&
      setTableErrorData({
        head: [''],
        body: [uploadAPIRResponse.errors],
      })
  }, [uploadAPIRResponse])

  const handleSelectRole = (role: string, select: boolean) => {
    const isSelected = roles.includes(role)
    if (!isSelected && select) {
      dispatch(setRolesToAdd([...roles, role]))
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      dispatch(setRolesToAdd([...oldRoles]))
    }
  }

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="normal" />
  }

  const handleAddUserAPICall = async (csvData: any) => {
    try {
      if (uploadedFile) {
        let blob = new Blob([Papa.unparse(csvData)], { type: 'text/csv' })
        let file = new File([blob], uploadedFile.name, { type: 'text/csv' })
        const response = await addMutipleUsers({
          identityProviderId:
            idps[0].identityProviderCategoryId === IDPCategory.KEYCLOAK_SHARED
              ? ''
              : idps[0].identityProviderId,
          csvFile: file,
        }).unwrap()
        setLoading(false)
        setIsSuccess(true)
        setUploadAPIRResponse(response)
      }
    } catch (error: any) {
      setLoading(false)
      setIsError(error.data.errors.document[0])
      console.log(error)
    }
  }

  const handleConfirm = async () => {
    if (isSuccess || isError) dispatch(closeOverlay())
    if (uploadedFile && !roles.length) setIsFileUploaded(true)
    else if (uploadedFile && roles.length) {
      setLoading(true)
      uploadedFile &&
        Papa.parse(uploadedFile, {
          skipEmptyLines: true,
          complete: async (results) => {
            const csvData: any = results.data
            csvData[0].push('Roles')
            for (let i = 0; i < csvData.length; i++) {
              if (i !== 0) csvData[i].push(roles.toString())
            }
            handleAddUserAPICall(csvData)
          },
        })
    }
  }

  const onChangeFile = async (selectedFile: File) => {
    setUploadedFile(selectedFile)

    Papa.parse(selectedFile, {
      skipEmptyLines: true,
      complete: function (results) {
        const csvData: any = results.data
        setTotalRowsInCSV(csvData.length - 1)
      },
    })
  }

  const renderContent = () => {
    if (isError) {
      return (
        <div className="errorSection">
          <Typography variant="body1">
            {t('content.usermanagement.addMultipleUsers.error.note')}
          </Typography>
          <Typography variant="body1" className="mb-20">
            {t('content.usermanagement.addMultipleUsers.error.description')}
          </Typography>
          <Typography variant="label1">
            {t('content.usermanagement.addMultipleUsers.error.details')}
          </Typography>
          <Typography variant="label1" className="mb-20">
            {isError}
          </Typography>
        </div>
      )
    } else if (isSuccess) {
      return (
        <div className="successSection mb-20">
          <div className="uploadedDetailsSection mb-20">
            <div className="userDetailsMain">
              <div className="userSuccess">
                <Typography variant="body1" className="number">
                  {uploadAPIRResponse?.created}
                </Typography>
              </div>
              <Typography variant="body1" className="detailLabel">
                {t(
                  'content.usermanagement.addMultipleUsers.success.userUploaded'
                )}
              </Typography>
            </div>
            <div className="userDetailsMain">
              <div className="userError">
                <Typography variant="body1" className="number">
                  {uploadAPIRResponse?.error}
                </Typography>
              </div>
              <Typography variant="body1" className="detailLabel">
                {t(
                  'content.usermanagement.addMultipleUsers.success.userFailed'
                )}
              </Typography>
            </div>
          </div>
          <div className="mb-20">
            <Trans>
              <Typography variant="body1" className="errorUsersLabel">
                {t(
                  'content.usermanagement.addMultipleUsers.success.errorUsersLabel'
                )}
              </Typography>
            </Trans>
          </div>
          {tableErrorData && (
            <StaticTable data={tableErrorData} horizontal={true} />
          )}
        </div>
      )
    } else if (isFileUploaded) {
      return (
        <div className="uploadedFileMain">
          <Typography variant="h6" className="mb-20">
            {t(
              'content.usermanagement.addMultipleUsers.uploadedFile.fileHeading'
            )}
          </Typography>
          <div className="fileDetailsSection mb-20">
            <div className="documentMain">
              <div className="documentIcon">
                <ArticleOutlinedIcon className="icon" />
              </div>
              <Typography variant="body1" className="documentName">
                {uploadedFile?.name}
              </Typography>
            </div>
            <div className="documentMain">
              <div className="documentIcon">
                <Typography variant="body1" className="number">
                  {totalRowsInCSV}
                </Typography>
              </div>
              <Typography variant="body1" className="documentName">
                {t(
                  'content.usermanagement.addMultipleUsers.uploadedFile.usersToBeUpload'
                )}
              </Typography>
            </div>
          </div>
          <Typography variant="h6" className="mb-20">
            {t(
              'content.usermanagement.addMultipleUsers.uploadedFile.addUserRolesHeading'
            )}
          </Typography>
          <Typography variant="label1" className="mb-20">
            {t('content.usermanagement.addMultipleUsers.uploadedFile.note')}
          </Typography>
          <ul className="mb-20">
            <li>
              <Typography variant="label1" className="mb-20">
                {t(
                  'content.usermanagement.addMultipleUsers.uploadedFile.note1'
                )}
              </Typography>
            </li>
            <li>
              <Typography variant="label1" className="mb-20">
                {t(
                  'content.usermanagement.addMultipleUsers.uploadedFile.note2'
                )}
              </Typography>
            </li>
            <li>
              <Typography variant="label1" className="mb-20">
                {t(
                  'content.usermanagement.addMultipleUsers.uploadedFile.note3'
                )}
              </Typography>
            </li>
          </ul>
          <Typography variant="label1">
            {t(
              'content.usermanagement.addMultipleUsers.uploadedFile.availableRoles'
            )}
          </Typography>
          <Link
            to={`/${PAGES.ROLE_DETAILS}`}
            target="_blank"
            className="roleDescLink"
          >
            <ChevronRightIcon sx={{ fontSize: '20px' }} />
            {t('content.usermanagement.addMultipleUsers.uploadedFile.roleDesc')}
          </Link>
          {allRoles.length > 0 ? (
            <div className="rolesSection">
              {allRoles.map((role: AppRole) => (
                <Checkbox
                  checked={Array.isArray(roles) && roles.includes(role.role)}
                  label={role.role}
                  key={role.roleId}
                  onChange={(e) =>
                    handleSelectRole(role.role, e.target.checked)
                  }
                />
              ))}
            </div>
          ) : (
            <Alert severity="info">
              <span>{t('content.addUserRight.noRolesFound')}</span>
            </Alert>
          )}
        </div>
      )
    } else {
      return (
        <div className="addMultipleUsers">
          <div className="firstStep">
            <Typography variant="label4" className="number">
              1
            </Typography>
            <Typography variant="body1" className="mb-20">
              {t('content.usermanagement.addMultipleUsers.step1.heading')}
            </Typography>
            <a
              href={
                idps[0].identityProviderCategoryId ===
                IDPCategory.KEYCLOAK_SHARED
                  ? '../../user-bulk-load.csv'
                  : '../../user-bulk-load-ownIdp.csv'
              }
              download
            >
              <Button variant="outlined" size="small">
                {t('content.usermanagement.addMultipleUsers.step1.buttonLabel')}
              </Button>
            </a>
          </div>
          <div className="secondStep">
            <Typography variant="label4" className="number">
              2
            </Typography>
            <Typography variant="body1" className="mb-20">
              {t('content.usermanagement.addMultipleUsers.step2.heading')}
            </Typography>
            <Link to={HelpPageURL} target="_blank" className="linkText mb-20">
              <Typography variant="caption2">
                {t('content.usermanagement.addMultipleUsers.step2.linkText')}
              </Typography>
            </Link>
            <EditIcon className="editIcon" />
          </div>
          <div className="thirdStep">
            <Typography variant="label4" className="number">
              3
            </Typography>
            <Typography variant="h6" className="mb-20">
              {t('content.usermanagement.addMultipleUsers.step3.heading')}
            </Typography>
            <Dropzone
              acceptFormat={{ '.csv': [] }}
              maxFilesToUpload={1}
              maxFileSize={1000}
              onChange={([file]) => {
                file && onChangeFile(file)
              }}
              errorText={t(
                'content.usermanagement.addMultipleUsers.fileSizeError'
              )}
              DropStatusHeader={false}
              DropArea={renderDropArea}
            />
          </div>
        </div>
      )
    }
  }

  const renderMultiuserMainContent = () => {
    return idps.length === 1 ? (
      <>
        <DialogHeader
          {...{
            title: t('content.usermanagement.addMultipleUsers.heading'),
            intro: t('content.usermanagement.addMultipleUsers.intro'),
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(closeOverlay()),
          }}
        />

        <DialogContent sx={{ padding: '0 150px 20px' }}>
          {renderContent()}
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => dispatch(show(OVERLAYS.NONE))}
          >
            {t('global.actions.cancel')}
          </Button>
          {loading ? (
            <LoadingButton
              color="primary"
              helperText=""
              helperTextColor="success"
              label=""
              loadIndicator={t('global.actions.loading')}
              loading
              size="medium"
              onButtonClick={() => {}}
              sx={{ marginLeft: '10px' }}
            />
          ) : (
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={
                uploadedFile === undefined || (isFileUploaded && !roles.length)
              }
            >
              {isError ? t('global.actions.exit') : t('global.actions.confirm')}
            </Button>
          )}
        </DialogActions>
      </>
    ) : (
      <AddUserDeny idps={idps} />
    )
  }

  return (
    <>
      {isFetching ? (
        <div
          style={{
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircleProgress
            colorVariant="primary"
            size={80}
            thickness={8}
            variant="indeterminate"
          />
        </div>
      ) : (
        renderMultiuserMainContent()
      )}
    </>
  )
}
