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

import type {
  PageNotificationsProps,
  PaginMeta,
} from '@arena2036/portal-shared-components-construct-x'
import type { ErrorServiceState } from 'features/error/types'

export type Nullable<T> = T | null

export interface IHashMap<T> {
  [item: string]: T
}

export type TableType = {
  head: string[]
  body: string[][]
}

export interface GeographicCoordinate {
  longitude: number
  latitude: number
  altitude?: number
}

export type SearchParams = {
  readonly name?: string
  readonly page: number
  readonly size: number
}

export interface CardImage {
  src: string
  alt?: string
}

export enum RequestState {
  NONE,
  SUBMIT,
  OK,
  ERROR,
}

export interface AsyncState {
  request: RequestState
  error: string
}

export interface AsyncDataState<T> extends AsyncState {
  data: T
}

export interface ListState<T> {
  items: T[]
  change: T | null
  request: RequestState
  error: string
}

export const InitialListState = {
  items: [],
  change: null,
  request: RequestState.NONE,
  error: '',
}

export const initialPaginMeta: PaginMeta = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  contentSize: 0,
}

export const initialPaginResult = { meta: { ...initialPaginMeta }, content: [] }

export type RestrictedItem = {
  name: string
  allowTo?: () => boolean
}

export type IPage = RestrictedItem & {
  element: JSX.Element
  isRoute?: boolean
  children?: string[]
}

export type IAction = RestrictedItem & {
  element: JSX.Element
  value?: string
}

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface Tree {
  name: string
  hint?: string
  children?: Tree[]
}

export interface MenuItem extends LinkItem, Tree {
  title: string
  children?: MenuItem[]
}

export type UserInput = {
  key: string
  i18n: string
  helperText: string
  pattern: RegExp
  value: string
  valid: boolean
}

export const initServicetNotifications: PageNotificationsProps = {
  open: false,
  severity: undefined,
  title: '',
  description: '',
}

export const initErrorServiceState: ErrorServiceState = {
  hasError: false,
  hasNavigation: false,
  header: '',
  title: '',
  description: '',
  reloadPageLink: '',
  reloadButtonTitle: '',
  homePageLink: '',
  homeButtonTitle: '',
}

export const IMAGE_TYPES: Record<string, string> = {
  '3c': 'image/svg+xml',
  ffd8ff: 'image/jpeg',
  '89504e': 'image/png',
  474946: 'image/gif',
}
