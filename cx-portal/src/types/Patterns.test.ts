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

import { isBPN, isDomain, isMail } from './Patterns'

const TESTDATA = {
  valid: {
    BPN: ['BPNL000000015OHJ', 'bpnl000000000001'],
    MAIL: [
      'julia.jeroch@bmw.de',
      'JULIA.JEROCH@BMW.DE',
      'some_name.123.with-dash@my-host.co.uk',
      'a@b.ce',
      '222.333@444.com', // valid?
    ],
    DOMAIN: [
      'www.bmw.de',
      'BMW.COM',
      '4chan.org',
      'portal.dev.demo.catena-x.net',
      'www.5555.site', //valid?
      '1.2.3', //valid?
    ],
  },
  invalid: {
    BPN: [
      '    BPNL000000000001  ',
      'BPNL00000000000015OHJ',
      'BPNL01',
      '/&§%/(§%#',
      '',
    ],
    MAIL: [
      '   donald.duck@bmw.de',
      'julia.jeroch@bmw',
      '.eins.zwei.@drei.my',
      'a@b.c',
      'not,a@valid@address.com',
      '@mickey.mouse',
      '&$%/&()/@&/().&/',
      '',
    ],
    DOMAIN: [
      '  no.spaces.domain.in',
      'BMW',
      'das.mein.kraßße-dömäin.yo',
      'www.my domain.de',
      'invalid.domain,com',
      '.domain.name',
      'no.underscore_allowed.is',
      '-das-.nicht.de',
      '&$%/.&()/@&./().&/',
      '',
    ],
  },
}

describe('Input Pattern Tests', () => {
  it('validates BPNs', () => {
    TESTDATA.valid.BPN.forEach((expr) => expect(isBPN(expr)).toBe(true))
    TESTDATA.invalid.BPN.forEach((expr) => expect(isBPN(expr)).toBe(false))
  })

  it('validates mail adresses', () => {
    TESTDATA.valid.MAIL.forEach((expr) => expect(isMail(expr)).toBe(true))
    TESTDATA.invalid.MAIL.forEach((expr) => expect(isMail(expr)).toBe(false))
  })

  it('validates domain names', () => {
    TESTDATA.valid.DOMAIN.forEach((expr) => expect(isDomain(expr)).toBe(true))
    TESTDATA.invalid.DOMAIN.forEach((expr) =>
      expect(isDomain(expr)).toBe(false)
    )
  })
})
