import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { Button } from '../../../Button'
import { IconButton } from '../../../IconButton'
import { SearchInput } from '../../../SearchInput'
import { Typography } from '../../../Typography'
import SearchIcon from '@mui/icons-material/Search'
import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import { Checkbox } from '../../../Checkbox'
import { getSelectedFilterUpdate, initSelectedFilter } from './helper'

interface FilterValue {
  value: string
  label?: string
}

interface Filter {
  name: string
  values: FilterValue[]
}

export type SelectedFilter = {
  [name: string]: string[]
}

export interface ToolbarProps {
  title?: string
  numberOfColumns?: number
  buttonLabel?: string
  onButtonClick?: React.MouseEventHandler
  onSearch?: (value: string) => void
  filter?: Filter[]
  onFilter?: (selectedFilter: SelectedFilter) => void
}

export const Toolbar = ({
  title,
  numberOfColumns,
  buttonLabel,
  onButtonClick,
  onSearch,
  filter,
  onFilter,
}: ToolbarProps) => {
  const { spacing } = useTheme()
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [openFilter, setOpenFilter] = useState<boolean>(false)
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

  const onFilterChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = target

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

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: 'background.background01',
          minHeight: 100,
          padding: spacing(1, 4),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">
            {title}
            {numberOfColumns !== void 0 && (
              <Box
                component="span"
                sx={{
                  typography: 'body1',
                  color: 'text.tertiary',
                  marginLeft: 0.5,
                }}
              >
                ({numberOfColumns})
              </Box>
            )}
          </Typography>
          {buttonLabel && onButtonClick && (
            <Button size="small" onClick={onButtonClick} sx={{ marginLeft: 3 }}>
              {buttonLabel}
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {openSearch ? (
            <SearchInput
              autoFocus
              value={searchInput}
              onChange={onSearchInputChange}
              onKeyPress={onSearchInputKeyPress}
              onBlur={() => setOpenSearch(false)}
            />
          ) : (
            onSearch && (
              <IconButton onClick={() => setOpenSearch(true)}>
                <SearchIcon />
              </IconButton>
            )
          )}
          {onFilter && (
            <IconButton
              sx={{ alignSelf: 'center' }}
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FilterIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {openFilter &&
        filter?.map(({ name, values }) => (
          <Box
            key={name}
            sx={{
              backgroundColor: 'background.background02',
              borderTop: '1px solid',
              borderColor: 'border.border01',
              padding: spacing(2, 4),
              textAlign: 'right',
            }}
          >
            {values?.map(({ value, label }) => (
              <Box component="span" sx={{ marginLeft: 3 }} key={value}>
                <Checkbox
                  id={`${name}${value}`}
                  name={name}
                  value={value}
                  label={label || value}
                  checked={selectedFilter[name]?.includes(value)}
                  onChange={onFilterChange}
                />
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  )
}
