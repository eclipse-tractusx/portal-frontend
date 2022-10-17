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

import { Box } from '@mui/material'
import { Button } from '../../basic/Button'
import { IconButton } from '../../basic/IconButton'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

export interface CardButtonsProps {
  buttonText: string
  onButtonClick?: React.MouseEventHandler
  onSecondaryButtonClick?: React.MouseEventHandler
  addButtonClicked?: boolean
}

export const CardButtons = ({
  buttonText,
  onButtonClick = () => {},
  onSecondaryButtonClick,
  addButtonClicked,
}: CardButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Button size="small" onClick={onButtonClick}>
        {buttonText}
      </Button>
      {onSecondaryButtonClick && (
        <IconButton color="secondary" onClick={onSecondaryButtonClick}>
          {addButtonClicked ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      )}
    </Box>
  )
}
