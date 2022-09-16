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

import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const ariaLabel = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  size?: 'medium' | 'small'
  label?: string | number
}

export const Checkbox = ({
  size = 'medium',
  label,
  ...props
}: CheckboxProps) => {
  return label ? (
    <FormControlLabel
      control={<MuiCheckbox size={size} {...props} {...ariaLabel} />}
      label={label}
    />
  ) : (
    <MuiCheckbox size={size} {...props} {...ariaLabel} />
  )
}
