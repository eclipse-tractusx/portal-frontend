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

import { Button } from 'cx-portal-shared-components'
import FormTest from './index.form'
import { error, success } from 'services/NotifyService'

export default function Test() {
  return (
    <main>
      <section>
        <Button
          onClick={() =>
            Date.now() % 2
              ? error('idp.create', 'the IdP could not be created')
              : success('idp.create', 'IdP created')
          }
        >
          Notify
        </Button>
        <FormTest />
      </section>
    </main>
  )
}
