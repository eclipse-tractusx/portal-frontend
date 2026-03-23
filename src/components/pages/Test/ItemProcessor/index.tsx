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

import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import { IconButton } from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useState } from 'react'

export default function ItemProcessor({
  items,
  process = (item) => ({ ...item }),
  autostart = true,
}: {
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  readonly items: any[]
  // eslint-disable-next-line
  readonly process?: (item: any) => any
  readonly autostart?: boolean
}) {
  // eslint-disable-next-line
  const [processed, setProcessed] = useState<any[]>([])
  // eslint-disable-next-line
  const [cancelled, setCancelled] = useState<any[]>([])
  // eslint-disable-next-line
  const [success, setSuccess] = useState<any[]>([])
  // eslint-disable-next-line
  const [failure, setFailure] = useState<any[]>([])
  // eslint-disable-next-line
  const [queueItems, setQueueItems] = useState<any[]>(items)

  // eslint-disable-next-line
  const cancelItem = (item: any) => {
    setQueueItems(queueItems.filter((i) => i !== item))
    setProcessed([...processed, item])
    setCancelled([...cancelled, item])
  }

  // eslint-disable-next-line
  const startItem = async (item: any) => {
    if (!item) return
    if (processed.includes(item)) return
    try {
      const pitem = await process(item)
      if (pitem.data) setSuccess([...success, item])
      else setFailure([...failure, item])
    } catch (error) {
      setFailure([...failure, item])
    }
    setProcessed([...processed, item])
  }

  const processNextItem = async () => {
    if (queueItems.length === 0) return
    const item = queueItems[0]
    await startItem(item)
    await new Promise((f) => setTimeout(f, 1500))
    setQueueItems(queueItems.slice(1))
  }

  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const getStatusColor = (item: any) => {
    if (success.includes(item)) return '#dff0d8'
    if (failure.includes(item)) return '#f2dede'
    return '#fff'
  }

  useEffect(() => {
    if (autostart) void processNextItem()
  }, [queueItems])

  useEffect(() => {
    setQueueItems([
      ...new Set([
        ...items.filter((item) => !processed.includes(item)),
        ...queueItems.filter((item) => !processed.includes(item)),
      ]),
    ])
  }, [items])

  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const renderItem = (item: any, i?: number) =>
    item ? (
      <Box
        key={i}
        sx={{
          position: 'relative',
          padding: '10px',
          overflow: 'hidden',
          margin: '10px',
          width: '240px',
          height: '160px',
          fontSize: '7px',
          border: '1px solid lightgray',
          borderRadius: '10px',
          backgroundColor: getStatusColor(item),
          cursor: 'pointer',
          '> button': {
            display: 'none',
          },
          '&:hover': {
            '> button': {
              display: 'block',
            },
            border: '1px solid gray',
          },
        }}
      >
        <pre>{JSON.stringify(item, null, 2)}</pre>
        {!processed.includes(item) && (
          <>
            <IconButton
              className="cancel"
              aria-label="close"
              onClick={() => {
                cancelItem(item)
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'red',
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              className="start"
              aria-label="close"
              onClick={() => startItem(item)}
              sx={{
                margin: 'auto auto',
                color: 'green',
              }}
            >
              <PlayCircleFilledIcon />
            </IconButton>
          </>
        )}
      </Box>
    ) : null

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {processed.map(renderItem)}
      {cancelled.map(renderItem)}
      {queueItems
        .filter(
          (item) => !processed.includes(item) && !cancelled.includes(item)
        )
        .map(renderItem)}
    </Box>
  )
}
