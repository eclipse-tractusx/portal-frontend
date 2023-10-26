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
  Stepper,
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

const OSPAddPrepareForm = ({
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
    </>
  )
}

export const OSPAdd = () => {
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

  const steps = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
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
          <Stepper list={steps} showSteps={3} activeStep={1} />
        </div>
        <Trans>
          <Typography variant="label3">{t('add.desc')}</Typography>
        </Trans>
        <OSPAddPrepareForm
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
