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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  CircleProgress,
  Typography,
} from '@catena-x/portal-shared-components'
import ConnectorTypeSelection from './components/ConnectorTypeSelection'
import ConnectorInsertForm from './components/ConnectorInsertForm'
import { useForm } from 'react-hook-form'
import {
  type ConnectorType,
  useFetchOfferSubscriptionsQuery,
  ConnectType,
} from 'features/connector/connectorApiSlice'
import Box from '@mui/material/Box'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import {
  type ServiceAccountListEntry,
  useFetchServiceAccountUsersQuery,
} from 'features/admin/serviceApiSlice'

interface AddCollectorOverlayProps {
  openDialog?: boolean
  connectorStep: number
  handleOverlayClose: () => void
  handleConfirmClick: (data: ConnectorType) => void
  onFormConfirmClick: (data: FormFieldsType) => void
  loading?: boolean
  onStepChange: () => void
  onSubmitClick: (data: FormFieldsType) => void
  newUserLoading?: boolean
  newUserSuccess?: boolean
}

export type FormFieldsType = {
  ConnectorName: string
  ConnectorURL: string
  ConnectorSubscriptionId: string
  ConnectorLocation: string
  ConnectorTechnicalUser: string
  TechnicalUserName: string
  TechnicalUserDescription: string
}

const formFields = {
  ConnectorName: '',
  ConnectorURL: '',
  ConnectorLocation: '',
  ConnectorSubscriptionId: '',
  ConnectorTechnicalUser: '',
  TechnicalUserName: '',
  TechnicalUserDescription: '',
}

export enum ConnectorFormFields {
  ConnectorSubscriptionId = 'ConnectorSubscriptionId',
  ConnectorTechnicalUser = 'ConnectorTechnicalUser',
  ConnectorLocation = 'ConnectorLocation',
  ConnectorURL = 'ConnectorURL',
  ConnectorName = 'ConnectorName',
}

const AddConnectorOverlay = ({
  openDialog = false,
  connectorStep,
  handleOverlayClose,
  handleConfirmClick,
  onFormConfirmClick,
  loading,
  onStepChange,
  onSubmitClick,
  newUserLoading,
  newUserSuccess,
}: AddCollectorOverlayProps) => {
  const { t } = useTranslation()
  const { data } = useFetchOfferSubscriptionsQuery()
  const { data: ownCompanyDetails } = useFetchOwnCompanyDetailsQuery('')
  const [page, setPage] = useState<number>(0)
  const { data: serviceAccounts } = useFetchServiceAccountUsersQuery(page)
  const [newTechnicalUSer, setNewTechnicalUSer] = useState(false)
  const [allAccounts, setAllAccounts] = useState<ServiceAccountListEntry[]>([])

  const {
    handleSubmit,
    getValues,
    control,
    resetField,
    trigger,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: formFields,
    mode: 'onChange',
  })

  const [selected, setSelected] = useState<ConnectorType>({})

  useEffect(() => {
    if (openDialog || connectorStep === 0) {
      reset(formFields)
    }
  }, [openDialog, reset, connectorStep])

  useEffect(() => {
    if (serviceAccounts && serviceAccounts?.meta?.totalPages > page) {
      setPage((pre) => pre + 1)
      setAllAccounts((i: ServiceAccountListEntry[]) =>
        i.concat(serviceAccounts?.content)
      )
    }
  }, [serviceAccounts])

  const onFormSubmit = async () => {
    const validateFields =
      newTechnicalUSer && !newUserSuccess
        ? await trigger(['TechnicalUserName', 'TechnicalUserDescription'])
        : await trigger([
            ConnectorFormFields.ConnectorName,
            ConnectorFormFields.ConnectorURL,
            ConnectorFormFields.ConnectorLocation,
            ConnectorFormFields.ConnectorSubscriptionId,
            ConnectorFormFields.ConnectorTechnicalUser,
          ])
    if (validateFields) {
      newTechnicalUSer && !newUserSuccess
        ? onSubmitClick(getValues() as FormFieldsType)
        : onFormConfirmClick(getValues() as FormFieldsType)
    }
  }

  const onSelect = (service: ConnectorType) => {
    setSelected(service)
  }

  const getTypeKey = (type: ConnectType | undefined) => {
    if (connectorStep === 1) {
      return type === ConnectType.MANAGED_CONNECTOR ? 'managed.' : 'company.'
    } else return ''
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width:
            connectorStep === 1 &&
            selected.type === ConnectType.COMPANY_CONNECTOR
              ? '65%'
              : '45%',
        }}
      >
        <DialogHeader
          title={t(
            `content.edcconnector.modal.${getTypeKey(selected.type)}title`
          )}
          intro={
            connectorStep === 1 &&
            selected.type === ConnectType.COMPANY_CONNECTOR ? (
              <Typography variant="body1">
                {t(
                  `content.edcconnector.modal.${getTypeKey(selected.type)}intro`
                )}
              </Typography>
            ) : (
              t(`content.edcconnector.modal.${getTypeKey(selected.type)}intro`)
            )
          }
          closeWithIcon={true}
          onCloseWithIcon={() => {
            setSelected({})
            handleOverlayClose()
          }}
        />
        <DialogContent
          sx={{
            padding: '0px 120px 40px 120px',
          }}
        >
          {connectorStep === 0 ? (
            <>
              <ConnectorTypeSelection
                ownCompanyDetails={ownCompanyDetails}
                selectedServiceCallback={onSelect}
              />
            </>
          ) : (
            <>
              <ConnectorInsertForm
                subscriptions={data}
                selectedService={selected}
                fetchServiceAccountUsers={allAccounts}
                onFormSubmitt={onFormSubmit}
                setNewTechnicalUSer={setNewTechnicalUSer}
                newUserLoading={newUserLoading}
                newUserSuccess={newUserSuccess}
                {...{
                  handleSubmit,
                  control,
                  errors,
                  trigger,
                  getValues,
                  resetField,
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              if (connectorStep === 1) onStepChange()
              else handleOverlayClose()
              setSelected({})
            }}
          >
            {connectorStep === 0
              ? `${t('global.actions.cancel')}`
              : `${t('global.actions.back')}`}
          </Button>
          {!loading && (
            <Button
              variant="contained"
              disabled={!(selected?.id && isValid)}
              onClick={() => {
                connectorStep === 0 && selected?.id
                  ? handleConfirmClick(selected)
                  : onFormSubmit()
              }}
            >
              {connectorStep === 0
                ? `${t('global.actions.next')}`
                : `${t('global.actions.confirm')}`}
            </Button>
          )}
          {loading && (
            <Box
              sx={{
                width: '110px',
                display: 'flex',
                justifyContent: 'center',
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
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddConnectorOverlay
