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
  DialogActions,
  DialogContent,
  DialogHeader,
  CircleProgress,
} from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay/actions'
import { useForm } from 'react-hook-form'
import { DefaultFormFieldValuesType } from './TechnicalUserAddForm'
import {
  ServiceAccountDetail,
  ServiceAccountType,
  useAddServiceAccountMutation,
} from 'features/admin/serviceApiSlice'
import { TechnicalUserAddForm } from 'components/overlays/AddTechnicalUser/TechnicalUserAddForm'
import { useState } from 'react'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { UserDetailCard } from 'components/shared/basic/UserDetailInfo/UserDetailCard'
import { ServerResponseOverlay } from '../ServerResponse'

export const AddTechnicalUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [response, setResponse] = useState<ServiceAccountDetail>()
  const [addServiceAccount] = useAddServiceAccountMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = async (formValues: DefaultFormFieldValuesType) => {
    setLoading(true)
    try {
      const result = await addServiceAccount({
        name: formValues.TechnicalUserName,
        description: formValues.TechnicalUserDescription,
        authenticationType: ServiceAccountType.SECRET,
        roleIds: [formValues.TechnicalUserService],
      }).unwrap()
      console.log(result)
      setResponse(result)
      setLoading(false)
      dispatch(updateData(UPDATES.TECHUSER_LIST))
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
    //openAddTechnicalUserResponseOverlay()
  }

  const userDetailsData = {
    cardCategory: 'Single Point of Contact (SPoC):',
    cardContentItems: {
      organizsationName: { label: 'Organization name', value: 'BMW' },
      username: { label: 'Username', value: 'Max Mustermann' },
      eMailAddress: { label: 'E-Mail Address', value: 'test@test.de' },
    },
  }

  const defaultFormFieldValues = {
    TechnicalUserName: '',
    TechnicalUserService: 'none',
    TechnicalUserDescription: '',
  }
  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormFieldValues,
    mode: 'onChange',
  })

  const onFormSubmit = async () => {
    const validateFields = await trigger([
      'TechnicalUserName',
      'TechnicalUserService',
      'TechnicalUserDescription',
    ])

    if (validateFields) {
      const formValues = getValues() as DefaultFormFieldValuesType
      handleConfirm(formValues)
    }
  }

  const formHasErrors = () => {
    return Object.keys(errors).length > 0
  }

  return (
    <>
      {response ? (
        <ServerResponseOverlay
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadlineSuccess')}
          dialogOpen={true}
          handleCallback={() => dispatch(closeOverlay())}
        >
          <UserDetailCard
            cardContentItems={{
              clientId: { label: 'Client ID', value: response.clientId },
              userName: { label: 'UserName', value: response.name },
              authType: {
                label: 'Auth Type',
                value: response.authenticationType,
              },
              clientSecret: {
                label: 'Client Secret',
                value: response.secret,
              },
            }}
            variant="wide"
          />
        </ServerResponseOverlay>
      ) : (
        <>
          <DialogHeader
            title={t('content.addUser.technicalUserHeadline')}
            intro={t('content.addUser.technicalUserSubheadline')}
            closeWithIcon={true}
            onCloseWithIcon={() => dispatch(closeOverlay())}
          />
          <DialogContent>
            <TechnicalUserAddForm
              {...{ handleSubmit, control, errors, trigger }}
            />
            <Box sx={{ paddingTop: '25px' }}>
              <UserDetailCard
                cardContentItems={userDetailsData.cardContentItems}
                variant="wide"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.cancel')}
            </Button>
            {loading ? (
              <span
                style={{
                  width: '100px',
                  textAlign: 'center',
                }}
              >
                <CircleProgress
                  size={40}
                  step={1}
                  interval={0.1}
                  colorVariant={'primary'}
                  variant={'indeterminate'}
                  thickness={8}
                />
              </span>
            ) : (
              <Button
                variant="contained"
                onClick={onFormSubmit}
                disabled={formHasErrors()}
              >
                {t('global.actions.confirm')}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </>
  )
}
