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

import { SubscriptionStatus, type ImageType } from 'features/apps/apiSlice'
import { Button, Image, LogoGrayData } from '@catena-x/portal-shared-components'
import { fetchImageWithToken } from 'services/ImageService'
import './Organization.scss'
import { useTranslation } from 'react-i18next'

export default function AppSubscriptions({
  name,
  provider,
  status,
  image,
  onButtonClick = () => {},
  onUnsubscribe = () => {},
}: {
  name: string
  provider: string
  status: SubscriptionStatus | undefined
  image: ImageType | undefined
  onButtonClick?: React.MouseEventHandler
  onUnsubscribe?: React.MouseEventHandler
}) {
  const { t } = useTranslation()
  const colorCode = [
    { name: SubscriptionStatus.PENDING, code: ' #969696' },
    { name: SubscriptionStatus.INACTIVE, code: 'red' },
    { name: SubscriptionStatus.ACTIVE, code: 'green' },
  ].find((e) => e.name === status)?.code

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className="organization-subscriptions" onClick={onButtonClick}>
      <div className="iconNameContainer">
        <Image
          src={image?.src || LogoGrayData}
          style={{
            objectFit: 'cover',
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '5px',
          }}
          loader={fetchImageWithToken}
        />

        <div className="name">
          {name} - by {provider} -
          {status ? (
            <span style={{ color: colorCode }}>
              {' '}
              {'\u00a0' + capitalizeFirstLetter(status.toLocaleLowerCase())}
            </span>
          ) : null}
        </div>
      </div>

      <Button
        variant="outlined"
        className="unsubButton"
        onClick={onUnsubscribe}
      >
        {t('global.actions.unsubscribe')}
      </Button>
    </div>
  )
}
