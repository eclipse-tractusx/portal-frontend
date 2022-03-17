import {
  TextField,
  TextFieldProps,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Box,
  FormControl,
} from '@mui/material'
import ErrorOutline from '@mui/icons-material/ErrorOutline'

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'filled'
}

export const Input = ({
  variant = 'filled',
  label,
  placeholder,
  helperText,
  error = false,
  ...props
}: InputProps) => {
  return (
    <Box>
      <FormControl
        sx={{
          width: '100%',
        }}
        error={error}
        variant="filled"
      >
        <InputLabel>{label}</InputLabel>
        <TextField
          variant={variant}
          placeholder={placeholder}
          error={error}
          InputProps={
            error
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorOutline color="error" />
                    </InputAdornment>
                  ),
                }
              : {}
          }
          {...props}
        />
        {error && (
          <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  )
}
