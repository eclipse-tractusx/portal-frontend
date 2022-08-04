import { Box } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export type DateType = Date | null
export interface DatepickerProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  placeholder: string
  variant?: 'filled'
  locale: 'en' | 'de'
  defaultValue?: DateType
  readOnly: boolean
  daySelectedColor?: string
  todayColor?: string
  onChangeItem: (items: DateType) => void
}

export const Datepicker = () => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}></LocalizationProvider>
    </Box>
  )
}
