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

export const a = false

/*
import { useState } from 'react'
import {
  IdentityProvider,
  UserIdentityProviders,
} from 'features/admin/idpApiSlice'
import { ValidatingTextarea } from '../CXValidatingOverlay/ValidatingForm'
import { IHashMap } from 'types/MainTypes'
import { Radio, Checkbox, Typography } from 'cx-portal-shared-components'
import { t } from 'i18next'
import EnvironmentService from 'services/EnvironmentService'
import UserService from 'services/UserService'

export enum FileFormat {
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
const AdduserIDPForm = ({
  content,
  onChange,
}: {
  content: string
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  return (
    <>
      <div style={{ margin: '20px 0' }}>
        <ValidatingTextarea
          style={{
            padding: '12px',
            width: '100%',
            whiteSpace: 'pre',
            color: '#666',
            lineHeight: '20px',
          }}
          name="content"
          minRows={8}
          maxRows={12}
          value={content}
          debounceTime={800}
          validate={(data) => {
            try {
              JSON.parse(data)
              return true
            } catch (e) {
              return false
            }
          }}
          onValid={onChange}
        />
      </div>
    </>
  )
}

export const AdduserIDPContent = ({
  idpData,
  userData,
  onValid,
}: {
  idpData: IdentityProvider
  userData: UserIdentityProviders[]
  onValid: (users: UserIdentityProviders[] | undefined) => void
}) => {
  const MIME_TYPE = {
    JSON: 'application/json',
    CSV: 'text/csv',
  }

  const CSV_COLUMNS = [
    { name: 'UserId', width: 37 },
    { name: 'FirstName', width: 20 },
    { name: 'LastName', width: 20 },
    { name: 'Email', width: 32 },
    { name: 'ProviderAlias', width: 20 },
    { name: 'ProviderUserId', width: 38 },
    { name: 'ProviderUserName', width: 18 },
  ]

  const fetchUsers = () => {
    fetch(
      `${EnvironmentService.getApiBase()}/api/administration/identityprovider/owncompany/usersfile?identityProviderIds=${id}&unlinkedUsersOnly=false`,
      {
        method: 'GET',
        headers: {
          authorization: `bearer ${UserService.getToken()}`,
          'content-type': MIME_TYPE[format],
        },
      }
    )
      .then((response) => response.text())
      .then((text) => setContent(text))
  }

  const postUsers = () => {
    if (!userData) return
    const postdata = new FormData()
    postdata.append(
      'document',
      new Blob([json2csv(userData)], { type: 'text/csv' })
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
      .then((text) => console.log(text))
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

  const formatJSON = (json: UserIdentityProviders[]) =>
    JSON.stringify(json, null, 2)

  const json2csv = (users: Array<UserIdentityProviders>) =>
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
          '-',
        ].join(',')
      )
      .join('\n')}`

  const csvcols2json = (cols: Array<string>): UserIdentityProviders => ({
    companyUserId: cols[0],
    firstName: cols[1],
    lastName: cols[2],
    email: cols[3],
    identityProviders: [
      {
        identityProviderId: idpData.identityProviderId,
        userId: cols[4],
        userName: cols[5] || '-',
      },
    ],
  })

  const csv2json = (users: string) =>
    users
      .split('\n')
      .slice(1)
      .map((row) => csvcols2json(row.split(',')))

  const processData = (userData: Array<UserIdentityProviders>) => {
    switch (format) {
      case FileFormat.JSON:
        return pretty ? formatJSON(userData) : JSON.stringify(userData)
      case FileFormat.CSV:
        return ((csv) => (pretty ? formatCSV(csv) : csv))(json2csv(userData))
    }
  }

  const parseContent = (text: string) => {
    switch (format) {
      case FileFormat.JSON:
        return JSON.parse(text)
      case FileFormat.CSV:
        return text
    }
  }

  const downloadUserfile = () => {
    const url = window.URL.createObjectURL(
      new Blob([processData(userData || [])])
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `users-${
        idpData.alias || idpData.identityProviderId
      }.${format.toLocaleLowerCase()}`
    )
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
  }

  const checkData = (key: string, value: string | undefined): boolean => {
    if (!value) {
      onValid(undefined)
      return false
    }
    const current: IHashMap<string> = { ...formData }
    current[key] = value
    setFormData(current)
    const formValid = !!current.content
    onValid(formValid ? JSON.parse(current.content) : undefined)
    return true
  }

  const [format, setFormat] = useState<FileFormat>(FileFormat.JSON)
  const [pretty, setPretty] = useState<boolean>(true)
  const [formData, setFormData] = useState<IHashMap<string>>({})
  const [content, setContent] = useState<string>(processData(userData))

  return (
    <>
      <AdduserIDPForm
        content={processData(JSON.parse(content))}
        onChange={checkData}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SelectFormat format={format} onChange={setFormat} />
        <Checkbox
          label={'format'}
          checked={pretty}
          onClick={() => setPretty(!pretty)}
        />
        <span style={{ margin: 0, padding: 0, height: '20px' }}>
          <Typography
            onClick={downloadUserfile}
            sx={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
              margin: 0,
              padding: 0,
            }}
          >
            {t('download')}
          </Typography>
        </span>
      </div>
    </>
  )
}
*/
