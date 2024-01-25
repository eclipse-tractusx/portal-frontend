/********************************************************************************
 * Copyright (c) 2021, 2024 BMW Group AG
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
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Box } from '@mui/material'
import { CircleProgress } from '@catena-x/portal-shared-components'
import { notificationFetchSelector, setPage } from 'features/notification/slice'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOnScreen from 'utils/useOnScreen'

export default function NotificationPager() {
  const fetchArgs = useSelector(notificationFetchSelector)
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useOnScreen(ref)

  const triggerLoad = () => {
    setTimeout(() => dispatch(setPage(fetchArgs.page + 1)), 700)
    return true
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
      }}
    >
      {' '}
      {isVisible && (
        <CircleProgress
          size={40}
          step={1}
          interval={0.1}
          colorVariant={'primary'}
          variant={'indeterminate'}
          thickness={8}
        />
      )}
      <div style={{ marginTop: 200 }} ref={ref}>
        {isVisible && triggerLoad()}
      </div>
    </Box>
  )
}
