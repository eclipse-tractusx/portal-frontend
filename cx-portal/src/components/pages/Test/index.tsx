/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { useEffect } from '@storybook/addons'
import { LogoGrayData } from 'cx-portal-shared-components'
import { useState } from 'react'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'

export default function Test() {

  const [source, useSource] = useState<string>(LogoGrayData)

  const fetchDoc = (id: string, token: string) => {
    fetch(`${getApiBase()}/api/administration/documents/${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.blob())
      .then(imageBlob => {
        // Then create a local URL for that image and print it 
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
      });
    }

  useEffect(() => fetchDoc('184cde16-52d4-4865-81f6-b5b45e3c9051', UserService.getToken()))

  return (
    <main>
      <section>
        <image href={source} /> 
      </section>
    </main>
  )
}
