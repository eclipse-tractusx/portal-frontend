/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { Typography, Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './PictureWithText.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getAssetBase } from 'services/EnvironmentService'

type PictureWithTextProps = {
  image?: string
  text: string
  onButtonClicked?: () => void
  onHelpButtonClicked?: () => void
}

export default function PictureWithText({
  image = `${getAssetBase()}/images/content/teaser.png`,
  text,
  onButtonClicked,
  onHelpButtonClicked,
}: PictureWithTextProps) {
  const { t } = useTranslation()

  return (
    <div className={'picture-with-text-container'}>
      <img src={image} alt={'alt tag info'} />
      <div className={'text-with-button-wrapper'}>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="body1">
          {t(text)}
        </Typography>
        <Button
          sx={{
            marginLeft: '-20px',
            ':hover': {
              background: 'transparent',
              boxShadow: 'none',
            },
            ':focus': {
              boxShadow: 'none',
            },
          }}
          variant="text"
          size="small"
          startIcon={<ArrowForwardIcon />}
          onClick={onHelpButtonClicked}
        >
          {t('content.edcconnector.helpText')}
        </Button>
        <Button
          sx={{
            marginTop: '40px',
          }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={onButtonClicked}
        >
          {t('content.edcconnector.addconnectorbutton')}
        </Button>
      </div>
    </div>
  )
}
