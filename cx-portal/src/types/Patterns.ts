/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

export const Patterns = {
  BPN: /^(BPNL|CAX)[0-9A-Z]{12}$/i,
  URL: /^((https?):\/\/([^:/\s]+))/,
  MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NAME: /^([A-Za-zÀ-ÿ-,.']{1,40} ?){1,8}$/i,
  UUID: /^[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}$/i,
  prefix: {
    BPN: /^BPNL/i,
    URL: /^https?:/i,
    MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/,
  },
  SEARCH: /^[a-zA-ZÀ-ÿ0-9 !?@&_\-.]{3,80}$/,
}

export default Patterns
