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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  LoadingButton,
  Radio,
  StaticTable,
  type TableType,
  Textarea,
  Typography,
  type DropAreaProps,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useFetchIDPDetailQuery,
  type UserIdentityProviders,
  useFetchIDPUsersListQuery,
} from 'features/admin/idpApiSlice'
import EnvironmentService from 'services/EnvironmentService'
import UserService from 'services/UserService'
import {
  editIDPUserResponseSelector,
  editIDPUserSelector,
  FORMS,
  storeForm,
} from 'features/control/form'
import { error, success } from 'services/NotifyService'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import DownloadIcon from '@mui/icons-material/Download'
import './style.scss'
import { Dropzone, type DropzoneFile } from 'components/shared/basic/Dropzone'
import Papa from 'papaparse'

export type ErrorResponse = {
  details: string[]
  line: number
  message: string
}

export type FileData = {
  ProviderAlias: string
  ProviderUserId: string
  ProviderUserName: string
  UserId: string
  email: string
  firstName: string
  lastName: string
}

enum IDPState {
  SUCCESS_VALID_FORMAT = 'SUCCESS_VALID_FORMAT',
  SUCCESS_UPLOAD_USERS = 'SUCCESS_UPLOAD_USERS',
  SUCCESS_DELETE_IDP = 'SUCCESS_DELETE_IDP',
  ERROR_MULTIPLE_FILES = 'ERROR_MULTIPLE_FILES',
  ERROR_INVALID_TYPE = 'ERROR_INVALID_TYPE',
  ERROR_INVALID_SIZE = 'ERROR_INVALID_SIZE',
  ERROR_INVALID_FORMAT = 'ERROR_INVALID_FORMAT',
  ERROR_FILE_HEADER = 'ERROR_FILE_HEADER',
  ERROR_UPLOAD_USERS = 'ERROR_UPLOAD_USERS',
  ERROR_DELETE_IDP = 'ERROR_DELETE_IDP',
}

enum FileFormat {
  JSON = 'JSON',
  CSV = 'CSV',
}

const SelectFormat = ({
  format,
  onChange,
}: {
  format: FileFormat
  onChange: (value: FileFormat) => void
}) => {
  return (
    <div>
      <Radio
        label={FileFormat.JSON}
        checked={format === FileFormat.JSON}
        onChange={() => {
          onChange(FileFormat.JSON)
        }}
        value={FileFormat.JSON}
        name="radio-buttons"
        inputProps={{ 'aria-label': FileFormat.JSON }}
      />
      <Radio
        label={FileFormat.CSV}
        checked={format === FileFormat.CSV}
        onChange={() => {
          onChange(FileFormat.CSV)
        }}
        value={FileFormat.CSV}
        name="radio-buttons"
        inputProps={{ 'aria-label': FileFormat.CSV }}
      />
    </div>
  )
}

const AddUsersIDPResponse = ({
  csvData,
  response,
}: {
  csvData: UserIdentityProviders[]
  response: string
}) => {
  const { t } = useTranslation('idp')
  const userResponse = JSON.parse(response)

  const [tableErrorData, setTableErrorData] = useState<TableType>()

  useEffect(() => {
    if (userResponse?.error && !tableErrorData?.body.length) {
      const errorMsgs = userResponse.errors.map((error: ErrorResponse) => [
        `${csvData[error.line - 1].firstName} ${
          csvData[error.line - 1].lastName
        }, ${csvData[error.line - 1].email}`,
        error.message,
      ])
      setTableErrorData({
        head: [],
        body: errorMsgs,
      })
    }
  }, [userResponse])

  return (
    <>
      {!userResponse.error ? (
        <Trans>
          <Typography variant="body1" className="successDesc">
            {t('userssuccess.desc')}
          </Typography>
        </Trans>
      ) : (
        <div className="errorSection mb-30">
          <div className="uploadedDetailsSection mb-30">
            <div className="userDetailsMain">
              <div className="userSuccess">
                <Typography variant="body1" className="number">
                  {userResponse?.updated}
                </Typography>
              </div>
              <Typography variant="label2" className="detailLabel">
                {t('userserror.userUploaded')}
              </Typography>
            </div>
            <div className="userDetailsMain">
              <div className="userError">
                <Typography variant="body1" className="number">
                  {userResponse?.error}
                </Typography>
              </div>
              <Typography variant="label2" className="detailLabel">
                {t('userserror.userFailed')}
              </Typography>
            </div>
          </div>

          {tableErrorData && tableErrorData.body[0].length >= 1 && (
            <>
              <div className="mb-30">
                <Trans>
                  <Typography variant="label2" className="errorUsersLabel">
                    {t('userserror.errorUsersLabel')}
                  </Typography>
                </Trans>
              </div>
              <StaticTable data={tableErrorData} horizontal={false} />
            </>
          )}
        </div>
      )}
    </>
  )
}

export const AddUsersIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const idpData = useFetchIDPDetailQuery(id).data
  const userData = useFetchIDPUsersListQuery(id).data
  const [format, setFormat] = useState<FileFormat>(FileFormat.CSV)
  const [pretty, setPretty] = useState<boolean>(false)
  const [unlinked, setUnlinked] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean | undefined>(undefined)
  const userContent = useSelector(editIDPUserSelector)
  const userResponse = useSelector(editIDPUserResponseSelector)
  const fetching = t('state.fetching')
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<DropzoneFile>()
  const [csvData, setCsvData] = useState<UserIdentityProviders[]>([])

  const csvHeaderList = [
    'UserId',
    'firstName',
    'lastName',
    'email',
    'ProviderAlias',
    'ProviderUserId',
    'ProviderUserName',
  ]

  const jsonHeaderList = [
    'companyUserId',
    'firstName',
    'lastName',
    'email',
    'identityProviders',
  ]

  const CSV_COLUMNS = useMemo(
    () => [
      { name: 'UserId', width: 37 },
      { name: 'FirstName', width: 20 },
      { name: 'LastName', width: 20 },
      { name: 'Email', width: 32 },
      { name: 'ProviderAlias', width: 20 },
      { name: 'ProviderUserId', width: 38 },
      { name: 'ProviderUserName', width: 18 },
    ],
    []
  )

  const postUsers = () => {
    if (!idpData || !userContent?.data) return
    setLoading(true)
    const postdata = new FormData()
    postdata.append(
      'document',
      new Blob([json2csv(store2data(userContent.data))], {
        type: 'text/csv',
      })
    )
    fetch(
      `${EnvironmentService.getApiBase()}/api/administration/identityprovider/owncompany/usersfile`,
      {
        method: 'POST',
        headers: {
          authorization: `bearer ${UserService.getToken()}`,
        },
        body: postdata,
      }
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false)
        storeResponse(result)
        success(t(`state.${IDPState.SUCCESS_UPLOAD_USERS}`))
        setStatus(true)
      })
      .catch((err) => {
        setLoading(false)
        error(t(`state.${IDPState.ERROR_UPLOAD_USERS}`, '', err) as string)
        setStatus(false)
      })
    setTimeout(() => {
      setStatus(undefined)
    }, 3000)
  }

  const downloadUserfile = () => {
    if (!idpData || !userContent?.data) return
    const url = window.URL.createObjectURL(
      new Blob([store2text(userContent.data)])
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `users-${idpData?.alias || id}.${format.toLocaleLowerCase()}`
    )
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
  }

  const pad = (msg: string, size: number) =>
    new Array(size).fill('').join(' ').slice(msg.length) + msg

  const formatCSV = (csv: string) =>
    csv
      .split('\n')
      .map((row) =>
        row
          .split(',')
          .map((col, i) => pad(col, CSV_COLUMNS[i].width))
          .join(',')
      )
      .join('\n')

  const json2csv = useCallback(
    (users: Array<UserIdentityProviders>) =>
      `${CSV_COLUMNS.map((col) => col.name).join()}\n${users
        .map((user: UserIdentityProviders) =>
          [
            user.companyUserId ?? '',
            user.firstName ?? '',
            user.lastName ?? '',
            user.email ?? '',
            idpData?.alias,
            (user.identityProviders?.length > 0 &&
              user.identityProviders[0].userId) ??
              '',
            (user.identityProviders?.length > 0 &&
              user.identityProviders[0].userName) ??
              '',
          ].join(',')
        )
        .join('\n')}`,
    [CSV_COLUMNS, idpData]
  )

  const csvcols2json = useCallback(
    (cols: Array<string>): UserIdentityProviders => {
      return {
        companyUserId: cols[0],
        firstName: cols[1],
        lastName: cols[2],
        email: cols[3],
        identityProviders: [
          {
            identityProviderId: cols[4] ?? '',
            userId: cols[5] ?? '',
            userName: cols[6]?.replace(/['"]+/g, '') ?? '',
          },
        ],
      }
    },
    []
  )

  const csv2json = useCallback(
    (users: string) =>
      users
        .trim()
        .split(/\\r\\n|\\n|\n/)
        .slice(1)
        .filter((row) => row.length > 1)
        .map((row) => csvcols2json(row.split(',').map((col) => col.trim()))),
    [csvcols2json]
  )

  const data2text = (users: Array<UserIdentityProviders>) => {
    switch (format) {
      case FileFormat.JSON:
        return JSON.stringify(users, null, pretty ? 2 : undefined)
      case FileFormat.CSV:
        return ((csv) => (pretty ? formatCSV(csv) : csv))(json2csv(users))
    }
  }

  const store2data = JSON.parse

  const store2text = (content: string) => {
    if (!idpData) return content
    const data = store2data(content)
    let newData =
      typeof data === 'string' ? JSON.parse(data) : store2data(content)
    if (unlinked)
      newData = newData.filter(
        (item: UserIdentityProviders) =>
          !(
            item.identityProviders &&
            item.identityProviders.length > 0 &&
            item.identityProviders[0].userId
          )
      )
    return data2text(newData)
  }

  const storeResponse = (response: string) => {
    dispatch(
      storeForm({
        form: FORMS.IDP_USER_RESPONSE_FORM,
        att: {
          data: response,
        },
      })
    )
  }

  const storeData = useCallback(
    (text: string) => {
      try {
        dispatch(
          storeForm({
            form: FORMS.IDP_USER_FORM,
            att: {
              data: JSON.stringify(JSON.parse(text)),
            },
          })
        )
      } catch (e) {
        error(t(IDPState.ERROR_INVALID_FORMAT))
      }
    },
    [dispatch, t]
  )

  const renderOnLoad = (reader: FileReader, acceptedFile: DropzoneFile) => {
    if (!reader.result) return
    if (!acceptedFile.type.includes(format.toLowerCase())) {
      //checking selected format is similar to uploaded file format
      error(t(`state.${IDPState.ERROR_INVALID_FORMAT}`))
      setStatus(false)
      setUploadedFile(undefined)
      return
    }
    if (format === FileFormat.JSON && typeof reader.result === 'string') {
      //if file is JSON
      const content = JSON.stringify(json2csv(JSON.parse(reader.result)))
      const JSONData = JSON.parse(reader.result)
      const jsonKeys = JSONData.map((obj: FileData) => Object.keys(obj))[0]
      if (
        !jsonHeaderList.reduce(
          (a, c, i) => a && jsonKeys[i].toLowerCase() === c.toLowerCase(),
          true
        )
      ) {
        error(t(`state.${IDPState.ERROR_FILE_HEADER}`))
        setStatus(false)
        setTimeout(() => {
          setStatus(undefined)
        }, 3000)
        setUploadedFile(undefined)
        return
      }
      setCsvData(csv2json(content))
      storeData(JSON.stringify(csv2json(content)))
    } else {
      //if file is CSV
      const content = JSON.stringify(reader.result)
      Papa.parse(acceptedFile, {
        skipEmptyLines: true,
        complete: function (results) {
          const csvData: Array<Array<string>> = results.data as Array<
            Array<string>
          >
          if (
            !csvHeaderList.reduce(
              (a, c, i) => a && csvData[0][i].toLowerCase() === c.toLowerCase(),
              true
            )
          ) {
            error(t(`state.${IDPState.ERROR_FILE_HEADER}`))
            setStatus(false)
            setTimeout(() => {
              setStatus(undefined)
            }, 3000)
            setUploadedFile(undefined)
          }
        },
      })
      setCsvData(csv2json(content))
      storeData(JSON.stringify(csv2json(content)))
    }
  }

  const onDrop = useCallback(
    (acceptedFile: DropzoneFile) => {
      if (!acceptedFile) {
        setUploadedFile(undefined)
        return
      }
      const reader = new FileReader()
      reader.onabort = () => {
        console.log('file reading was aborted')
      }
      reader.onerror = () => {
        console.log('file reading has failed')
      }
      reader.onload = () => {
        renderOnLoad(reader, acceptedFile)
      }
      setUploadedFile(acceptedFile)
      reader.readAsText(acceptedFile)
    },
    [csv2json, storeData, t, format]
  )

  useEffect(() => {
    if (!userData) return
    storeData(JSON.stringify(userData))
  }, [storeData, userData])

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  const renderContent = () => {
    return (
      <>
        <Trans>
          <Typography sx={{ mb: '12px' }} variant="body2">
            {t('users.desc1')}
          </Typography>
        </Trans>
        {/*
        <Typography variant="h4" sx={{ margin: '10px 0' }}>
          {idpData?.displayName} - {idpData?.alias}
        </Typography>
        */}
        <div className="uploadBulkUsers">
          <Typography variant="label2" className="bulkUploadHeading">
            {t('users.bulkUploadHeading')}
          </Typography>
          <div className="firstStep">
            <Typography variant="label4" className="number">
              1
            </Typography>
            <Typography variant="label3" className="mb-30 step1Label">
              {t('users.step1Heading')}
            </Typography>
            <Typography variant="label4" className="mb-30 step1Label">
              {t('users.step1Intro')}
            </Typography>
            <Textarea
              style={{
                ...{
                  marginTop: '12px',
                  padding: '12px',
                  width: '100%',
                  whiteSpace: 'pre',
                  color: '#666',
                  lineHeight: '20px',
                  borderRadius: '24px',
                },
                ...(status === false ? { backgroundColor: '#FEE7E2' } : {}),
                ...(status === true ? { backgroundColor: '#dfd' } : {}),
              }}
              disabled={true}
              minRows={10}
              maxRows={10}
              value={
                idpData && userContent?.data
                  ? store2text(userContent.data)
                  : fetching
              }
              onBlur={() => {
                // do nothing
              }}
              onChange={(e) => {
                storeData(e.target.value)
              }}
            />
            <div className="fileFormat">
              <SelectFormat
                format={format}
                onChange={(selectedFormat: FileFormat) => {
                  setFormat(selectedFormat)
                }}
              />
              <Checkbox
                label={`${t('users.pretty')}`}
                checked={pretty}
                onClick={() => {
                  setPretty(!pretty)
                }}
              />
              <div style={{ display: 'none' }}>
                <Checkbox
                  label={`${t('users.unlinked')}`}
                  checked={unlinked}
                  onClick={() => {
                    setUnlinked(!unlinked)
                  }}
                />
              </div>
            </div>
            <Button
              size="small"
              variant="outlined"
              onClick={downloadUserfile}
              endIcon={<DownloadIcon />}
              className="downloadButton"
            >
              {t('users.step1ButtonLabel')}
            </Button>
          </div>
          <div className="secondStep">
            <Typography variant="label4" className="number">
              2
            </Typography>
            <Trans>
              <Typography variant="label3" className="step1Label">
                {t('users.step2Heading')}
              </Typography>
            </Trans>
          </div>
          <div className="thirdStep">
            <Typography variant="label4" className="number">
              3
            </Typography>
            <Typography variant="label3" className="step1Label">
              {t('users.step3Heading')}
            </Typography>
          </div>
        </div>
        <div className="mb-30">
          <Dropzone
            files={uploadedFile && [uploadedFile]}
            acceptFormat={{
              'text/csv': [],
              'application/json': [],
            }}
            maxFilesToUpload={1}
            maxFileSize={100000}
            onChange={([file]) => {
              onDrop(file)
            }}
            errorText={t(
              'content.usecaseParticipation.editUsecase.fileSizeError'
            )}
            DropStatusHeader={false}
            DropArea={renderDropArea}
          />
        </div>
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0088CC',
            textDecoration: 'underline',
          }}
          onClick={() =>
            window.open(
              '/documentation/?path=user%2F02.+Technical+Integration%2F02.+Identity+Provider+Management%2F02.+Configure+Company+IdP.md',
              '_blank',
              'noopener'
            )
          }
        >
          <HelpOutlineIcon
            sx={{
              fontSize: '18px',
              marginRight: '5px',
            }}
          />
          {t('add.learnMore')}
        </Typography>
      </>
    )
  }

  const fetchTitle = () => {
    const response = userResponse?.data ? JSON.parse(userResponse.data) : {}
    if (Object.keys(response).length !== 0 && response.error) {
      return t('userserror.title')
    } else if (Object.keys(response).length !== 0 && !response.error) {
      return t('userssuccess.title')
    } else {
      return t('users.title')
    }
  }

  return (
    <>
      <DialogHeader
        title={fetchTitle()}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => {
          storeResponse('')
          dispatch(closeOverlay())
        }}
      />
      <DialogContent>
        {userResponse?.data ? (
          <AddUsersIDPResponse csvData={csvData} response={userResponse.data} />
        ) : (
          renderContent()
        )}
      </DialogContent>
      {userResponse?.data ? (
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              storeResponse('')
              dispatch(closeOverlay())
            }}
          >
            {t('action.close')}
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
            {t('action.cancel')}
          </Button>
          {loading ? (
            <LoadingButton
              color="primary"
              helperText=""
              helperTextColor="success"
              label=""
              loadIndicator={t('action.loading')}
              loading
              size="medium"
              onButtonClick={() => {
                // do nothing
              }}
              sx={{ marginLeft: '10px' }}
            />
          ) : (
            <Button
              variant="contained"
              disabled={!id || uploadedFile === undefined}
              onClick={postUsers}
            >
              {t('action.uploadUserList')}
            </Button>
          )}
        </DialogActions>
      )}
    </>
  )
}
