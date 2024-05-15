/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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

import type { Nullable } from 'types/MainTypes'

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
  page: number
  pageSize: number
  nameFilter?: string
  namespaceFilter?: string
  status?: Status | string
  nameType?: string
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

export const DefaultStatus = 'ALL'

export enum SearchType {
  '_NAME_' = 'Name',
  '_DESCRIPTION_' = 'Description',
  'bamm:Aspect' = 'Aspect',
  'bamm:Property' = 'Property',
  'bamm:Entity' = 'Entity',
  'bamm:Constraint' = 'Constraint',
  'bamm:Characteristic' = 'Characteristic',
  'bamm-c:Measurement' = 'Measurement',
  'bamm-c:Quantifiable' = 'Quantifiable',
  'bamm-c:Enumeration' = 'Enumeration',
  'bamm-c:SingleEntity' = 'SingleEntity',
  'bamm-c:Set' = 'Set',
  'bamm-c:Collection' = 'Collection',
}
