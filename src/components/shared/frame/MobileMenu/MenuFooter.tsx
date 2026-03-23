/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import {
  Typography,
  LanguageSwitch,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import i18next, { changeLanguage, t } from 'i18next'
import I18nService from 'services/I18nService'
import { setLanguage } from 'features/language/actions'
import UserService from 'services/UserService'

export const MenuFooter = (): JSX.Element => {
  const dispatch = useDispatch()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <LanguageSwitch
        current={i18next.language}
        languages={I18nService.supportedLanguages.map((key) => ({ key }))}
        onChange={(key: string) => {
          dispatch(setLanguage({ language: key }))
          changeLanguage(key)
        }}
      />
      <Box
        onClick={() => {
          window.open(
            `${document.location.origin}/documentation/`,
            'documentation',
            'noreferrer'
          )
        }}
      >
        <Typography
          sx={{
            paddingLeft: '10px',
            fontSize: '14px',
            fontFamily: 'Montserrat-Light',
          }}
          variant="body2"
        >
          {t('pages.help')}
        </Typography>
      </Box>
      <Box
        sx={{
          marginRight: '20px',
        }}
        onClick={() => {
          UserService.doLogout()
        }}
      >
        <Typography
          sx={{
            paddingLeft: '10px',
            fontSize: '14px',
            fontFamily: 'Montserrat-Light',
          }}
          variant="body2"
        >
          {t('pages.logout')}
        </Typography>
      </Box>
    </Box>
  )
}
