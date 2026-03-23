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
} from '@arena2036/portal-shared-components-construct-x'
import { Box, Divider } from '@mui/material'
import { useState } from 'react'
import StatusInformation from './StatusInformation'
import CompanyInfo from './CompanyInfo'
import {
  companyDataSelector,
  sharingStateInfoSelector,
} from 'features/companyData/slice'
import { useSelector } from 'react-redux'
import EditForm from './EditForm'
import { AddressType } from 'features/companyData/companyDataApiSlice'
import SiteDetails from './SiteDetails'
import AddressDetails from './AddressDetails'

interface FormDetailsProps {
  readonly open: boolean
  readonly title?: string
  readonly description?: string
  readonly handleClose: () => void
  readonly handleConfirm: () => void
}

export default function DetailsOverlay({
  open,
  title,
  description,
  handleClose,
  handleConfirm,
}: FormDetailsProps) {
  const [edit, setEdit] = useState<boolean>(!open)
  const onEdit = () => {
    setEdit(true)
  }
  const companyData = useSelector(companyDataSelector)
  const sharingStateErrorInfo = useSelector(sharingStateInfoSelector)
  const isSite = companyData.address.addressType === AddressType.SiteMainAddress
  return (
    <Box>
      <Dialog open={!edit}>
        <DialogHeader
          title={title}
          intro={description}
          closeWithIcon={true}
          onCloseWithIcon={handleClose}
        />
        <DialogContent>
          <StatusInformation error={sharingStateErrorInfo} />
          <Divider
            sx={{
              borderColor: '#111111',
              margin: '0px 5%',
            }}
          />
          <CompanyInfo />
          <Divider
            sx={{
              borderColor: '#111111',
              margin: '0px 5%',
            }}
          />
          {isSite ? (
            <SiteDetails onEdit={onEdit} />
          ) : (
            <AddressDetails onEdit={onEdit} />
          )}
        </DialogContent>
      </Dialog>
      {edit && (
        <EditForm
          isAddress={!isSite}
          handleClose={handleClose}
          open={edit}
          handleConfirm={handleConfirm}
          errorInfo={sharingStateErrorInfo}
        />
      )}
    </Box>
  )
}
