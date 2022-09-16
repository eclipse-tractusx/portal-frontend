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

import { Typography, Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './PictureWithText.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type PictureWithTextProps = {
  image?: string
  text: string
  onButtonClicked?: () => void
}

export default function PictureWithText({
  image = './edc-connector-text-image.png',
  text,
  onButtonClicked,
}: PictureWithTextProps) {
  const { t } = useTranslation()

  return (
    <div className={'picture-with-text-container'}>
      <img src={image} alt={'alt tag info'} />
      <div className={'text-with-button-wrapper'}>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="body1">
          {t(text)}
        </Typography>

        <Button startIcon={<AddCircleOutlineIcon />} onClick={onButtonClicked}>
          {t('content.edcconnector.addconnectorbutton')}
        </Button>
      </div>
    </div>
  )
}
