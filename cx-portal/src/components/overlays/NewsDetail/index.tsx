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

import {
  Button,
  Cards,
  DialogActions,
  DialogContent,
  DialogHeader,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { fetchItems } from 'features/info/news/actions'
import { itemsSelector } from 'features/info/news/slice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'

export default function NewsDetail({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const items = useSelector(itemsSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const handleConfirm = () => console.log('confirm')

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

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
        >
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          {`${t('global.actions.confirm')}`}
        </Button>
      </DialogActions>
    </>
  )
}
