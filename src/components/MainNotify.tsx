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

import { useSelector } from 'react-redux'
import {
  PageSnackbar,
  PageSnackbarStack,
} from '@arena2036/portal-shared-components-construct-x'
import { notifySelector } from 'features/control/notify'

export default function MainNotify() {
  const notify = useSelector(notifySelector)
  return (
    <div style={{ zIndex: 9999 }}>
      <PageSnackbarStack>
        {notify.map((item) => (
          <PageSnackbar
            key={JSON.stringify(item)}
            severity={item.severity}
            title={item.title}
            description={`${item.msg ?? ''} ${
              item.data
                ? Object.entries(item.data)
                    .filter((entry) => entry[0] === 'status')
                    .map((entry) => entry[0] + '=' + entry[1])
                : ''
            }`}
            open={true}
            showIcon
          />
        ))}
      </PageSnackbarStack>
    </div>
  )
}
