/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  CircleProgress,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
import { useState } from 'react'
import { FormFields } from './FormFields'
import { useTranslation } from 'react-i18next'
import {
  AddressType,
  type CompanyDataType,
  useUpdateCompanySiteAndAddressMutation,
  type CompanyDataFieldsType,
  type SharingStateType,
} from 'features/companyData/companyDataApiSlice'
import { useSelector } from 'react-redux'
import {
  companyDataInitialData,
  companyDataSelector,
} from 'features/companyData/slice'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { cloneDeep } from 'lodash'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'

interface FormDetailsProps {
  readonly open: boolean
  readonly description?: string
  readonly handleClose: () => void
  readonly isAddress?: boolean
  readonly handleConfirm: () => void
  readonly newForm?: boolean
  readonly errorInfo?: SharingStateType
}

export default function EditForm({
  open,
  description,
  handleClose,
  isAddress = false,
  newForm = false,
  handleConfirm,
  errorInfo,
}: FormDetailsProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [updateData] = useUpdateCompanySiteAndAddressMutation()
  const companyData = useSelector(companyDataSelector)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const handleSubmit = () => {
    setLoading(true)
    handleCreation()
  }
  const { data: companyInfo } = useFetchOwnCompanyDetailsQuery('', {
    skip: !newForm,
  })
  const [input, setInput] = useState<CompanyDataType>(companyDataInitialData)
  const inputParams = cloneDeep(newForm ? companyDataInitialData : companyData)

  if (companyInfo) {
    inputParams.externalId = `${companyInfo?.bpn}_${new Date().toISOString()}`
    inputParams.legalEntity.legalEntityBpn = companyInfo?.bpn
    inputParams.legalEntity.legalName = companyInfo?.name
    inputParams.legalEntity.shortName = companyInfo?.shortName
  }
  const getFilledData = (form: { body: CompanyDataFieldsType }) => {
    inputParams.address.physicalPostalAddress.postalCode = form.body.postalCode
    inputParams.address.physicalPostalAddress.city = form.body.city
    inputParams.address.physicalPostalAddress.country = form.body.countryCode
    inputParams.address.physicalPostalAddress.street.name = form.body.street
    setInput(inputParams)
  }

  const handleSiteValidation = (
    form: { body: CompanyDataFieldsType } | undefined
  ) => {
    setIsValid(form !== undefined)
    if (form) {
      inputParams.site.name = form.body.siteName
      inputParams.address.addressType = AddressType.SiteMainAddress
      getFilledData(form)
    }
  }

  const handleAddressValidation = (
    form: { body: CompanyDataFieldsType } | undefined
  ) => {
    setIsValid(form !== undefined)
    if (form) {
      inputParams.site.name = form.body.siteName
      inputParams.address.addressType = AddressType.AdditionalAddress
      inputParams.identifiers.push({
        type: form.body.countryIdentifier,
        value: form.body.identifierNumber,
        issuingBody: null,
      })
      getFilledData(form)
    }
  }

  const handleCreation = async () => {
    try {
      await updateData([input])
        .unwrap()
        .then(() => {
          setSuccess(true)
        })
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  const getTitle = () =>
    isAddress
      ? t('content.companyData.address.title')
      : t('content.companyData.site.title')
  const getEditTitle = () =>
    isAddress
      ? t('content.companyData.address.editTitle')
      : t('content.companyData.site.editTitle')

  return (
    <Box>
      <Dialog open={open}>
        <DialogHeader
          title={newForm ? getTitle() : getEditTitle()}
          intro={description}
          closeWithIcon={true}
          onCloseWithIcon={handleClose}
        />
        <DialogContent>
          <FormFields
            newForm={newForm}
            onValid={(form: { body: CompanyDataFieldsType } | undefined) => {
              //to fix sonarcloud issue, earlier code is rewritten as below, which was initially->isAddress ? handleAddressValidation(form) : handleSiteValidation(form)
              ;(isAddress ? handleAddressValidation : handleSiteValidation)(
                form
              )
            }}
            isAddress={isAddress}
          />
          {errorInfo && (
            <Typography
              variant="body1"
              sx={{
                fontSize: '18px',
                color: '#d32f2f',
              }}
            >
              {errorInfo.sharingErrorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {t('global.actions.cancel')}
          </Button>
          {!loading && (
            <Button
              disabled={!isValid}
              variant="contained"
              onClick={handleSubmit}
            >
              {t('global.actions.confirm')}
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
      {success && (
        <ServerResponseOverlay
          title={
            isAddress
              ? t('content.companyData.success.title').replace(
                  '{name}',
                  'address'
                )
              : t('content.companyData.success.title').replace('{name}', 'site')
          }
          intro={t('content.companyData.success.description')}
          dialogOpen={true}
          handleCallback={() => {
            handleConfirm()
            setSuccess(false)
            handleClose()
          }}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      {error && (
        <ServerResponseOverlay
          title={
            isAddress
              ? t('content.companyData.error.title').replace(
                  '{name}',
                  'address'
                )
              : t('content.companyData.error.title').replace('{name}', 'site')
          }
          intro={t('content.companyData.error.description')}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
          handleCallback={() => {
            setError(false)
          }}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
    </Box>
  )
}
