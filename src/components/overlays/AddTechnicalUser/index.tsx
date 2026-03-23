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
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  CircleProgress,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useForm } from 'react-hook-form'
import type { DefaultFormFieldValuesType } from './TechnicalUserAddForm'
import {
  type ServiceAccountDetail,
  ServiceAccountType,
  useAddServiceAccountMutation,
} from 'features/admin/serviceApiSlice'
import { TechnicalUserAddForm } from 'components/overlays/AddTechnicalUser/TechnicalUserAddForm'
import { updateData, UPDATES } from 'features/control/updates'
import { UserDetailCard } from 'components/shared/basic/UserDetailInfo/UserDetailCard'
import { ServerResponseOverlay } from '../ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import './style.scss'

export const AddTechnicalUser = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [response, setResponse] = useState<ServiceAccountDetail[]>()
  const [error, setError] = useState<boolean>(false)

  const [addServiceAccount] = useAddServiceAccountMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = async (formValues: DefaultFormFieldValuesType) => {
    setLoading(true)
    try {
      const result = await addServiceAccount({
        name: formValues.TechnicalUserName,
        description: formValues.TechnicalUserDescription,
        authenticationType: ServiceAccountType.SECRET,
        roleIds: formValues.TechnicalUserService,
      }).unwrap()
      setResponse(result)
      setLoading(false)
      setError(false)
      dispatch(updateData(UPDATES.TECHUSER_LIST))
    } catch (err) {
      console.log(err)
      setLoading(false)
      setError(true)
    }
    //openAddTechnicalUserResponseOverlay()
  }

  const defaultFormFieldValues = {
    TechnicalUserName: '',
    TechnicalUserService: [],
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
      void handleConfirm(formValues)
    }
  }

  const formHasErrors = () => {
    return Object.keys(errors).length > 0
  }

  const handleDispatch = useCallback(() => dispatch(closeOverlay()), [dispatch])

  return (
    <>
      {response && (
        <ServerResponseOverlay
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadlineSuccess')}
          dialogOpen={true}
          handleCallback={handleDispatch}
        >
          {response.map((data) => {
            return (
              <UserDetailCard
                cardContentItems={{
                  clientId: {
                    label: t('content.techUser.details.clientId'),
                    value: data.clientId,
                  },
                  userName: {
                    label: t('content.techUser.details.username'),
                    value: data.name,
                  },
                  authType: {
                    label: t('content.techUser.details.authType'),
                    value: data.authenticationType,
                  },
                  clientSecret: {
                    label: t('content.techUser.details.clientSercret'),
                    value: data.secret,
                  },
                }}
                variant="wide"
                key={data.clientId}
              />
            )
          })}
        </ServerResponseOverlay>
      )}

      {error && (
        <ServerResponseOverlay
          title={t('content.addUser.technicalUserHeadline')}
          intro={t('content.addUser.technicalUserSubheadlineError')}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
          handleCallback={handleDispatch}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}

      {!response && !error && (
        <>
          <DialogHeader
            title={t('content.addUser.technicalUserHeadline')}
            intro={t('content.addUser.technicalUserSubheadline')}
            closeWithIcon={true}
            onCloseWithIcon={handleDispatch}
          />
          <DialogContent>
            <Link
              to="/documentation/?path=user%2F03.+User+Management%2F03.+Technical+User"
              target="_blank"
            >
              <Typography variant="body2" className="helpText">
                <HelpOutlineIcon />
                {t('content.addUser.help')}
              </Typography>
            </Link>
            <TechnicalUserAddForm
              {...{ handleSubmit, control, errors, trigger }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleDispatch}>
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
