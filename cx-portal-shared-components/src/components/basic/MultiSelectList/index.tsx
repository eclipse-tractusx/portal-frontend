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

import { Box, Chip, Popper, TextFieldProps, useTheme } from '@mui/material'
import Autocomplete, {
  AutocompleteRenderInputParams,
  createFilterOptions,
} from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { SelectInput } from './Components/SelectInput'
import { SelectOptions } from './Components/SelectOptions'
import { SelectAddMore } from './Components/SelectAddMore'
import uniqueId from 'lodash/uniqueId'
import { useState } from 'react'

export type TagSizeType = 'small' | 'medium' | 'large'
export type PartsType = {
  text: string
  highlight: boolean
}

export interface MultiSelectListProps
  extends Omit<TextFieldProps, 'variant' | 'size'> {
  items: any[]
  label: string
  placeholder: string
  keyTitle: string
  popperHeight?: number
  variant?: 'filled'
  clearText?: string
  noOptionsText?: string
  buttonAddMore: string
  notItemsText: string
  tagSize?: TagSizeType
  filterOptionsArgs?: {}
  onAddItem: (items: any[]) => void
}

export const MultiSelectList = ({
  items,
  label,
  placeholder,
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
  buttonAddMore,
  notItemsText,
  tagSize,
  filterOptionsArgs = {},
  onAddItem,
}: MultiSelectListProps) => {
  const selectHeight = popperHeight ? `${popperHeight}px` : 'auto'
  const theme = useTheme()
  const [selected, setSelected] = useState<any[]>([])
  const [showItems, setShowItems] = useState(false)
  const handleChange = (selectedItems: any[]) => {
    onAddItem(selectedItems)
    setSelected(selectedItems)
  }
  const handleViewAddMore = () => {
    setShowItems(false)
  }

  const filterOptions = createFilterOptions(
    Object.keys(filterOptionsArgs).length > 0
      ? filterOptionsArgs
      : {
          matchFrom: 'any',
          stringify: (option: any) => option[keyTitle],
        }
  )

  return (
    <Box>
      {!showItems ? (
        <Autocomplete
          id="selectList"
          sx={{ width: '100%' }}
          clearText={clearText}
          noOptionsText={noOptionsText}
          PopperComponent={({ style, ...props }) => (
            <Popper {...props} style={{ ...style, height: 0 }} />
          )}
          ListboxProps={{ style: { maxHeight: selectHeight } }}
          multiple
          disabled={disabled}
          options={items.map((item) => item)}
          getOptionLabel={(option) => option[keyTitle]}
          value={selected}
          filterOptions={filterOptions}
          renderTags={(selectedItems: any[], getTagProps) =>
            selectedItems.map((option: any, index: number) => (
              <Chip
                {...getTagProps({ index })}
                variant="filled"
                label={option[keyTitle]}
                sx={{
                  borderRadius: '16px',
                  border: `1px solid ${theme.palette.accent.accent03} !important`,
                  backgroundColor: `${theme.palette.accent.accent02}`,
                  color: theme.palette.accent.accent03,
                  fontWeight: 'bold',
                  span: {
                    marginRight: '10px !important',
                    height: '26px !important',
                    paddingTop: '2px',
                    paddingLeft: '0px',
                    order: '2',
                  },
                  '.MuiChip-deleteIcon': {
                    marginLeft: '10px',
                    color: theme.palette.accent.accent03,
                  },
                  '.MuiChip-deleteIcon:hover': {
                    color: theme.palette.accent.accent01,
                  },
                }}
              />
            ))
          }
          renderInput={(param: AutocompleteRenderInputParams) => (
            <SelectInput
              params={param}
              label={label}
              placeholder={placeholder}
              variant={variant}
              margin={margin}
              focused={focused}
              helperText={helperText}
              error={error}
              disabled={disabled}
              autoFocus={!showItems}
              keyTitle={keyTitle}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option[keyTitle], inputValue)
            const parts: PartsType[] = parse(option[keyTitle], matches)
            return (
              <SelectOptions
                props={props}
                parts={parts}
                key={uniqueId('multi-select-option')}
              />
            )
          }}
          onChange={(_, selectedItems: any[]) => handleChange(selectedItems)}
          onBlur={() => setShowItems(true)}
        />
      ) : (
        <SelectAddMore
          selected={selected}
          notItemsText={notItemsText}
          buttonAddMore={buttonAddMore}
          label={label}
          keyTitle={keyTitle}
          margin={margin}
          tagSize={tagSize}
          handleShowItems={() => handleViewAddMore()}
        />
      )}
    </Box>
  )
}
