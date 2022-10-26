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

import { isBPN, isDomain, isMail, isURL, isUUID } from './Patterns'

const TESTDATA = {
  BPN: {
    valid: ['BPNL000000015OHJ', 'bpnl000000000001', 'bpnlaaaaaaaaaaaa'],
    invalid: [
      '',
      'word',
      'some string',
      '    BPNL000000000001  ',
      'BPNL00000000000015OHJ',
      'BPNL01',
    ],
  },
  MAIL: {
    valid: [
      'julia.jeroch@bmw.de',
      'JULIA.JEROCH@BMW.DE',
      'some_name.123.with-dash@my-host.co.uk',
      'a@b.ce',
      '222.333@444.com', // valid?
    ],
    invalid: [
      '',
      'word',
      'some string',
      '   donald.duck@bmw.de',
      'julia.jeroch@bmw',
      '.eins.zwei.@drei.my',
      'a@b.c',
      'not,a@valid@address.com',
      '@mickey.mouse',
    ],
  },
  DOMAIN: {
    valid: [
      'www.bmw.de',
      'BMW.COM',
      '4chan.org',
      'portal.dev.demo.catena-x.net',
      'www.5555.site', //valid?
      '1.2.3', //valid?
    ],
    invalid: [
      '',
      'word',
      'some string',
      '  no.spaces.domain.in',
      'BMW',
      'das.mein.kraßße-dömäin.yo',
      'www.my domain.de',
      'invalid.domain,com',
      '.domain.name',
      'no.underscore_allowed.is',
      '-das-.nicht.de',
    ],
  },
  URL: {
    valid: [
      'https://www.bmw.com',
      'https://WWW.GOOGLE.COM/',
      'https://www.bmw.com/index.html',
      'https://hostname.domain:12345',
      'https://hostname.domain:12345/endwith/slash/',
      'https://portal.dev.demo.catena-x.net/assets/swagger/index.html',
      'https://portal.dev.demo.catena-x.net/assets/swagger/index.html?param=13&arg=value',
    ],
    invalid: [
      '',
      'word',
      'some string',
      ' https://www.bmw.com',
      'ftp://my.server/file',
      'https://:123/path',
      'http://hostname.domain:12345/endwith/slash/',
      'https://my.domain:not_a_port/path/okay',
      'https://user:password@host.domain:1234/not/accepted/',
    ],
  },
  UUID: {
    valid: [
      '5c08fc78-dc45-4d1b-aa6e-58da1ad9136f',
      '5C08fC78-DC45-4D1B-AA6E-58dA1AD9136F',
      '00000000-0000-0000-0000-000000000000',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
    ],
    invalid: [
      '',
      'word',
      'some string',
      ' 5c08fc78-dc45-4d1b-aa6e-58da1ad9136f',
      'gggggggg-dc45-4d1b-aa6e-58da1ad9136f',
      '5c08fc78dc454d1baa6e58da1ad9136f',
    ],
  },
}

describe('Input Pattern Tests', () => {
  it('validates BPNs', () => {
    TESTDATA.BPN.valid.forEach((expr) => expect(isBPN(expr)).toBe(true))
    TESTDATA.BPN.invalid.forEach((expr) => expect(isBPN(expr)).toBe(false))
  })

  it('validates mail adresses', () => {
    TESTDATA.MAIL.valid.forEach((expr) => expect(isMail(expr)).toBe(true))
    TESTDATA.MAIL.invalid.forEach((expr) => expect(isMail(expr)).toBe(false))
  })

  it('validates domain names', () => {
    TESTDATA.DOMAIN.valid.forEach((expr) => expect(isDomain(expr)).toBe(true))
    TESTDATA.DOMAIN.invalid.forEach((expr) =>
      expect(isDomain(expr)).toBe(false)
    )
  })

  it('validates URLs', () => {
    TESTDATA.URL.valid.forEach((expr) => expect(isURL(expr)).toBe(true))
    TESTDATA.URL.invalid.forEach((expr) => expect(isURL(expr)).toBe(false))
  })

  it('validates UUIDs', () => {
    TESTDATA.UUID.valid.forEach((expr) => expect(isUUID(expr)).toBe(true))
    TESTDATA.UUID.invalid.forEach((expr) => expect(isUUID(expr)).toBe(false))
  })
})
