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

import { TextFieldProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { SelectInput } from '../MultiSelectList/Components/SelectInput'
import { SelectOptions } from '../MultiSelectList/Components/SelectOptions'
import uniqueId from 'lodash/uniqueId'

interface SelectListProps extends Omit<TextFieldProps, 'variant'> {
  items: any[]
  label: string
  placeholder: string
  popperHeight?: number
  variant?: 'filled'
  clearText?: string
  noOptionsText?: string
  onChangeItem: (items: any) => void
}

export const SelectList = ({
  items,
  label,
  placeholder,
  variant,
  margin,
  focused,
  helperText,
  error = false,
  disabled,
  popperHeight = 0,
  clearText = 'Clear',
  noOptionsText = 'No Options',
  onChangeItem,
}: SelectListProps) => {
  const selectHeight = popperHeight ? `${popperHeight}px` : 'auto'
  return (
    <Autocomplete
      id="singleSelectList"
      sx={{ width: '100%' }}
      clearText={clearText}
      noOptionsText={noOptionsText}
      ListboxProps={{ style: { maxHeight: selectHeight } }}
      disabled={disabled}
      options={items.map((item) => item)}
      getOptionLabel={(option) => option.title}
      onChange={(_, reason: any) => onChangeItem(reason)}
      renderOption={(props, option, { inputValue }) => (
        <SelectOptions
          props={props}
          parts={parse(option.title, match(option.title, inputValue))}
          key={uniqueId('select-list-option')}
        />
      )}
      renderInput={(params) => {
        return (
          <SelectInput
            params={params}
            label={label}
            placeholder={placeholder}
            variant={variant}
            margin={margin}
            focused={focused}
            helperText={helperText}
            error={error}
            disabled={disabled}
            keyTitle={''}
          />
        )
      }}
    />
  )
}
