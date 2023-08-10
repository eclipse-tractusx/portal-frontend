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

import {
  Cards,
  DialogContent,
  DialogHeader,
} from '@nidhi.garg/portal-shared-components'
import { show } from 'features/control/overlay'
import { fetchItems } from 'features/info/news/actions'
import { itemsSelector } from 'features/info/news/slice'
import { AppDispatch } from 'features/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function NewsDetail({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.news.title'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent sx={{ textAlign: 'center' }}>
        <Cards
          items={items.filter((item) => item.id === id)}
          columns={3}
          buttonText="Details"
          imageSize="medium"
          imageShape="round"
          variant="text-only"
        />
      </DialogContent>
    </>
  )
}
