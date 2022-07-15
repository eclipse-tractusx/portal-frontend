/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH and BMW Group AG
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

import { Nullable } from 'types/MainTypes'

export interface SemanticModelsInitialState {
  modelList: ModelList
  loadingModelList: boolean
  model: Nullable<SemanticModel>
  loadingModel: boolean
  uploadedModel: Nullable<SemanticModel>
  uploading: boolean
  uploadError: string
  openApiLink: string
  openApiError: string
  error: string
  deleteModelId: string
  deleteError: string
}

export type FilterParams = {
  readonly page: number
  readonly pageSize: number
}

export interface ModelList {
  items: Array<SemanticModel>
  totalItems: number
  itemCount: number
  currentPage: number
  totalPages: number
}

export interface SemanticModel {
  name: string
  description?: string
  urn: string
  version: string
  type: string
  status: string
}

export interface NewSemanticModel {
  model: string
  type: string
  status: Status
}

export enum Status {
  Draft = 'DRAFT',
  Released = 'RELEASED',
}
