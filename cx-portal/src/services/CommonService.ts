/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { getApiBase, getAssetBase } from './EnvironmentService'
import i18next from 'i18next'
import UserService from './UserService'

const getName = (app: any) => app.name ?? ''
const getDescription = (app: any) =>
  app.shortDescription === 'ERROR' ? '' : app.shortDescription

const onClick = (app: any) =>
  app.uri ? () => window.open(app.uri, '_blank')?.focus() : undefined

const getPrice = (app: any) => (app.price === 'ERROR' ? '' : app.price)

const fetchLeadPictureImage = (data: any[]) => {
  const promises = data?.map((app: any) => {
    return [
      new Promise((resolve, reject) => {
        let url = `${getApiBase()}/api/apps/${
          app.id
        }/appDocuments/${isValidPictureId(app.leadPictureId)}`
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
                    title: getName(app),
                    description: getDescription(app),
                    price: getPrice(app),
                    onClick: onClick(app),
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

const fetchLeadPictures = (images: string[], appId: string) => {
  const promises = images?.map((image: any) => {
    return [
      new Promise((resolve, reject) => {
        let url = ''
        if (!image.documentId) {
          url = `${getApiBase()}/api/apps/${appId}/appDocuments/${isValidPictureId(
            image
          )}`
        } else {
          url = `${getApiBase()}/api/apps/${appId}/appDocuments/${isValidPictureId(
            image.documentId
          )}`
        }

        return fetch(url, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${UserService.getToken()}`,
          },
        })
          .then((response) => response.blob())
          .then(
            (blob) =>
              new Promise((callback) => {
                let reader = new FileReader()
                reader.onload = function () {
                  resolve({
                    url: this.result,
                    text: '',
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

const getCompanyRoles = (callback: any) => {
  let url = `${getAssetBase()}/content/${i18next.language}/companyroles.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
}

const getUseCases = (callback: any) => {
  let url = `${getAssetBase()}/content/${i18next.language}/usecase.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
}

const getRoleDescription = (callback: any) => {
  let url = `${getAssetBase()}/content/${i18next.language}/roledescription.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
}

const getCompanyRoleUpdateData = (callback: any) => {
  let url = `${getAssetBase()}/content/${
    i18next.language
  }/companyRoleChange.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log('Fetching Company Roles Data Failed'))
}

const CommonService = {
  fetchLeadPictureImage,
  isValidPictureId,
  getCompanyRoles,
  getUseCases,
  fetchLeadPictures,
  getRoleDescription,
  getCompanyRoleUpdateData,
}

export default CommonService
