/********************************************************************************
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

import { store } from 'features/store'
import UserService from './UserService'
import { type ImagesState, put } from 'features/images/slice'

export const fetchImageWithToken = async (
  url: string
): Promise<ArrayBuffer> => {
  let buffer = store.getState().images?.[url]
  if (!buffer) {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${UserService.getToken()}`,
      },
    })
    buffer = await response.arrayBuffer()
    const newItem: ImagesState = {}
    newItem[url] = buffer
    store.dispatch(put(newItem))
  }
  return buffer
}

const ImageService = {
  fetchImageWithToken,
}

export default ImageService
