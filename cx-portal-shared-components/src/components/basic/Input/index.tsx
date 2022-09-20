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
