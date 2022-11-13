/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Box } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Input, SelectList, Typography } from 'cx-portal-shared-components'
import { useState } from 'react'
import {
  IdentityProvider,
  IdentityProviderUpdate,
  IdentityProviderUpdateBody,
  OIDCAuthMethod,
  OIDCSignatureAlgorithm,
} from 'features/admin/idpApiSlice'
import { ValidatingInput } from '../CXValidatingOverlay/ValidatingForm'
import { isCompanyName, isID, isURL } from 'types/Patterns'
import { IHashMap } from 'types/MainTypes'

const RedirectURI = ({ uri }: { uri: string }) => {
  const [copied, setCopied] = useState<boolean>(false)

  return (
    <Box
      sx={{
        margin: '4px 0 30px 0',
        cursor: 'pointer',
        display: 'flex',
        color: copied ? '#44aa44' : '#cccccc',
        ':hover': {
          color: copied ? '#44aa44' : '#888888',
        },
      }}
      onClick={async () => {
        await navigator.clipboard.writeText(uri)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }}
    >
      {uri}
      <ContentCopyIcon
        sx={{
          marginLeft: '10px',
        }}
      />
    </Box>
  )
}

const isWellknownMetadata = (expr: string) =>
  (isURL(expr) || expr.startsWith('http://localhost')) &&
  expr.endsWith('.well-known/openid-configuration')

const idpToForm = (idp: IdentityProvider) => {
  const form: IHashMap<string> = {}
  form.displayName = idp.displayName || ''
  form.metadataUrl = ''
  form.clientId = idp.oidc?.clientId || ''
  form.secret = ''
  form.clientAuthMethod =
    idp.oidc?.clientAuthMethod || OIDCAuthMethod.SECRET_BASIC
  form.signatureAlgorithm =
    idp.oidc?.signatureAlgorithm || OIDCSignatureAlgorithm.ES256
  return form
}

const formToUpdate = (form: IHashMap<string>): IdentityProviderUpdateBody => ({
  displayName: form.displayName,
  oidc: {
    metadataUrl: form.metadataUrl,
    clientId: form.clientId,
    secret: form.secret,
    clientAuthMethod: form.clientAuthMethod as OIDCAuthMethod,
    signatureAlgorithm: form.signatureAlgorithm as OIDCSignatureAlgorithm,
  },
})

const UpdateIDPForm = ({
  idp,
  onChange,
}: {
  idp: IdentityProvider
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const defaultOAM =
    idp.oidc?.clientAuthMethod || (OIDCAuthMethod.SECRET_BASIC as string)
  const defaultOidcAuthMethod = {
    id: defaultOAM,
    title: defaultOAM,
    value: defaultOAM,
  }

  return (
    <>
      <Typography variant="body2">{'Redirect URI (click to copy)'}</Typography>
      <RedirectURI uri={`${idp.redirectUrl}*`} />

      <div style={{ margin: '20px 0', display: 'flex' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <ValidatingInput
            name="displayName"
            label="IDP name"
            value={idp.displayName || ''}
            validate={isCompanyName}
            onValid={onChange}
          />
        </div>
        <div style={{ width: '48%', marginLeft: '2%' }}>
          <Input
            name="alias"
            label="Alias"
            value={idp.alias || ''}
            disabled={true}
          />
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <ValidatingInput
          name="metadataUrl"
          label="Metadata URL"
          validate={isWellknownMetadata}
          helperText="Enter the metadata URL of your IDP that ends with '.well-known/openid-configuration'"
          onValid={onChange}
        />
      </div>

      <div style={{ margin: '20px 0', display: 'flex' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <SelectList
            clearText="clear"
            defaultValue={defaultOidcAuthMethod}
            items={Object.keys(OIDCAuthMethod).map((m) => ({
              id: m,
              title: m,
              value: m,
            }))}
            label="Client Authentication Method"
            placeholder="Client Authentication Method"
            onChangeItem={(item) => onChange('clientAuthMethod', item.value)}
          />
        </div>
      </div>

      <div style={{ margin: '20px 0', display: 'flex' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <ValidatingInput
            name="clientId"
            label="Client ID"
            value={idp.oidc?.clientId || ''}
            validate={isID}
            onValid={onChange}
          />
        </div>
        <div style={{ width: '48%', marginLeft: '2%' }}>
          <ValidatingInput
            name="secret"
            label="Client Secret"
            validate={isID}
            onValid={onChange}
          />
        </div>
      </div>
    </>
  )
}

export const UpdateIDPContent = ({
  idp,
  onValid,
}: {
  idp: IdentityProvider
  onValid: (form: IdentityProviderUpdate | undefined) => void
}) => {
  const [formData, setFormData] = useState<IHashMap<string>>(idpToForm(idp))

  const checkData = (key: string, value: string | undefined): boolean => {
    const current: IHashMap<string> = { ...formData }
    current[key] = value as OIDCSignatureAlgorithm
    setFormData(current)
    const formValid =
      current.displayName &&
      current.metadataUrl &&
      current.clientId &&
      current.secret &&
      current.clientAuthMethod
    onValid(
      formValid
        ? {
            identityProviderId: idp.identityProviderId,
            body: formToUpdate(current),
          }
        : undefined
    )
    return true
  }

  return <UpdateIDPForm idp={idp} onChange={checkData} />
}
