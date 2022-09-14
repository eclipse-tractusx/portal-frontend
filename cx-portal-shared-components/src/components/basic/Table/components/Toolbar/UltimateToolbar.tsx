import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { Button } from '../../../Button'
import { SearchInput } from '../../../SearchInput'
import { ToolbarProps } from '.'

export type SelectedFilter = {
  [name: string]: string[]
}
export interface UltimateToolbarProps extends ToolbarProps {
  placeholder?: string
  onFilter?: (selectedFilter: SelectedFilter) => void
  selectedFilter?: SelectedFilter
}

export const UltimateToolbar = ({
  onSearch,
  filter,
  onFilter,
  searchPlaceholder,
  selectedFilter,
}: UltimateToolbarProps) => {
  const { spacing } = useTheme()
  const [searchInput, setSearchInput] = useState<string>('')

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const onSearchInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchInput)
    }
  }

  const onFilterChange = (value: string, name: string) => {
    if (onFilter) {
      onFilter({ [name]: [value] })
    }
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
            placeholder={searchPlaceholder}
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
                      (selectedFilter as SelectedFilter)[name]?.includes(value)
                        ? 'contained'
                        : 'text'
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
