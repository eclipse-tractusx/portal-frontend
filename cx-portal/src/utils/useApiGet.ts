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

import { useState, useEffect } from 'react'

export type TApiResponse = {
  status: number
  statusText: string
  data: string
  error: unknown
  loading: boolean
}

/**
 * useApiGet - a simple hook to retrieve static data asynchronously in cases
 * where we don't want to store the result in redux
 *
 * @param url
 * @returns apiResponse
 */

export const useApiGet = (url: string): TApiResponse => {
  const [status, setStatus] = useState<number>(0)
  const [statusText, setStatusText] = useState<string>('')
  const [data, setData] = useState<string>('')
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getAPIData = async () => {
      setLoading(true)
      try {
        const apiResponse = await fetch(url)
        const text = await apiResponse.text()
        setStatus(apiResponse.status)
        setStatusText(apiResponse.statusText)
        setData(text)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    getAPIData()
  }, [url])

  return { status, statusText, data, error, loading }
}
