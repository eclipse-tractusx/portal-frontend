import { Chip, Popper, TextFieldProps, useTheme } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { SelectInput } from './Components/SelectInput'
import { SelectOptions } from './Components/SelectOptions'
import uniqueId from 'lodash/uniqueId'

export type PartsType = {
  text: string
  highlight: boolean
}

export interface MultiSelectListProps extends Omit<TextFieldProps, 'variant'> {
  items: any[]
  label: string
  placeholder: string
  popperHeight?: number
  variant?: 'filled'
  clearText?: string
  noOptionsText?: string
  onAddItem: (items: any[]) => void
}

export const MultiSelectList = ({
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
  onAddItem,
}: MultiSelectListProps) => {
  const selectHeight = popperHeight ? `${popperHeight}px` : 'auto'
  const theme = useTheme()

  return (
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
      getOptionLabel={(option) => option.title}
      renderTags={(value: string[], getTagProps) => {
        return value.map((option: any, index: number) => (
          <Chip
            {...getTagProps({ index })}
            variant="filled"
            label={option.title}
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
                order: '2'
              },
              '.MuiChip-deleteIcon': {
                paddingLeft: '10px',
                color: theme.palette.accent.accent03,
              },
              '.MuiChip-deleteIcon:hover': {
                color: theme.palette.accent.accent01,
              },
            }}
          />
        ))
      }}
      renderInput={(param) => (
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
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue)
        const parts: PartsType[] = parse(option.title, matches)
        return (
          <SelectOptions
            props={props}
            parts={parts}
            key={uniqueId('multi-select-option')}
          />
        )
      }}
      onChange={(_, reason: any[]) => onAddItem(reason)}
    />
  )
}
