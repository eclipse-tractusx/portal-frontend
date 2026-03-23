/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import {
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useTranslation } from 'react-i18next'
import './style.scss'
import Box from '@mui/material/Box'

export default function DeleteObjectContent({
  header,
  subHeader,
  subHeaderTitle,
  subHeaderDescription,
  handleConfirm,
  subHeaderNote,
  confirmTitle,
  showLoader = false,
}: Readonly<{
  header?: string
  subHeader?: string
  subHeaderTitle?: string
  subHeaderDescription?: string
  handleConfirm?: () => void
  subHeaderNote?: string
  confirmTitle?: string
  showLoader?: boolean
}>) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      {header && <DialogHeader title={header} />}
      <DialogContent className="remove-object-content">
        {subHeader && (
          <SubHeaderTitle className="confirm" title={subHeader} variant="h6" />
        )}
        {subHeaderTitle && (
          <SubHeaderTitle title={subHeaderTitle} variant="h5" />
        )}
        {subHeaderDescription && (
          <SubHeaderTitle title={subHeaderDescription} variant="h5" />
        )}
        {subHeaderNote && <SubHeaderTitle title={subHeaderNote} variant="h5" />}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('global.actions.cancel')}
        </Button>
        {showLoader && (
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
        {!showLoader && (
          <Button variant="contained" onClick={handleConfirm}>
            {confirmTitle}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
