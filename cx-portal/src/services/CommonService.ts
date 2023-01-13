/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { getApiBase } from './EnvironmentService'
import UserService from './UserService'

const fetchLeadPictureImage = (data: any[]) => {
  const promises = data?.map((app: any) => {
    return [
      new Promise((resolve, reject) => {
        let url = `${getApiBase()}/api/administration/documents/${isValidPictureId(
          app.leadPictureId
        )}`
        let options = {
          method: 'GET',
          headers: {
            authorization: `Bearer ${UserService.getToken()}`,
          },
        }
        return fetch(url, options)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new Promise((callback) => {
                let reader = new FileReader()
                reader.onload = function () {
                  resolve({
                    ...app,
                    subtitle: app.provider,
                    title: app.name ?? '',
                    description:
                      app.shortDescription === 'ERROR'
                        ? ''
                        : app.shortDescription,
                    price: app.price === 'ERROR' ? '' : app.price,
                    onClick: app.uri
                      ? () => window.open(app.uri, '_blank')?.focus()
                      : undefined,
                    image: {
                      src: this.result,
                      alt: app.title,
                    },
                  })
                }
                reader.readAsDataURL(blob)
              })
          )
      }),
    ]
  })

  const newPromies = promises.map((promise) => Promise.all(promise))
  return newPromies
}

const isValidPictureId = (id: string) => {
  return id === '00000000-0000-0000-0000-000000000000'
    ? '00000000-0000-0000-0000-000000000001'
    : id
}

const CommonService = {
  fetchLeadPictureImage,
  isValidPictureId,
}

export default CommonService
