import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField, TextFieldProps, useTheme } from '@mui/material'

interface SearchProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined'
}

export const SearchInput = ({ variant, ...props }: SearchProps) => {
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
        type="search"
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: icon01, marginRight: 2 }} />,
        }}
        {...props}
      />
    </Box>
  )
}
