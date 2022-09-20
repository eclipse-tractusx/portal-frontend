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

import { multiMapBy } from './multiMapBy'
import { Dictionary } from '@reduxjs/toolkit'
import { forEach, groupBy, keys, union, uniq, values } from 'lodash'

describe('multiMapBy', () => {
  type person = {
    name: string
    favoriteColors?: string[]
  }
  const people: person[] = [
    { name: 'JOHN', favoriteColors: ['green', 'blue'] },
    { name: 'JANE', favoriteColors: ['orange', 'blue', 'red'] },
    { name: 'GARY', favoriteColors: ['black', 'red'] },
    { name: 'MARY', favoriteColors: ['red'] },
    { name: 'RORY', favoriteColors: [] },
    { name: 'GABY' },
  ]
  const peopleMap: Dictionary<person> = {}

  forEach(people, (someone) => {
    peopleMap[someone.name] = someone
  })

  it('converts an array into a map based on iteratee operation', () => {
    const peopleByNameLetters = multiMapBy(keys(peopleMap), (name: string) =>
      name.split('')
    )
    // expect an object key for every unique char in the name list: ABEGHJMNORY
    const letters = uniq(keys(peopleMap).join('').split('').sort()).join('')

    expect(keys(peopleByNameLetters).sort().join('')).toEqual(letters)
    expect(peopleByNameLetters.Y.length).toEqual(4)
    expect(peopleByNameLetters.E[0]).toEqual(peopleMap.JANE?.name)
  })

  it('converts an object into a map based on item attribute values', () => {
    const peopleByFavoriteColor = multiMapBy(
      peopleMap,
      (someone) => someone?.favoriteColors
    )

    expect(keys(peopleByFavoriteColor).sort()).toStrictEqual([
      'black',
      'blue',
      'green',
      'orange',
      'red',
    ])
    expect(peopleByFavoriteColor.red.length).toEqual(3)
    expect(peopleByFavoriteColor.black).toContain(peopleMap.GARY)
    // expect 4 people that have a favorite color specified
    let likeAnyColor: (person | undefined)[] = []

    forEach(peopleByFavoriteColor, (likeThatColor) => {
      likeAnyColor = union(likeAnyColor, likeThatColor)
    })
    expect(likeAnyColor.length).toEqual(4)
    expect(likeAnyColor).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining(peopleMap.RORY),
        expect.objectContaining(peopleMap.GABY),
      ])
    )
  })

  it('works with different types', () => {
    const numbers = Array.from(Array(12), (_, i) => i + 2)
    const divisibleByMap = multiMapBy(numbers, (dividend) => {
      const divisibleBy: string[] = []

      forEach(numbers, (divisor) => {
        if (!(dividend % divisor)) {
          divisibleBy.push(Number(divisor).toString())
        }
      })
      return divisibleBy
    })

    expect(divisibleByMap['3']).toStrictEqual([3, 6, 9, 12])
  })

  it('exactly works like lodash groupBy for items belonging to one group only', () => {
    const mixedObject = {
      a: null,
      b: 'eins',
      c: 2,
      d: 3.01,
      e: [4],
      f: { value: 5 },
      g: undefined,
      h: new Array(7),
      i: () => 8,
      j: true,
      k: false,
      l: () => {
        return 9
      },
      m: 'zehn',
      n: Math.floor(12.34),
    }
    const mixedArray = values(mixedObject)

    {
      const ourTypeMap = multiMapBy(mixedObject, (item) => typeof item)
      const lodashTypeMap = groupBy(mixedObject, (item) => typeof item)

      expect(ourTypeMap).toStrictEqual(lodashTypeMap)
    }
    {
      const ourTypeMap = multiMapBy(mixedArray, (item) => typeof item)
      const lodashTypeMap = groupBy(mixedArray, (item) => typeof item)

      expect(ourTypeMap).toStrictEqual(lodashTypeMap)
    }
  })
})
