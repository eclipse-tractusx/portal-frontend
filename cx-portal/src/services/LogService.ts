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

export enum LogLevel {
  SEVERE = 'SEVERE',
  ERROR = ' ERROR',
  WARN = '  WARN',
  INFO = '  INFO',
  DEBUG = ' DEBUG',
}

export const logtime = (date?: number) =>
  new Date(date || Date.now()).toISOString().substring(11, 19)

export const log = (level: LogLevel, message: string, data?: any) =>
  console.log(`${logtime()} ${level} ${message}`, data || '')

export const info = (message: string, data?: any) =>
  log(LogLevel.INFO, message, data)
export const warn = (message: string, data?: any) =>
  log(LogLevel.WARN, message, data)
export const error = (message: string, data?: any) =>
  log(LogLevel.ERROR, message, data)

const LogService = {
  LogLevel,
  logtime,
  log,
  info,
  warn,
  error,
}

export default LogService
