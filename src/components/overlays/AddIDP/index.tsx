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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Radio,
  Stepper,
  Tooltips,
  Typography,
} from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay'
import { useState } from 'react'
import {
  type IdentityProviderUpdate,
  IDPAuthType,
  IDPProviderType,
  OIDCAuthMethod,
  OIDCSignatureAlgorithm,
  useAddIDPMutation,
  useUpdateIDPMutation,
} from 'features/admin/idpApiSlice'
import { OVERLAYS } from 'types/Constants'
import { ValidatingInput } from '../CXValidatingOverlay/ValidatingInput'
import { isCompanyName } from 'types/Patterns'
import { getCentralIdp } from 'services/EnvironmentService'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { success } from 'services/NotifyService'

enum IDPType {
  COMPANY = 'Company',
  SHARED = 'Shared',
}

const SelectIdpProviderType = ({
  onChange,
  providerType = IDPProviderType.OWN,
}: {
  providerType?: IDPProviderType
  onChange: (value: IDPProviderType) => void
}) => {
  const { t } = useTranslation('idp')
  const [type, setType] = useState<IDPProviderType>(providerType)

  return (
    <div
      style={{ padding: '30px 0px', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ marginRight: '12px' }} variant="label3">
          {t('field.providerType.name')}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={t('field.providerType.hint')}
          children={
            <div>
              <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
            </div>
          }
        />
      </div>
      <Radio
        name="radio-provider"
        label={`${IDPProviderType.OWN} - ${t('field.providerType.option.OWN')}`}
        checked={type === IDPProviderType.OWN}
        onChange={() => {
          setType(IDPProviderType.OWN)
          onChange(IDPProviderType.OWN)
        }}
        value={IDPProviderType.OWN}
        inputProps={{ 'aria-label': IDPProviderType.OWN }}
      />
      <Radio
        name="radio-provider"
        label={`${IDPProviderType.MANAGED} - ${t(
          'field.providerType.option.MANAGED'
        )}`}
        checked={type === IDPProviderType.MANAGED}
        onChange={() => {
          setType(IDPProviderType.MANAGED)
          onChange(IDPProviderType.MANAGED)
        }}
        value={IDPProviderType.MANAGED}
        inputProps={{ 'aria-label': IDPProviderType.MANAGED }}
      />
    </div>
  )
}

const SelectIdpAuthType = ({
  onChange,
}: {
  onChange: (value: IDPAuthType) => void
}) => {
  const { t } = useTranslation('idp')
  const [type, setType] = useState<IDPAuthType>(IDPAuthType.OIDC)

  return (
    <div
      style={{ padding: '30px 0px', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ marginRight: '12px' }} variant="label3">
          {t('field.type.name')}
        </Typography>
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="top-start"
          tooltipText={t('field.type.hint')}
          children={
            <div>
              <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
            </div>
          }
        />
      </div>
      <Radio
        name="radio-auth"
        label={IDPAuthType.OIDC}
        checked={type === IDPAuthType.OIDC}
        onChange={() => {
          setType(IDPAuthType.OIDC)
          onChange(IDPAuthType.OIDC)
        }}
        value={IDPAuthType.OIDC}
        inputProps={{ 'aria-label': IDPAuthType.OIDC }}
      />
      <Radio
        name="radio-auth"
        disabled={true}
        label={IDPAuthType.SAML}
        checked={type === IDPAuthType.SAML}
        onChange={() => {
          setType(IDPAuthType.SAML)
          onChange(IDPAuthType.SAML)
        }}
        value={IDPAuthType.SAML}
        inputProps={{ 'aria-label': IDPAuthType.SAML }}
      />
    </div>
  )
}

type AddIDPPrepareFormType = {
  type: IDPType
  providerType: IDPProviderType
  authType: IDPAuthType
  name: string
}

const AddIDPPrepareForm = ({
  onChange,
  providerType = IDPProviderType.OWN,
}: {
  providerType?: IDPProviderType
  onChange: (value: AddIDPPrepareFormType) => void
}) => {
  const { t } = useTranslation('idp')
  const [formData, setFormData] = useState<AddIDPPrepareFormType>({
    type: IDPType.COMPANY,
    providerType,
    authType: IDPAuthType.OIDC,
    name: '',
  })

  return (
    <>
      <ValidatingInput
        name="name"
        label={t('field.display.name')}
        tooltipMessage={t('field.display.hint')}
        validate={isCompanyName}
        onValid={(_name, value) => {
          if (!value) return
          const currentData = { ...formData }
          currentData.name = value
          setFormData(currentData)
          onChange(currentData)
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SelectIdpAuthType
          onChange={(value) => {
            const currentData = {
              ...formData,
              authType: value,
            }
            setFormData(currentData)
            onChange(currentData)
          }}
        />
        <SelectIdpProviderType
          onChange={(value) => {
            const currentData = {
              ...formData,
              providerType: value,
            }
            setFormData(currentData)
            onChange(currentData)
          }}
        />
      </div>
    </>
  )
}

export const AddIdp = ({
  providerType = IDPProviderType.OWN,
}: {
  providerType?: IDPProviderType
}) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<AddIDPPrepareFormType>({
    type: IDPType.COMPANY,
    providerType,
    authType: IDPAuthType.OIDC,
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const [addIdp] = useAddIDPMutation()
  const [updateIdp] = useUpdateIDPMutation()

  const doCreateIDP = async () => {
    setLoading(true)
    try {
      const idp = await addIdp({
        protocol: formData.authType,
        identityProviderTypeId: formData.providerType,
      }).unwrap()
      const idpUpdateData: IdentityProviderUpdate = {
        identityProviderId: idp.identityProviderId,
        body: {
          displayName: formData.name,
          oidc: {
            metadataUrl: `${getCentralIdp()}/realms/CX-Central/.well-known/openid-configuration`,
            clientAuthMethod: OIDCAuthMethod.SECRET_BASIC,
            clientId: '',
            secret: '',
            signatureAlgorithm: OIDCSignatureAlgorithm.ES256,
          },
        },
      }
      await updateIdp(idpUpdateData).unwrap()
      dispatch(show(OVERLAYS.UPDATE_IDP, idp.identityProviderId))
      success(t('add.success'))
    } catch (err) {
      setShowError(true)
    }
    setLoading(false)
  }

  const AddStepsList = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
      color: '#0F71CB',
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
    },
    {
      headline: t('add.stepLists.thirdStep'),
      step: 3,
    },
  ]

  return (
    <>
      <DialogHeader
        title={t('add.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper
            list={
              formData.providerType === IDPProviderType.MANAGED
                ? AddStepsList.slice(0, 2)
                : AddStepsList
            }
            showSteps={
              formData.providerType === IDPProviderType.MANAGED ? 2 : 3
            }
            activeStep={1}
          />
        </div>
        <Trans>
          <Typography variant="label3">{t('add.desc')}</Typography>
        </Trans>
        <AddIDPPrepareForm providerType={providerType} onChange={setFormData} />
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: '#0088CC',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          <HelpOutlineIcon
            sx={{
              marginRight: '5px',
              fontSize: '18px',
            }}
          />
          {t('add.learnMore')}
        </Typography>
        {showError && (
          <Typography
            sx={{
              display: 'flex',
              color: '#d91e18',
              padding: '20px 40px',
              marginTop: '30px',
              border: '1px solid #d91e18',
              borderRadius: '5px',
            }}
            variant="label3"
          >
            <WarningAmberIcon
              sx={{
                fontSize: '18px',
                marginRight: '5px',
              }}
            />
            {t('add.metadataError')}
          </Typography>
        )}
      </DialogContent>
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
            disabled={!formData.name}
            onClick={() => doCreateIDP()}
          >
            {t('action.createIdp')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
