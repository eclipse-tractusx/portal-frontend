import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  IconProps,
  TextField,
  TextFieldProps,
  useTheme,
} from '@mui/material'

interface SearchProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined'
  endAdornment?: IconProps
}

export const SearchInput = ({
  variant,
  endAdornment,
  ...props
}: SearchProps) => {
  const theme = useTheme()
  const { icon01 } = theme.palette.icon

  return (
    <Box>
      <TextField
        sx={{
          borderColor: theme.palette.primary.main,
          width: '100%',
        }}
        variant={variant}
        type={props.type || 'search'}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: icon01, marginRight: 2 }} />,
          endAdornment: endAdornment || null,
        }}
        {...props}
      />
    </Box>
  )
}
