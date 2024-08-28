/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { type TextFieldProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { SelectInput, SelectOptions } from '@catena-x/portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import isEqual from 'lodash/isEqual'
import { useState } from 'react'

interface SelectListProps extends Omit<TextFieldProps, 'variant'> {
  // eslint-disable-next-line
  items: any
  label: string
  placeholder: string
  keyTitle: string
  popperHeight?: number
  variant?: 'filled'
  clearText?: string
  noOptionsText?: string
  defaultValue?: unknown
  disableClearable?: boolean
  // eslint-disable-next-line
  onChangeItem: (items: any) => void
}

export const SelectList = ({
  items,
  label,
  placeholder,
  defaultValue = {},
  disableClearable = false,
  keyTitle,
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
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [selected, setSelected] = useState<any>(defaultValue || {})

  // eslint-disable-next-line
  const handleChange = (newValue: any) => {
    if (newValue) {
      setSelected(newValue)
      onChangeItem(newValue)
    }
  }

  return (
    <Autocomplete
      className="cx-select-list"
      id="singleSelectList"
      sx={{ width: '100%' }}
      clearText={clearText}
      defaultValue={defaultValue}
      disableClearable={disableClearable}
      noOptionsText={noOptionsText}
      ListboxProps={{ style: { maxHeight: selectHeight } }}
      disabled={disabled}
      // eslint-disable-next-line
      options={items.map((item: any) => item)}
      // eslint-disable-next-line
      getOptionLabel={(option) => option[keyTitle] || ''}
      onChange={(_event, nextValue) => {
        handleChange(nextValue)
      }}
      isOptionEqualToValue={(option, value) => isEqual(option, value)}
      renderOption={(props, option, { inputValue }) => (
        <SelectOptions
          props={props}
          parts={parse(option[keyTitle], match(option[keyTitle], inputValue))}
          key={uniqueId('select-list-option')}
        />
      )}
      value={selected}
      renderInput={(params) => {
        return (
          <SelectInput
            className="cx-select-list__input"
            params={params}
            label={label}
            placeholder={placeholder}
            variant={variant}
            margin={margin}
            focused={focused}
            helperText={helperText}
            error={error}
            disabled={disabled}
            keyTitle={keyTitle}
          />
        )
      }}
    />
  )
}
