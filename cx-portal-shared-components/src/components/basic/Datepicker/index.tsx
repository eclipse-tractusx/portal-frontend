/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { Input } from '../Input'
import deLocale from 'date-fns/locale/de'
import enLocale from 'date-fns/locale/en-US'
import uniqueId from 'lodash/uniqueId'

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

const localeMap = {
  en: enLocale,
  de: deLocale,
}

export const Datepicker = ({
  label,
  placeholder,
  variant,
  margin,
  helperText,
  error = false,
  disabled,
  locale = 'en',
  defaultValue,
  readOnly,
  daySelectedColor = '#0F71CB',
  todayColor = '#939393',
  onChangeItem,
}: DatepickerProps) => {
  const [value, setValue] = useState<DateType>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (defaultValue) {
      setValue(new Date(defaultValue))
    }
  }, [defaultValue])

  const handleChange = (newValue: DateType) => {
    if (newValue) {
      setValue(new Date(newValue))
    }
    onChangeItem(newValue)
    handleClose()
  }

  const handleOpen = () => {
    if (!readOnly && !disabled) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const iconColor = open ? daySelectedColor : '#939393'
  return (
    <Box
      sx={{
        button: {
          color: iconColor,
        },
        'button:hover': {
          color: daySelectedColor,
        },
      }}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={localeMap[locale]}
      >
        <DatePicker
          className="date-picker"
          value={value}
          open={open}
          disabled={disabled}
          readOnly={readOnly}
          disableHighlightToday={false}
          views={['year', 'month', 'day']}
          onChange={(newValue) => handleChange(newValue)}
          onClose={() => handleClose()}
          inputFormat={'yyyy-MM-dd'}
          renderInput={(params) => (
            <Box>
              <Input
                {...params}
                label={label}
                variant={variant}
                helperText={helperText}
                error={error}
                margin={margin}
                focused={open}
                disabled={disabled}
                onClick={handleOpen}
                inputProps={{
                  ...params.inputProps,
                  placeholder: placeholder,
                }}
              />
            </Box>
          )}
          renderDay={(
            day: Date,
            _selectedDays: Date[],
            pickersDayProps: PickersDayProps<Date>
          ) => {
            const bgColor = pickersDayProps.today ? todayColor : '#fff'
            const bgSelected = pickersDayProps.selected
              ? daySelectedColor
              : bgColor
            const colorSelected = pickersDayProps.selected ? '#fff' : '#202020'
            const isBold = pickersDayProps.today ? '500' : '400'

            return (
              <Box key={uniqueId('pickers-day')}>
                {day ? (
                  <Button
                    sx={{
                      width: '36px !important',
                      minWidth: '36px !important',
                      height: '36px !important',
                      margin: '0 2px',
                      padding: '0',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: bgSelected,
                      fontSize: '14px',
                      color: colorSelected,
                      fontWeight: isBold,
                      ':hover': {
                        backgroundColor: '#f2f2f2',
                      },
                    }}
                    onClick={() => handleChange(pickersDayProps.day)}
                  >
                    {new Date(pickersDayProps.day).getDate()}
                  </Button>
                ) : (
                  <div></div>
                )}
              </Box>
            )
          }}
          PaperProps={{
            sx: { marginLeft: '16px' },
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}
