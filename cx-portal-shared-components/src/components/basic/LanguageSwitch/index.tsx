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

import { Box, Link, useTheme } from '@mui/material'

interface Language {
  key: string
  name?: string
}

interface LanguageSwitchProps {
  current: Language['key']
  languages: Language[]
  onChange: (key: string) => void
}

export const LanguageSwitch = ({
  current,
  languages,
  onChange,
}: LanguageSwitchProps) => {
  const { spacing } = useTheme()

  const onClick = (e: React.SyntheticEvent, key: string) => {
    e.preventDefault()
    onChange(key)
  }

  return (
    <Box sx={{ padding: spacing(2, 3) }}>
      {languages?.map(({ key, name }) => (
        <Link
          href={`?language=${key}`}
          onClick={(e) => onClick(e, key)}
          sx={{
            typography: 'label3',
            marginRight: 2,
            ':last-child': {
              marginRight: 0,
            },
            ...(key === current && {
              color: 'text.primary',
              borderBottom: '2px solid',
            }),
          }}
          key={key}
        >
          {name ? name : key.toUpperCase()}
        </Link>
      ))}
    </Box>
  )
}
