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

import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Input,
} from '@cofinity-x/shared-components'
import {
  deleteUserBpn,
  fetchAny,
  putBusinessPartnerNumber,
} from 'features/admin/userOwn/actions'
import { UserdetailSelector } from 'features/admin/userOwn/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import './style.scss'
import { OVERLAYS } from 'types/Constants'
import {
  type OverlayState,
  stateSelector,
  show,
} from 'features/control/overlay'
import type { store } from 'features/store'

export default function AddBPN({ id }: { id: string }) {
  const dispatch = useDispatch<typeof store.dispatch>()
  const userInfo = useSelector(UserdetailSelector)
  const stateSelectorInfo: OverlayState = useSelector(stateSelector)
  const [bpnValues, setBpnValues] = useState<string[]>([])
  const [inputBPN, setInputBPN] = useState('')
  const [bpnErrorMsg, setBpnErrorMessage] = useState('')
  const [hoverClass, setHoverClass] = useState<number>(-1)

  useEffect(() => {
    dispatch(fetchAny(id))
  }, [dispatch, id])

  useEffect(() => {
    setBpnValues(userInfo.bpn)
  }, [userInfo])

  const addInputBPN = (value: string) => {
    setInputBPN(value)
    const bpnPattern = /^BPNL[a-z0-9]{12}$/i
    if (!bpnPattern.test(value.trim())) {
      setBpnErrorMessage('Invalid BPN Number. Please enter a valid number.')
    } else {
      setBpnErrorMessage('')
    }
  }

  const addBPN = async () => {
    try {
      if (!bpnErrorMsg) {
        await dispatch(
          putBusinessPartnerNumber({ companyUserId: id, inputBPN })
        ).unwrap()
        setBpnValues([...bpnValues, inputBPN])
        setInputBPN('')
      }
    } catch (error) {}
  }

  const onDeleteBpnHandler = (deleteBpnId: string) => {
    const params = { companyUserId: stateSelectorInfo.id, bpn: deleteBpnId }
    dispatch(deleteUserBpn(params))
  }

  const onHoverEvent = (index: number) => {
    setHoverClass(index)
  }

  return (
    <>
      <DialogHeader
        {...{
          title: 'Manage BPNs',
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <div className="manageBPN">
          <ul className="bpnListing ph-mask-text">
            {bpnValues?.map((bpn: string, i: number) => {
              return (
                <li key={i}>
                  <p className={`${hoverClass === i ? 'redActive' : ''}`}>
                    {bpn}
                  </p>{' '}
                  <DeleteIcon
                    onMouseOver={() => {
                      onHoverEvent(i)
                    }}
                    onMouseOut={() => {
                      onHoverEvent(-1)
                    }}
                    onClick={() => {
                      onDeleteBpnHandler(bpn)
                    }}
                    className="deleteIcon"
                  />
                </li>
              )
            })}
          </ul>
          <div className="bpnInput">
            <Input
              name="bpn"
              label="Add a new BPN"
              placeholder="Placeholder Text"
              onChange={(e) => {
                addInputBPN(e.target.value)
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  void addBPN()
                }
              }}
              value={inputBPN}
            />
            <p style={{ color: 'red' }}>{bpnErrorMsg}</p>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )
}
