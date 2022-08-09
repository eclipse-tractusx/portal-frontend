import { AutocompleteRenderInputParams, Box } from '@mui/material'
import { MultiSelectListProps } from '..'
import { Input } from '../../Input'

interface SelectInputProps
  extends Omit<
    MultiSelectListProps,
    'items' | 'onAddItem' | 'buttonAddMore' | 'notItemsText'
  > {
  params: AutocompleteRenderInputParams
  autoFocus?: boolean
}

export const SelectInput = ({
  params,
  label,
  placeholder,
  variant,
  margin,
  focused,
  helperText,
  error = false,
  disabled,
  autoFocus,
}: SelectInputProps) => {
  return (
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
        autoFocus={autoFocus}
      />
    </Box>
  )
}
