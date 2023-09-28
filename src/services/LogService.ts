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

export enum LogLevel {
  SEVERE = 'SEVERE',
  ERROR = ' ERROR',
  WARN = '  WARN',
  INFO = '  INFO',
  DEBUG = ' DEBUG',
}

const LogService = {
  logtime: (date?: number) =>
    new Date(date ?? Date.now()).toISOString().substring(11, 19),

  log: (level: LogLevel, message: string, data?: any) =>
    { ((row) =>
      { level === LogLevel.SEVERE || level === LogLevel.ERROR
        ? console.error(row, data ?? '')
        : console.log(row, data ?? '') })(
      `${LogService.logtime()} ${level} ${message}`
    ) },
  info: (message: string, data?: any) =>
    { LogService.log(LogLevel.INFO, message, data) },
  warn: (message: string, data?: any) =>
    { LogService.log(LogLevel.WARN, message, data) },
  error: (message: string, data?: any) =>
    { LogService.log(LogLevel.ERROR, message, data) },
}

export const { logtime, log, info, warn, error } = LogService

export default LogService