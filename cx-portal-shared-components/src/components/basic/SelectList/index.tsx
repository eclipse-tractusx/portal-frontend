import { Box, TextFieldProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { Input } from '../Input'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

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
  clearText='Clear',
  noOptionsText="No Options",
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
          />
        </Box>
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue)
        const parts = parse(option.title, matches)

        return (
          <li
            {...props}
            style={{
              paddingBottom: '0px',
              marginLeft: '5px',
              marginRight: '5px',
              marginTop: '-1px',
            }}
          >
            <Box
              sx={{
                borderBottom: '1px solid #f2f2f2 !important',
                width: '100%',
                paddingBottom: '10px',
              }}
            >
              {parts.map((part: any, index: any) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </Box>
          </li>
        )
      }}
    />
  )
}
