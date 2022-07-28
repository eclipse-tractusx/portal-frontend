import { Box, Chip, Popper, TextFieldProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Input } from '../Input'

interface MultiSelectListProps extends Omit<TextFieldProps, 'variant'> {
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
            variant="filled"
            label={option.title}
            sx={{
              borderRadius: '16px',
              border: '2px solid #d1d1d1 !important',
              span: {
                borderRight: '2px solid #d1d1d1 !important',
                marginRight: '10px !important',
                height: '26px !important',
                paddingTop: '2px',
              },
            }}
            {...getTagProps({ index })}
          />
        ))
      }}
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
      onChange={(_, reason: any[]) => onAddItem(reason)}
    />
  )
}
