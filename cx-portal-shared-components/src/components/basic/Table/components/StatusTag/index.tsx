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

import MuiChip, { ChipProps as MuiStatusChipProps } from '@mui/material/Chip'

interface StatusChipProps extends Omit<MuiStatusChipProps, 'color'> {
  color?: 'pending' | 'confirmed' | 'declined' | 'label'
}

export const StatusTag = ({
  variant = 'filled',
  color = 'pending',
  onDelete = () => null, // To avoid default delete icon appear
  ...props
}: StatusChipProps) => {
  return <MuiChip variant={variant} color={color} {...props} />
}
