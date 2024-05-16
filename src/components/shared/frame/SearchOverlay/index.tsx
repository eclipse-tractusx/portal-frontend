/********************************************************************************
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

import NewSearchSection from './NewSearchSection'
import { appearSearchSelector, setAppear } from 'features/control/appear'
import { useSelector, useDispatch } from 'react-redux'
import SearchResultSection from './SearchResultSection'
import './Search.scss'
import { Dialog } from '@mui/material'

export default function MainSearchOverlay() {
  const visible = useSelector(appearSearchSelector)
  const dispatch = useDispatch()

  return (
    <Dialog
      onClose={() => dispatch(setAppear({ SEARCH: !visible }))}
      open={visible}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '0px',
          position: 'fixed',
          top: '10px',
          left: '8%',
          right: '0px',
          maxWidth: '80vw',
          margin: '0px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      className="mainDailog"
    >
      <NewSearchSection />
      <SearchResultSection />
    </Dialog>
  )
}
