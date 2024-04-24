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
import { t } from 'i18next'
import { useState } from 'react'
import { SiteForm } from './CreateSite/SiteForm'
import { AddressForm } from './CreateAddress/AddressForm'

export default function FormDetails({
  id,
  open,
  title,
  description,
  handleClose,
  isAddress = false,
  handleConfirm,
}: {
  id: string
  open: boolean
  title: string
  description: string
  handleClose: () => void
  isAddress?: boolean
  handleConfirm: () => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = () => {
    setLoading(true)
    // if(isAddress) {
    //     // api call to create new
    // } else {
    //     // api call to create new
    // }
    setLoading(false)
    handleConfirm()
  }
  return (
    <Box>
      <Dialog open={open}>
        <DialogHeader
          title={title}
          intro={description}
          closeWithIcon={true}
          onCloseWithIcon={() => {}}
        />
        <DialogContent>
          {isAddress ? (
            <AddressForm onValid={console.log} />
          ) : (
            <SiteForm onValid={console.log} />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {t('global.actions.cancel')}
          </Button>
          {!loading && (
            <Button variant="contained" onClick={handleSubmit}>
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
