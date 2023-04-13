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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  Radio,
  Textarea,
  Typography,
} from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useFetchIDPDetailQuery,
  UserIdentityProviders,
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
import { useDropzone } from 'react-dropzone'
import { error, success } from 'services/NotifyService'

enum IDPState {
  SUCCESS_VALID_FORMAT = 'SUCCESS_VALID_FORMAT',
  SUCCESS_UPLOAD_USERS = 'SUCCESS_UPLOAD_USERS',
  SUCCESS_DELETE_IDP = 'SUCCESS_DELETE_IDP',
  ERROR_MULTIPLE_FILES = 'ERROR_MULTIPLE_FILES',
  ERROR_INVALID_TYPE = 'ERROR_INVALID_TYPE',
  ERROR_INVALID_FORMAT = 'ERROR_INVALID_FORMAT',
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

const AddusersIDPResponse = ({
  response,
  storeResponse,
}: {
  response: string
  storeResponse: (response: string) => void
}) => {
  const { t } = useTranslation('idp')

  return (
    <Dialog open={true}>
      <DialogHeader
        title={t('userssuccess.title')}
        intro={t('userssuccess.subtitle')}
        closeWithIcon={true}
        onCloseWithIcon={() => storeResponse('')}
      />
      <DialogContent>
        <div>
          <Typography>{t('userssuccess.desc')}</Typography>
          <pre
            style={{
              padding: '12px',
              border: '1px solid lightgray',
              backgroundColor: '#eee',
            }}
          >
            {JSON.stringify(JSON.parse(response), null, 2)}
          </pre>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => storeResponse('')}>
          {t('action.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const AddusersIDP = ({ id }: { id: string }) => {
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
        storeResponse(result)
        success(t(`state.${IDPState.SUCCESS_UPLOAD_USERS}`))
        setStatus(true)
      })
      .catch((err) => {
        error(t(`state.${IDPState.ERROR_UPLOAD_USERS}`, '', err))
        setStatus(false)
      })
    setTimeout(() => setStatus(undefined), 3000)
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        error(t(`state.${IDPState.ERROR_MULTIPLE_FILES}`))
        setStatus(false)
        setTimeout(() => setStatus(undefined), 3000)
        return
      }
      const MIME_TYPE = {
        JSON: 'application/json',
        CSV: 'text/csv',
      }
      acceptedFiles.forEach((file: File) => {
        if (!Object.values(MIME_TYPE).includes(file.type)) {
          error(t(`state.${IDPState.ERROR_INVALID_TYPE}`))
          setStatus(false)
          setTimeout(() => setStatus(undefined), 3000)
          return
        }
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          if (!reader.result) return
          const content = reader.result.toString()
          storeData(
            file.type === MIME_TYPE.CSV
              ? JSON.stringify(csv2json(content))
              : content
          )
        }
        reader.readAsText(file)
      })
    },
    [csv2json, storeData, t]
  )

  const { getRootProps } = useDropzone({ onDrop })

  useEffect(() => {
    if (!userData) return
    storeData(JSON.stringify(userData))
  }, [storeData, userData])

  return (
    <>
      <DialogHeader
        title={t('users.title', {
          idp: idpData?.displayName,
        })}
        intro={t('users.subtitle')}
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <Typography sx={{ mb: '12px' }} variant="body2">
          {t('users.desc1')}
        </Typography>
        <Typography sx={{ mb: '12px' }} variant="body2">
          {t('users.desc2')}
        </Typography>
        {/*
        <Typography variant="h4" sx={{ margin: '10px 0' }}>
          {idpData?.displayName} - {idpData?.alias}
        </Typography>
        */}
        <Typography sx={{ mb: '6px', mt: '24px' }}>
          {t('users.preview')}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SelectFormat
            format={format}
            onChange={(selectedFormat: FileFormat) => setFormat(selectedFormat)}
          />
          <Checkbox
            label={`${t('users.pretty')}`}
            checked={pretty}
            onClick={() => setPretty(!pretty)}
          />
          <div style={{ display: 'none' }}>
            <Checkbox
              label={`${t('users.unlinked')}`}
              checked={unlinked}
              onClick={() => setUnlinked(!unlinked)}
            />
          </div>
        </div>
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
          onBlur={() => {}}
          onChange={(e) => storeData(e.target.value)}
        />
        <div
          style={{ display: 'flex', flexDirection: 'row', margin: '12px 0px' }}
        >
          <Button size="small" onClick={downloadUserfile}>
            {t('users.download')}
          </Button>
        </div>
        <Typography sx={{ margin: '20px 0px' }}>
          {t('users.drop.intro')}
        </Typography>
        <div {...getRootProps()}>
          <DropArea
            error={status === false}
            size="small"
            translations={{
              title: t('users.drop.title'),
              subTitle: t('users.drop.subTitle'),
              errorTitle: t('users.drop.errorTitle'),
            }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', margin: '20px 0px' }}
        >
          <Typography variant="caption1" sx={{ mr: '6px' }}>
            {t('field.note')}
            {': '}
          </Typography>
          <Typography>{t('users.drop.note')}</Typography>
        </div>
        {userResponse?.data && (
          <AddusersIDPResponse
            response={userResponse.data}
            storeResponse={storeResponse}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.cancel')}
        </Button>
        <Button variant="contained" disabled={!!!id} onClick={postUsers}>
          {t('action.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
