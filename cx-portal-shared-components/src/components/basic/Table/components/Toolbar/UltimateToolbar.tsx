import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { Button } from '../../../Button'
import { SearchInput } from '../../../SearchInput'

import { getSelectedFilterUpdate, initSelectedFilter } from './helper'
import { SelectedFilter, ToolbarProps } from '.'

export interface UltimateToolbarProps extends ToolbarProps {
  placeholder?: string
  onFilter?: (selectedFilter: SelectedFilter) => void
}

export const UltimateToolbar = ({
  onSearch,
  filter,
  onFilter,
  placeholder,
}: UltimateToolbarProps) => {
  const { spacing } = useTheme()
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({})

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const onSearchInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchInput)
    }
  }

  const onFilterChange = (value: string, name: string) => {
    const checked = !checkIsSelected(name, value)

    setSelectedFilter(
      getSelectedFilterUpdate(selectedFilter, name, value, checked)
    )
  }

  useEffect(() => {
    setSelectedFilter(initSelectedFilter(filter))
  }, [filter])

  useEffect(() => {
    onFilter && onFilter(selectedFilter)
  }, [onFilter, selectedFilter])

  const checkIsSelected = (name: string, value: string) => {
    let isSelected = false
    if (selectedFilter[name]) {
      selectedFilter[name].forEach((item: string) => {
        if (item === value) {
          isSelected = true
        }
      })
    }
    return isSelected
  }
  const headerHeight = () => (onSearch || onFilter ? 100 : 0)
  return (
    <Box
      sx={{
        minHeight: { headerHeight },
        padding: spacing(1, 4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {onSearch && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '50px' }}>
          <SearchInput
            value={searchInput}
            onChange={onSearchInputChange}
            onKeyPress={onSearchInputKeyPress}
            placeholder={placeholder}
            sx={{
              '.MuiInputBase-input': {
                padding: '10px',
              },
            }}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {onFilter &&
          filter?.map(({ name, values }) => (
            <Box
              key={name}
              sx={{
                padding: spacing(2, 4),
                textAlign: 'right',
              }}
            >
              {values?.map(({ value, label }) => (
                <Box component="span" sx={{ marginLeft: 3 }} key={value}>
                  <Button
                    id={`${name}${value}`}
                    name={name}
                    onClick={() => onFilterChange(value, name)}
                    size="small"
                    color="secondary"
                    variant={
                      checkIsSelected(name, value) ? 'contained' : 'text'
                    }
                  >
                    {label || value}
                  </Button>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  )
}
