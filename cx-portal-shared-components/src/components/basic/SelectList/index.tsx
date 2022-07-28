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
      renderInput={(params) => (
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
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue)
        const parts = parse(option.title, matches)

        return (
          <SelectOptions
            props={props}
            parts={parts}
            key={uniqueId('select-list-option')}
          />
        )
      }}
    />
  )
}
