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

import { Box } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltips, Typography } from 'cx-portal-shared-components'
import { useState } from 'react'
import {
  IdentityProvider,
  IdentityProviderUpdate,
  IdentityProviderUpdateBody,
  OIDCAuthMethod,
  OIDCSignatureAlgorithm,
} from 'features/admin/idpApiSlice'
import { ValidatingInput } from '../CXValidatingOverlay/ValidatingForm'
import { isIDPClientID, isIDPClientSecret, isURL } from 'types/Patterns'
import { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Link } from 'react-router-dom'

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

const CopyValue = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState<boolean>(false)

  return (
    <Box
      sx={{
        margin: '4px 0',
        cursor: 'pointer',
        display: 'flex',
        color: copied ? '#44aa44' : '#cccccc',
        ':hover': {
          color: copied ? '#44aa44' : '#888888',
        },
      }}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }}
    >
      {value}
      <ContentCopyIcon
        sx={{
          marginLeft: '10px',
        }}
      />
    </Box>
  )
}

const ReadOnlyValue = ({
  label,
  tooltipMessage = '',
  value,
  style,
}: {
  label: string
  tooltipMessage?: string
  value: string
  style?: IHashMap<string>
}) => {
  return (
    <div style={style}>
      <div style={{ display: 'flex' }}>
        <Typography
          variant="label3"
          sx={{ textAlign: 'left', marginRight: '10px' }}
        >
          {label}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={tooltipMessage}
        >
          <div>
            <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
          </div>
        </Tooltips>
      </div>
      <CopyValue value={value} />
    </div>
  )
}

const UpdateIDPForm = ({
  idp,
  onChange,
}: {
  idp: IdentityProvider
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const HELPLINK =
    '/documentation/?path=docs%2F02.+Technical+Integration%2F02.+Identity+Provider+Management%2F02.+Configure+Company+IdP.md#create-the-new-idp-record'
  const { t } = useTranslation('idp')

  const defaultOAM =
    idp.oidc?.clientAuthMethod || (OIDCAuthMethod.SECRET_BASIC as string)
  const defaultOidcAuthMethod = {
    id: defaultOAM,
    title: defaultOAM,
    value: defaultOAM,
  }

  return (
    <>
      <Link to={HELPLINK} target="_help">
        {t('action.help')}
      </Link>

      <ReadOnlyValue
        label={t('field.redirectUri.name')}
        tooltipMessage={t('field.redirectUri.hint')}
        value={`${idp.redirectUrl}*`}
        style={{ marginTop: '10px' }}
      />

      <div style={{ marginTop: '40px', display: 'flex' }}>
        <ReadOnlyValue
          label={t('field.display.name')}
          tooltipMessage={t('field.display.hint')}
          value={idp.displayName || ''}
          style={{ width: '40%', marginRight: '2%' }}
        />
        <ReadOnlyValue
          label={t('field.alias.name')}
          tooltipMessage={t('field.alias.hint')}
          value={idp.alias}
          style={{ width: '31%', margin: '0 2%' }}
        />
        <ReadOnlyValue
          label={t('field.clientAuthMethod.name')}
          tooltipMessage={t('field.clientAuthMethod.hint')}
          value={defaultOidcAuthMethod.value}
          style={{ width: '23%', marginLeft: '2%' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <ValidatingInput
          name="metadataUrl"
          label={t('field.metadata.name')}
          validate={isWellknownMetadata}
          tooltipMessage={t('field.metadata.hint')}
          helperText={t('field.metadata.hint')}
          onValid={onChange}
        />
      </div>

      <div style={{ margin: '20px 0', display: 'flex' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <ValidatingInput
            name="clientId"
            label={t('field.clientId.name')}
            tooltipMessage={t('field.clientId.hint')}
            helperText={t('field.clientId.hint')}
            value={idp.oidc?.clientId || ''}
            validate={isIDPClientID}
            onValid={onChange}
          />
        </div>
        <div style={{ width: '48%', marginLeft: '2%' }}>
          <ValidatingInput
            name="secret"
            label={t('field.clientSecret.name')}
            tooltipMessage={t('field.clientSecret.hint')}
            helperText={t('field.clientSecret.hint')}
            validate={isIDPClientSecret}
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
