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

import { forEach, reduce } from 'lodash'

/**
 * Creates a Dictionary composed of keys generated from `iteratee` applied
 * to each item in `collection`. Similar to lodash's groupBy function but
 * `iteratee` can return a list of values thus the items can appear in the
 * result under multiple keys.
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to retrieve the list of keys.
 * @returns {Dictionary} Returns the composed aggregate Dictionary.
 * @example
 *
 * multiMapBy( [ 'ON', 'OFF' ], (word: string) => word.split('') )
 * // => { O: [ 'ON', 'OFF' ], N: [ 'ON' ], F: [ 'OFF' ] }
 */
export const multiMapBy = <T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee: (item: T) => string[] | string | undefined
): Record<string, T[]> => {
  const hasOwnProperty = Object.prototype.hasOwnProperty

  return reduce(
    collection,
    (result: Record<string, T[]>, value: any) => {
      const keys = iteratee(value as T)
      forEach(
        // mind that '== null' is true for null and undefined
        keys == null || Array.isArray(keys) ? keys : [keys],
        (key) => {
          if (hasOwnProperty.call(result, key)) {
            result[key].push(value as T)
          } else {
            result[key] = [value]
          }
        }
      )
      return result
    },
    {}
  )
}
