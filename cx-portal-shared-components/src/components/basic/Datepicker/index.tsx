import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Input } from '../Input'
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';

export type DateType = Date | null
export interface DatepickerProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  placeholder: string
  variant?: 'filled'
  locale: 'en' | 'de'
  defaultValue?: DateType
  readOnly: boolean
  onChangeItem: (items: DateType) => void
}

const localeMap = {
  en: enLocale,
  de: deLocale,
};

export const Datepicker = ({
  label,
  placeholder,
  variant,
  margin,
  focused,
  helperText,
  error = false,
  disabled,
  locale = 'en',
  defaultValue,
  readOnly,
  onChangeItem,
}: DatepickerProps) => {
  const [value, setValue] = useState<DateType>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log('defaultValue', defaultValue)
    if (defaultValue) {
      setValue(new Date(defaultValue))
    }
  }, [defaultValue])

  const handleChange = (newValue: DateType) => {
    if (newValue) {
      setValue(new Date(newValue))
    } 
    onChangeItem(newValue)
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  const closeDatepicker = () => {
    setOpen(false)
  }

  const iconColor = open ? '#0F71CB' : '#939393'
  return (
    <Box
      sx={{
        'button': {
          color: iconColor,
          fontSize: '14px !important',
        },
        'button:hover': {
          color: '#0F71CB'
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]} >
        <DatePicker
          // open={open}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          disableHighlightToday={false}
          views={['year', 'month', 'day']}
          onChange={(newValue) => handleChange(newValue)}
          // onAccept={() => handleOpen()}
          renderInput={(params) =>
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
                // onClick={() => handleOpen()}
                // onBlur={() => handleOpen()}
              />
            </Box>
          }
        />
      </LocalizationProvider>
    </Box>
  )
}
