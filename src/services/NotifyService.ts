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

import { Notify, SeverityType, deq, enq } from 'features/control/notify'
import { store } from 'features/store'
import log from './LogService'

const NOTIFY_TIME = 7000

const NotifyService = {
  notify: (item: Notify) => {
    if (item.severity === SeverityType.ERROR) {
      log.error(`${item.title}, ${item.msg}`, item.data)
    } else {
      log.info(`${item.title}, ${item.msg}`, item.data)
    }
    store.dispatch(enq(item))
    setTimeout(() => store.dispatch(deq()), NOTIFY_TIME)
  },
  success: (
    title: string,
    msg?: string,
    data?: object | string | number | boolean
  ) =>
    NotifyService.notify({
      severity: SeverityType.SUCCESS,
      title,
      msg,
      data,
    }),
  error: (
    title: string,
    msg?: string,
    data?: object | string | number | boolean
  ) =>
    NotifyService.notify({
      severity: SeverityType.ERROR,
      title,
      msg,
      data,
    }),
}

export const { notify, success, error } = NotifyService

export default NotifyService
