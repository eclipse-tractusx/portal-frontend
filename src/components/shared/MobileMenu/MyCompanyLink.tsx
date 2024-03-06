/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Box, Link, ListItem } from '@mui/material'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { t } from 'i18next'

export interface CompanyMenuTypes {
  to: string
  title: string
}

interface MyCompanyLinkProps {
  onSelect: (title: string, children: CompanyMenuTypes[]) => void
  companyMenu: CompanyMenuTypes[]
}

export const MyCompanyLink = ({
  onSelect,
  companyMenu,
  ...props
}: MyCompanyLinkProps): JSX.Element => {
  return (
    <Box
      sx={{
        margin: '5px 0px 10px 10px',
        borderRadius: '16px',
        ':hover': {
          backgroundColor: 'rgba(15, 113, 203, 0.05)',
        },
      }}
      onClick={() => {
        onSelect(t('pages.mycompany'), companyMenu)
      }}
    >
      <ListItem
        sx={{
          paddingLeft: '10px',
        }}
      >
        <Link
          className="titleBox"
          sx={{
            width: '100%',
            color: 'text.primary',
            pointerEvents: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 3,
            typography: 'label3',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontFamily:
              '"LibreFranklin-Medium",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            ':hover': {
              color: 'primary.dark',
              '.MuiSvgIcon-root': {
                color: 'primary.dark',
              },
            },
            cursor: 'pointer',
          }}
          {...props}
        >
          <Box>
            <BusinessRoundedIcon
              sx={{
                color: '#0f71cb',
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            {t('pages.mycompany')}
          </Box>
          <KeyboardArrowRightIcon
            sx={{ color: 'icon.icon02', marginRight: '10px' }}
          />
        </Link>
      </ListItem>
    </Box>
  )
}
