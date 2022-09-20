/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Button } from '../Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export interface BackButtonProps {
  backButtonLabel?: string
  backButtonVariant?: 'text' | 'outlined' | 'contained'
  onBackButtonClick?: React.MouseEventHandler
}

export const BackButton = ({
  backButtonLabel,
  backButtonVariant,
  onBackButtonClick,
}: BackButtonProps) => {
  return (
    <>
      {backButtonLabel && (
        <Button
          onClick={onBackButtonClick}
          color="secondary"
          variant={backButtonVariant}
          size="small"
          sx={{
            width: 'fit-content',
            marginRight: '24px',
            padding: '4px 12px !important',
          }}
        >
          <ArrowBackIcon sx={{ marginRight: '5px' }} /> {backButtonLabel}
        </Button>
      )}
    </>
  )
}
