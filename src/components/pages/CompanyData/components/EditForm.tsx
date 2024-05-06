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
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useState } from 'react'
import { SiteForm } from './CreateSite/SiteForm'
import { AddressForm } from './CreateAddress/AddressForm'
import { useTranslation } from 'react-i18next'
import {
  type CompanyDataAddressType,
  type CompanyDataSiteType,
} from 'features/companyData/companyDataApiSlice'

interface FormDetailsProps {
  readonly open: boolean
  readonly title: string
  readonly description?: string
  readonly handleClose: () => void
  readonly isAddress?: boolean
  readonly handleConfirm: () => void
  readonly newForm?: boolean
}

export default function EditForm({
  open,
  title,
  description,
  handleClose,
  isAddress = false,
  handleConfirm,
  newForm = false,
}: FormDetailsProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [isValid, setValid] = useState<boolean>(false)
  const handleSubmit = () => {
    setLoading(false)
    handleConfirm()
  }
  const handleSiteValidation = (
    form: { body: CompanyDataSiteType } | undefined
  ) => {
    console.log(form)
    setValid(form ? true : false)
  }

  const handleAddressValidation = (
    form: { body: CompanyDataAddressType } | undefined
  ) => {
    console.log(form)
    setValid(form ? true : false)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogHeader
          title={title}
          intro={description}
          closeWithIcon={true}
          onCloseWithIcon={handleClose}
        />
        <DialogContent>
          {isAddress ? (
            <AddressForm newForm={newForm} onValid={handleAddressValidation} />
          ) : (
            <SiteForm newForm={newForm} onValid={handleSiteValidation} />
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
    </Box>
  )
}
