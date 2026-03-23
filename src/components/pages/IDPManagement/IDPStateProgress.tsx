/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import { useTranslation } from 'react-i18next'
import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import type { IdentityProvider } from 'features/admin/idpApiSlice'
import './style.scss'

const initialProgressIcons = [
  {
    step1: {
      icon: '1',
      backgroundColor: '#eaeaea',
    },
  },
  {
    step2: {
      icon: '2',
      backgroundColor: '#eaeaea',
    },
  },
  {
    step3: {
      icon: '3',
      backgroundColor: '#eaeaea',
    },
  },
]

export default function IDPStateProgress({ idp }: { idp: IdentityProvider }) {
  const { t } = useTranslation('idp')
  const configured = idp.oidc?.clientId ? true : false

  type ProgressType = {
    [key: string]:
      | {
          icon: string | JSX.Element
          backgroundColor: string
        }
      | undefined
  }

  const [progressIcons, setProgressIcons] =
    useState<ProgressType[]>(initialProgressIcons)
  const [hoverMessage, setHoverMessage] = useState<string>('')

  useEffect(() => {
    if (idp.enabled && !configured) {
      setProgressIcons([
        {
          step1: {
            icon: <CheckIcon />,
            backgroundColor: '#b4cb2e',
          },
        },
        {
          step2: {
            icon: '2',
            backgroundColor: '#ffa600',
          },
        },
      ])
      setHoverMessage(`${t('field.notConfiguredAndEnabled')}`)
    } else if (!idp.enabled && configured) {
      setProgressIcons([
        {
          step1: {
            icon: <HighlightOffIcon />,
            backgroundColor: '#d91e18',
          },
        },
        {
          step2: {
            icon: <HighlightOffIcon />,
            backgroundColor: '#d91e18',
          },
        },
        {
          step3: {
            icon: <HighlightOffIcon />,
            backgroundColor: '#d91e18',
          },
        },
      ])
      setHoverMessage(`${t('field.configuredAndNotEnabled')}`)
    } else if (idp.enabled && configured) {
      setProgressIcons([
        {
          step1: {
            icon: <CheckIcon />,
            backgroundColor: '#b4cb2e',
          },
        },
        {
          step2: {
            icon: <CheckIcon />,
            backgroundColor: '#b4cb2e',
          },
        },
        {
          step3: {
            icon: <CheckIcon />,
            backgroundColor: '#b4cb2e',
          },
        },
      ])
      setHoverMessage(`${t('field.configuredAndEnabled')}`)
    }
  }, [idp])

  return (
    <Tooltips tooltipPlacement="left" tooltipText={hoverMessage}>
      <div className="progress-section">
        {[1, 2, 3].map((item, index) => (
          <Typography
            variant="label4"
            className="number"
            style={{
              backgroundColor:
                progressIcons[index]?.['step' + item]?.backgroundColor,
            }}
            key={item}
          >
            {progressIcons[index]?.['step' + item]?.icon}
          </Typography>
        ))}
      </div>
    </Tooltips>
  )
}
