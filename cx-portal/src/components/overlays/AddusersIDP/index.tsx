/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  PageSnackbar,
  Radio,
  Textarea,
  Typography,
} from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useFetchIDPDetailQuery,
  UserIdentityProviders,
  useFetchIDPUsersListQuery,
} from 'features/admin/idpApiSlice'
import EnvironmentService from 'services/EnvironmentService'
import UserService from 'services/UserService'
import {
  editIDPUserSelector,
  FORMS,
  storeForm,
} from 'features/control/formSlice'
import { useDropzone } from 'react-dropzone'

enum IDPSetupState {
  NONE = 'NONE',
  SUCCESS_VALID_FORMAT = 'SUCCESS_VALID_FORMAT',
  SUCCESS_UPLOAD_USERS = 'SUCCESS_UPLOAD_USERS',
  ERROR_MULTIPLE_FILES = 'ERROR_MULTIPLE_FILES',
  ERROR_INVALID_TYPE = 'ERROR_INVALID_TYPE',
  ERROR_INVALID_FORMAT = 'ERROR_INVALID_FORMAT',
  ERROR_UPLOAD_USERS = 'ERROR_UPLOAD_USERS',
}

enum FileFormat {
  JSON = 'JSON',
  CSV = 'CSV',
}

const IDPSetupNotification = ({ state }: { state: IDPSetupState }) => {
  const { t } = useTranslation()
  const error = state.toString().startsWith('ERROR')
  return (
    <PageSnackbar
      autoClose
      title={t(`idp.state.message`)}
      description={t(`idp.state.${state}`)}
      open={state !== IDPSetupState.NONE}
      severity={error ? 'error' : 'success'}
      showIcon
    />
  )
}

const SelectFormat = ({
  format,
  onChange,
}: {
  format: FileFormat
  onChange: (value: FileFormat) => void
}) => {
  return (
    <div style={{ padding: '30px 0px' }}>
      <Radio
        label={FileFormat.JSON}
        checked={format === FileFormat.JSON}
        onChange={() => onChange(FileFormat.JSON)}
        value={FileFormat.JSON}
        name="radio-buttons"
        inputProps={{ 'aria-label': FileFormat.JSON }}
      />
      <Radio
        label={FileFormat.CSV}
        checked={format === FileFormat.CSV}
        onChange={() => onChange(FileFormat.CSV)}
        value={FileFormat.CSV}
        name="radio-buttons"
        inputProps={{ 'aria-label': FileFormat.CSV }}
      />
    </div>
  )
}

export const AddusersIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const idpData = useFetchIDPDetailQuery(id).data
  const userData = useFetchIDPUsersListQuery(id).data
  const [format, setFormat] = useState<FileFormat>(FileFormat.CSV)
  const [pretty, setPretty] = useState<boolean>(false)
  const [unlinked, setUnlinked] = useState<boolean>(false)
  const userContent = useSelector(editIDPUserSelector)
  const [status, setStatus] = useState<IDPSetupState>(IDPSetupState.NONE)

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

  //  const fetchUsers = () => {
  //    fetch(
  //      `${EnvironmentService.getApiBase()}/api/administration/identityprovider/owncompany/usersfile?identityProviderIds=${id}&unlinkedUsersOnly=false`,
  //      {
  //        method: 'GET',
  //        headers: {
  //          authorization: `bearer ${UserService.getToken()}`,
  //          'content-type': MIME_TYPE[format],
  //        },
  //      }
  //    )
  //      .then((response) => response.text())
  //      .then((text) => setContent(text))
  //  }

  const postUsers = () => {
    if (!idpData || !userContent?.data) return
    const postdata = new FormData()
    postdata.append(
      'document',
      new Blob([store2text(userContent.data)], {
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
      .then((text) => {
        console.log(text)
        setStatus(IDPSetupState.SUCCESS_UPLOAD_USERS)
      })
      .catch((_error) => setStatus(IDPSetupState.ERROR_UPLOAD_USERS))
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
            user.companyUserId || '',
            user.firstName || '',
            user.lastName || '',
            user.email || '',
            idpData?.alias,
            (user.identityProviders?.length > 0 &&
              user.identityProviders[0].userId) ||
              '',
            (user.identityProviders?.length > 0 &&
              user.identityProviders[0].userName) ||
              '',
          ].join(',')
        )
        .join('\n')}`,
    [CSV_COLUMNS, idpData]
  )

  const csvcols2json = useCallback(
    (cols: Array<string>): UserIdentityProviders => ({
      companyUserId: cols[0],
      firstName: cols[1],
      lastName: cols[2],
      email: cols[3],
      identityProviders: [
        {
          identityProviderId: cols[4] || '',
          userId: cols[5] || '',
          userName: cols[6] || '',
        },
      ],
    }),
    []
  )

  const csv2json = useCallback(
    (users: string) =>
      users
        .trim()
        .split('\n')
        .slice(1)
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
    let data = store2data(content)
    if (unlinked)
      data = data.filter(
        (item: UserIdentityProviders) =>
          !(
            item.identityProviders &&
            item.identityProviders.length > 0 &&
            item.identityProviders[0].userId
          )
      )
    return data2text(data)
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        setStatus(IDPSetupState.ERROR_MULTIPLE_FILES)
        return
      }
      const MIME_TYPE = {
        JSON: 'application/json',
        CSV: 'text/csv',
      }
      acceptedFiles.forEach((file: File) => {
        if (!Object.values(MIME_TYPE).includes(file.type)) {
          setStatus(IDPSetupState.ERROR_INVALID_TYPE)
          return
        }
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          if (!reader.result) return
          try {
            const content = reader.result.toString()
            dispatch(
              storeForm({
                form: FORMS.IDP_USER_FORM,
                att: {
                  data: JSON.stringify(
                    file.type === MIME_TYPE.CSV
                      ? csv2json(content)
                      : JSON.parse(content)
                  ),
                },
              })
            )
            setStatus(IDPSetupState.SUCCESS_VALID_FORMAT)
          } catch (e) {
            setStatus(IDPSetupState.ERROR_INVALID_FORMAT)
          }
          setTimeout(() => setStatus(IDPSetupState.NONE), 5000)
        }
        reader.readAsText(file)
      })
    },
    [csv2json, dispatch]
  )

  const { getRootProps } = useDropzone({ onDrop })

  useEffect(() => {
    if (!idpData || !userData) return
    userData &&
      dispatch(
        storeForm({
          form: FORMS.IDP_USER_FORM,
          att: { data: JSON.stringify(userData) },
        })
      )
  }, [idpData, userData, dispatch, json2csv])

  //console.log(userContent)

  return (
    <>
      <DialogHeader
        title={t('content.idpmanagement.adduserIdpHeadline', {
          idp: idpData?.displayName,
        })}
        intro={t('content.idpmanagement.adduserIdpSubheadline')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <Typography>
          {t('Now link the existing users to your new IDP')}
        </Typography>
        <Typography variant="h4" sx={{ margin: '10px 0' }}>
          {idpData?.displayName} - {idpData?.alias}
        </Typography>
        <Typography>
          {t(
            "Specify their user ID (not name) at the new target IDP in the field 'UserId'."
          )}
        </Typography>
        {idpData && userContent?.data ? (
          <>
            <div {...getRootProps()}>
              <Textarea
                style={{
                  ...{
                    padding: '12px',
                    width: '100%',
                    whiteSpace: 'pre',
                    color: '#666',
                    lineHeight: '20px',
                  },
                  ...(status.startsWith('ERROR')
                    ? { backgroundColor: '#fdd' }
                    : {}),
                  ...(status.startsWith('SUCCESS')
                    ? { backgroundColor: '#dfd' }
                    : {}),
                }}
                disabled={true}
                minRows={10}
                maxRows={10}
                value={store2text(userContent.data)}
                onBlur={() => {}}
                onChange={(e) =>
                  dispatch(
                    storeForm({
                      form: FORMS.IDP_USER_FORM,
                      att: { data: e.target.value },
                    })
                  )
                }
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <SelectFormat
                format={format}
                onChange={(selectedFormat: FileFormat) =>
                  setFormat(selectedFormat)
                }
              />
              <Checkbox
                label={'pretty'}
                checked={pretty}
                onClick={() => setPretty(!pretty)}
              />
              <Checkbox
                label={'hide linked'}
                checked={unlinked}
                onClick={() => setUnlinked(!unlinked)}
              />
              <span style={{ display: 'block', padding: '38px 0px' }}>
                <Typography
                  onClick={downloadUserfile}
                  sx={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {t('download')}
                </Typography>
              </span>
            </div>
          </>
        ) : (
          <Typography
            sx={{
              color: 'lightgray',
            }}
          >
            'fetching users ...'
          </Typography>
        )}

        <IDPSetupNotification state={status} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        <Button variant="contained" disabled={!!!id} onClick={postUsers}>
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
