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

import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  DropArea,
  type DropAreaProps,
  Input,
  Radio,
  SelectList,
  Tooltips,
  Typography,
} from '@cofinity-x/shared-components'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Patterns from 'types/Patterns'
import {
  ConnectType,
  type EdcSubscriptionsType,
} from 'features/connector/connectorApiSlice'
import { Dropzone } from '../../../shared/basic/Dropzone'
import { useEffect, useState } from 'react'
import './style.scss'
import { ConnectorFormFields } from '.'
import { type ServiceAccountListEntry } from 'features/admin/serviceApiSlice'
import { OVERLAYS } from 'types/Constants'
import { PAGES } from 'types/cfx/Constants'

export const ConnectorFormInput = ({
  control,
  trigger,
  errors,
  helperText,
  label,
  placeholder,
  name,
  rules,
  tooltipMsg,
  type,
  dropzoneProps,
  defaultSelectValue,
  items,
  keyTitle,
  minLength,
  maxLength,
  pattern,
  disable = false,
  dataTestId,
}: // Add an ESLint exception until there is a solution
// eslint-disable-next-line
any) => {
  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="normal" />
  }

  return (
    <>
      {type === 'dropzone' && (
        <>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              marginTop: '25px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: '14px',
                color: '#111111',
                fontWeight: '400',
                paddingRight: '10px',
              }}
            >
              {label}
            </Typography>

            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="top-start"
              tooltipText={tooltipMsg}
            >
              <span>
                <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
              </span>
            </Tooltips>
          </div>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange } }) => (
              <Dropzone
                acceptFormat={dropzoneProps.accept}
                maxFilesToUpload={1}
                onChange={([file]) => {
                  trigger(name)
                  onChange(file)
                }}
                errorText={helperText}
                DropStatusHeader={false}
                DropArea={renderDropArea}
              />
            )}
          />
        </>
      )}
      {type === 'input' && (
        <Controller
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                data-testid={dataTestId}
                tooltipMessage={tooltipMsg}
                sx={{
                  paddingTop: '10px',
                }}
                error={!!errors[name]}
                helperText={errors?.[name]?.message}
                label={label}
                placeholder={placeholder}
                onChange={(event) => {
                  trigger(name)
                  onChange(event)
                }}
                value={value}
                disabled={disable}
              />
            )
          }}
          name={name}
          control={control}
          rules={{
            required: {
              value: true,
              message: rules.required,
            },
            minLength: {
              value: minLength,
              message: rules.minLength,
            },
            pattern: {
              value: pattern,
              message: rules.pattern,
            },
            maxLength: {
              value: maxLength,
              message: rules.maxLength,
            },
          }}
        />
      )}
      {type === 'select' && (
        <>
          <div
            style={{
              display: 'flex',
              marginBottom: '-15px',
              marginTop: '25px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: '14px',
                color: errors[name] ? '#d32f2f' : '#111111',
                fontWeight: '400',
                paddingRight: '10px',
              }}
            >
              {label}
            </Typography>

            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="top-start"
              tooltipText={tooltipMsg}
            >
              <span>
                <HelpOutlineIcon
                  sx={{ color: '#B6B6B6', marginTop: '-2px' }}
                  fontSize={'small'}
                />
              </span>
            </Tooltips>
          </div>
          <Controller
            render={({ field: { onChange } }) => {
              return (
                <SelectList
                  data-testid="select-existing-technical-user"
                  error={!!errors[name]}
                  helperText={helperText}
                  defaultValue={defaultSelectValue}
                  items={items}
                  label={''}
                  placeholder={placeholder}
                  onChangeItem={(e) => {
                    onChange(
                      name === ConnectorFormFields.ConnectorTechnicalUser
                        ? e.serviceAccountId
                        : e.subscriptionId
                    )
                  }}
                  keyTitle={keyTitle}
                />
              )
            }}
            name={name}
            control={control}
            rules={rules}
          />
        </>
      )}
    </>
  )
}

// Pass Regex useless escape

const ConnectorInsertForm = ({
  handleSubmit,
  errors,
  control,
  trigger,
  getValues,
  resetField,
  selectedService,
  subscriptions,
  fetchServiceAccountUsers,
  setIsExistingTechUser,
}: // Add an ESLint exception until there is a solution
// eslint-disable-next-line
any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState<string>()
  const [serviceAccountUsers, setServiceAccountUsers] = useState([])
  const [selectedTechnicalUser, setSelectedTechnicalUser] = useState({})
  const [selectedCustomerLink, setSelectedCustomerLink] = useState({})

  useEffect(() => {
    if (fetchServiceAccountUsers)
      setServiceAccountUsers(
        fetchServiceAccountUsers?.filter(
          (item: { name: string; offer: unknown; connector: unknown }) =>
            item.offer == null && item.connector == null && item.name
        )
      )
  }, [fetchServiceAccountUsers])

  useEffect(() => {
    const selectedConnectorTechnicalUser: ServiceAccountListEntry[] =
      serviceAccountUsers?.filter(
        (i: { serviceAccountId: string }) =>
          i.serviceAccountId === getValues().ConnectorTechnicalUser
      )
    if (selectedConnectorTechnicalUser.length > 0) {
      setSelectedTechnicalUser(selectedConnectorTechnicalUser[0])
    }
  }, [serviceAccountUsers])

  useEffect(() => {
    const selectedCustomer: EdcSubscriptionsType[] = subscriptions?.filter(
      (item: { subscriptionId: string }) =>
        item.subscriptionId === getValues().ConnectorSubscriptionId
    )
    if (selectedCustomer.length > 0) {
      setSelectedCustomerLink(selectedCustomer[0])
    }
  }, [subscriptions])

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        {selectedService.type === ConnectType.COMPANY_CONNECTOR && (
          <>
            <Box
              className="stepNumber"
              sx={{ margin: '8px auto 16px', color: '#0f71cb' }}
            >
              <Typography variant="h5" sx={{ color: '#0f71cb' }}>
                1
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ margin: 'auto', textAlign: 'center', mb: 1 }}
            >
              {t('content.edcconnector.modal.technicalUser')}
            </Typography>

            <Box>
              <Radio
                data-testid="connector-existing-user-radio"
                name="radio-buttons"
                label={t(
                  'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                )}
                checked={
                  selectedValue ===
                  t(
                    'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                  )
                }
                value={t(
                  'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
                )}
                onChange={(event) => {
                  setSelectedValue(event.target.value)
                  setIsExistingTechUser(true)
                  resetField('TechnicalUserName', {
                    defaultValue: '',
                  })
                  resetField('TechnicalUserDescription', {
                    defaultValue: '',
                  })
                }}
                size="small"
                sx={{
                  display: 'flex !important',
                }}
              />
            </Box>
            {selectedValue ===
              t(
                'content.edcconnector.modal.connectAlreadyExistingTechnicalUser'
              ) && (
              <ConnectorFormInput
                {...{
                  control,
                  trigger,
                  errors,
                  type: 'select',
                  name: ConnectorFormFields.ConnectorTechnicalUser,
                  rules: {
                    required: true,
                  },
                  label: t(
                    'content.edcconnector.modal.insertform.technicalUser.label'
                  ),
                  placeholder: t(
                    'content.edcconnector.modal.insertform.technicalUser.placeholder'
                  ),
                  tooltipMsg: t(
                    'content.edcconnector.modal.insertform.technicalUser.tooltipMsg'
                  ),
                  helperText: t(
                    'content.edcconnector.modal.insertform.technicalUser.error'
                  ),
                  items: serviceAccountUsers,
                  defaultSelectValue: selectedTechnicalUser ?? {},
                  keyTitle: 'name',
                }}
              />
            )}
            <Box sx={{ mt: 2 }}>
              <Radio
                data-testid="connector-new-user-radio"
                name="radio-buttons"
                label={t('content.edcconnector.modal.createNewTechnicalUser')}
                checked={
                  selectedValue ===
                  t('content.edcconnector.modal.createNewTechnicalUser')
                }
                value={t('content.edcconnector.modal.createNewTechnicalUser')}
                onChange={(event) => {
                  setIsExistingTechUser(false)
                  setSelectedValue(event.target.value)
                }}
                size="small"
                sx={{
                  display: 'flex !important',
                }}
              />
            </Box>
            {selectedValue ===
              t('content.edcconnector.modal.createNewTechnicalUser') && (
              <div className="create-technical-user">
                <Typography variant="body3" className="margin-bottom-typo">
                  {t(
                    'content.edcconnector.modal.createNewTechnicalUserDescription'
                  )}
                </Typography>
                <Button
                  data-testid="technical-user-add-button"
                  size="small"
                  sx={{ backgroundColor: '#4D4D4D' }}
                  onClick={() => {
                    navigate(
                      `/${PAGES.TECH_USER_MANAGEMENT}?overlay=${OVERLAYS.ADD_TECH_USER}`,
                      {
                        state: { triggerEvent: true },
                      }
                    )
                  }}
                >
                  {t('content.edcconnector.modal.createNewTechnicalUserBtn')}
                </Button>
              </div>
            )}
            <Box
              className="stepNumber"
              sx={{ margin: '16px auto', color: '#0f71cb' }}
            >
              <Typography variant="h5" sx={{ color: '#0f71cb' }}>
                2
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ margin: 'auto', textAlign: 'center', mb: 1 }}
            >
              {t('content.edcconnector.modal.connectorRegistrationDetails')}
            </Typography>
          </>
        )}
        <ConnectorFormInput
          {...{
            dataTestId: 'connector-name-input',
            control,
            trigger,
            errors,
            type: 'input',
            name: ConnectorFormFields.ConnectorName,
            minLength: 2,
            maxLength: 20,
            pattern: Patterns.connectors.NAME,
            rules: {
              required: t(
                'content.edcconnector.modal.insertform.name.mandatoryError'
              ),
              minLength:
                t('content.edcconnector.modal.insertform.minLength') + ' 2',
              maxLength:
                t('content.edcconnector.modal.insertform.maxLength') + ' 20',
              pattern: t(
                'content.edcconnector.modal.insertform.name.patternError'
              ),
            },
            label: t('content.edcconnector.modal.insertform.name.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.name.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.name.tooltipMsg'
            ),
          }}
        />
        <ConnectorFormInput
          {...{
            dataTestId: 'connector-endpoint-input',
            control,
            trigger,
            errors,
            type: 'input',
            name: ConnectorFormFields.ConnectorURL,
            pattern: Patterns.URL,
            rules: {
              required: t(
                'content.edcconnector.modal.insertform.url.mandatoryError'
              ),
              pattern: t(
                'content.edcconnector.modal.insertform.url.patternError'
              ),
            },
            label: t('content.edcconnector.modal.insertform.url.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.url.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.url.tooltipMsg'
            ),
          }}
        />
        <ConnectorFormInput
          {...{
            dataTestId: 'connector-location-input',
            control,
            trigger,
            errors,
            type: 'input',
            name: ConnectorFormFields.ConnectorLocation,
            pattern: Patterns.connectors.COUNTRY,
            rules: {
              required: t(
                'content.edcconnector.modal.insertform.country.mandatoryError'
              ),
              pattern: t(
                'content.edcconnector.modal.insertform.country.patternError'
              ),
            },
            label: t('content.edcconnector.modal.insertform.country.label'),
            placeholder: t(
              'content.edcconnector.modal.insertform.country.placeholder'
            ),
            tooltipMsg: t(
              'content.edcconnector.modal.insertform.country.tooltipMsg'
            ),
          }}
        />
        {selectedService &&
          selectedService.type === ConnectType.MANAGED_CONNECTOR && (
            <ConnectorFormInput
              {...{
                control,
                trigger,
                errors,
                type: 'select',
                name: ConnectorFormFields.ConnectorSubscriptionId,
                rules: {
                  required: true,
                },
                label: t(
                  'content.edcconnector.modal.insertform.subscription.label'
                ),
                placeholder: t(
                  'content.edcconnector.modal.insertform.subscription.placeholder'
                ),
                tooltipMsg: t(
                  'content.edcconnector.modal.insertform.subscription.tooltipMsg'
                ),
                helperText: t(
                  'content.edcconnector.modal.insertform.subscription.error'
                ),
                items: subscriptions,
                defaultSelectValue: selectedCustomerLink ?? {},
                keyTitle: 'name',
              }}
            />
          )}
      </form>
    </Box>
  )
}

export default ConnectorInsertForm
