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
  SelectList,
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
import { error, success } from 'services/NotifyService'

enum IDPType {
  COMPANY = 'Company',
  SHARED = 'Shared',
}

export type IdentityProviderType = {
  title: string
  value: string
}

const IdentityProviderTypeData = [
  {
    title: 'own - create an IdP connection to your company IdP for yourself',
    value: 'OWN',
  },
  {
    title: 'managed - create an managed IdP connection for a third party',
    value: 'MANAGED',
  },
]

const SelectIdpProviderType = ({
  onChange,
}: {
  onChange: (value: IDPProviderType) => void
}) => {
  const { t } = useTranslation('idp')
  return (
    <div style={{ padding: '30px 0px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ marginRight: '12px' }} variant="label3">
          {t('field.providerType.name')}
        </Typography>
      </div>
      <SelectList
        items={IdentityProviderTypeData}
        label={''}
        placeholder={t('field.providerType.placeholder')}
        defaultValue=""
        onChangeItem={(e) => {
          onChange(e?.value)
        }}
        keyTitle={'title'}
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
    <div style={{ padding: '30px 0px' }}>
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
      <div>
        <Radio
          name="radio-buttons"
          label={IDPAuthType.OIDC}
          checked={type === IDPAuthType.OIDC}
          onChange={() => {
            setType(IDPAuthType.OIDC)
            onChange(IDPAuthType.OIDC)
          }}
          value={IDPAuthType.OIDC}
          inputProps={{ 'aria-label': IDPAuthType.OIDC }}
        />
      </div>
      <Radio
        name="radio-buttons"
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
  identityProviderType: IDPProviderType
  authType: IDPAuthType
  name: string
}

const initialAddIDPPrepareForm = {
  type: IDPType.COMPANY,
  identityProviderType: IDPProviderType.MANAGED,
  authType: IDPAuthType.OIDC,
  name: '',
}

const AddIDPPrepareForm = ({
  onChange,
}: {
  onChange: (value: AddIDPPrepareFormType) => void
}) => {
  const { t } = useTranslation('idp')
  const [formData, setFormData] = useState<AddIDPPrepareFormType>(
    initialAddIDPPrepareForm
  )

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
      <SelectIdpAuthType
        onChange={(value) => {
          const currentData = { ...formData }
          currentData.authType = value
          setFormData(currentData)
          onChange(currentData)
        }}
      />
    </>
  )
}

export const AddOsp = () => {
  const { t } = useTranslation('osp')
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<AddIDPPrepareFormType>(
    initialAddIDPPrepareForm
  )
  const [loading, setLoading] = useState(false)
  const [addIdp] = useAddIDPMutation()
  const [updateIdp] = useUpdateIDPMutation()

  const doCreateIDP = async () => {
    setLoading(true)
    try {
      const idp = await addIdp({
        protocol: formData.authType,
        identityProviderTypeId: formData.identityProviderType,
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
      error(t('add.error'), t('state.error'), err as object)
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
          <Stepper list={AddStepsList} showSteps={3} activeStep={1} />
        </div>
        <Trans>
          <Typography variant="label3">{t('add.desc')}</Typography>
        </Trans>
        <AddIDPPrepareForm
          onChange={(data) => {
            setFormData(data)
          }}
        />
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0088CC',
            textDecoration: 'underline',
          }}
        >
          <HelpOutlineIcon
            sx={{
              fontSize: '18px',
              marginRight: '5px',
            }}
          />
          {t('add.learnMore')}
        </Typography>
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
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            disabled={
              !formData.name
            }
            onClick={() => doCreateIDP()}
          >
            {t('action.createIdp')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
