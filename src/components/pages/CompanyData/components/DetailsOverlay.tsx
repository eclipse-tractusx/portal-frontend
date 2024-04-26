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
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import AddressDetails from './CreateAddress/AddressDetails'
import SiteDetails from './CreateSite/SiteDetails'
import { useState } from 'react'
import EditForm from './EditForm'
import { t } from 'i18next'

interface FormDetailsProps {
  readonly id?: string
  readonly open: boolean
  readonly title: string
  readonly description?: string
  readonly handleClose: () => void
  readonly isAddress?: boolean
  readonly handleConfirm: () => void
}

export default function DetailsOverlay({
  id,
  open,
  title,
  description,
  handleClose,
  isAddress = false,
  handleConfirm,
}: FormDetailsProps) {
  const [edit, setEdit] = useState<boolean>(!open)
  const onEdit = () => {
    setEdit(true)
  }
  console.log(id)
  return (
    <Box>
      {edit && (
        <EditForm
          isAddress={isAddress}
          open={true}
          id={'abcd'}
          title={
            isAddress
              ? t('content.companyData.address.title')
              : t('content.companyData.site.title')
          }
          description={t('content.companyData.address.description')}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
      )}
      <Dialog open={!edit}>
        <DialogHeader
          title={title}
          intro={description}
          closeWithIcon={true}
          onCloseWithIcon={handleClose}
        />
        <DialogContent>
          {isAddress ? (
            <AddressDetails onEdit={onEdit} />
          ) : (
            <SiteDetails onEdit={onEdit} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
