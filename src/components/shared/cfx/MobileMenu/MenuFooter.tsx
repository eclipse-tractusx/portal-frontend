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
import { LanguageSwitch, Button } from '@cofinity-x/shared-components'
import { useDispatch } from 'react-redux'
import i18next, { changeLanguage, t } from 'i18next'
import I18nService from 'services/I18nService'
import { setLanguage } from 'features/language/actions'
import { HELP_LINK } from 'types/cfx/Constants'

export const MenuFooter = (): JSX.Element => {
  const dispatch = useDispatch()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 0.5,
        px: 1,
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
      <Box sx={{ pr: 1 }}>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => {
            window.open(HELP_LINK(), 'documentation', 'noreferrer')
          }}
          className="documentation"
        >
          {t('pages.help')}
        </Button>
      </Box>
    </Box>
  )
}
