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

import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { MultiSelectListProps } from '..'
import { Input } from '../../Input'

interface SelectInputProps
  extends Omit<
    MultiSelectListProps,
    | 'items'
    | 'onAddItem'
    | 'buttonAddMore'
    | 'notItemsText'
    | 'filterOptionsArgs'
  > {
  params: AutocompleteRenderInputParams
  autoFocus?: boolean
}

export const SelectInput = ({
  params,
  label,
  placeholder,
  variant,
  margin,
  focused,
  helperText,
  error = false,
  disabled,
  autoFocus,
}: SelectInputProps) => (
  <Box
    sx={{
      '.MuiFilledInput-root': {
        paddingTop: '0px !important',
        minHeight: '55px',
      },
    }}
  >
    <Input
      {...params}
      label={label}
      placeholder={placeholder}
      variant={variant}
      helperText={helperText}
      error={error}
      margin={margin}
      focused={focused}
      disabled={disabled}
      autoFocus={autoFocus}
    />
  </Box>
)
