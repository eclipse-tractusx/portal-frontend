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

import {
  isBPN,
  isCompanyName,
  isDomain,
  isMail,
  isURL,
  isUUID,
  isCName,
  isCountryCode,
  isClientID,
  isPersonName,
  isSearchUserEmail,
  isValidAppOverviewSearch,
  isValidIDPName,
} from './Patterns'

const TESTDATA = {
  ID: {
    valid: ['word', 'ID34', 'my_identifier'],
    invalid: ['', '%&/()', 'some string', 'ID28  '],
  },
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
  IDP: {
    valid: [
      'Tractusx',
      '0000001234',
      'Tract Usx123@!',
      'BPN lannn',
      'Foo Bar@!',
    ],
    invalid: [
      'Foo  Bar  ',
      'Foo   Bar',
      '  FooBar',
      '   ',
      'FooBar%',
      'FooBar$',
      '0000001234$%',
    ],
  },
  MAIL: {
    valid: [
      'julia.jeroch@bmw.de',
      'some_name.123.with-dash@my-host.co.uk',
      'a@b.ce',
      '222.333@444.com', // valid?
    ],
    invalid: [
      '',
      'word',
      'JULIA.JEROCH@BMW.DE',
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
      'portal.env.example.catena-x.net',
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
      'https://portal.env.example.catena-x.net/assets/swagger/index.html',
      'https://portal.env.example.catena-x.net/assets/swagger/index.html?param=13&arg=value',
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
  COMPANY_NAME: {
    valid: [
      'Company@3',
      'BMW4You',
      'BMW!4ABC',
      'BMW XXX 23',
      'BMW',
      '23BMW',
      'BMWü',
      'BMW?#',
      'BMWè',
      'BMW (OIDC)',
      'BMW+Mini',
      'BMW.Mini',
      'BMW&Mini',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      '1234567890'.repeat(16),
      'Bayerische Motoren Werke Aktiengesellschaft',
      '7-ELEVEN INTERNATIONAL LLC',
      '5N Plus Lübeck GmbH',
      'Recht 24/7 Schröder Rechtsanwaltsgesellschaft mbH',
      '+SEN Inc.', // leading special character
      'La Poste S.A.',
      'JPMORGAN ASIA-PACIFIC ADVANTAGE HYBRID FUND (QDII)',
      'Currency £$€¥¢',
      'ACE 9 SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
      '摩根亚太优势混合型证券投资基金 (QDII)',
      '삼성', // Samsung
      '三', // Samsung
      'Czech: ČĎŇŘŠŤŽ',
      'Estonian: ÄÖÜŠŽ',
      'Slovak: ĽĹŔŠŤŽ',
      'Polish: ĄĆĘŁŃÓŚŹŻ',
      'Hungarian: ÁÉÍÓÖŐÚÜŰ',
      'Romanian: ÂÎŞŢ',
      'Bulgarian: ЙЪЬ',
      'Greek: ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
      'Turkish: ÇĞİıÖŞÜ',
      'Arabic: ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
      'Hebrew: שלום עולם',
      'Hindi: अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषस',
      'Tamil: அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநனபமயரலவழளஷஸஹ',
      'Japanese: あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
      'Chinese: 你好 世界',
      'Korean: 안녕하세요 세계',
      'Thai: สวัสดีชาวโลก', // Thai does not seem to work even with /p{L} and required additional range
      'Vietnamese: ăâắáấàằầảẳẩãẵẫạặậđêéếèềẻểẽễẹệíìỉĩịôơóốớòồờỏổởõỗỡọộợưúứùừủửũữụựýỳỷỹỵ',
      'Singapore: 你好 世界',
    ],
    invalid: [
      ' BMW',
      'BMW  TG',
      'BMW  ',
      'Bayerische Motoren Werke Aktiengesellschaft\n', // newline
      'W'.repeat(161), // 161 characters
      '', // empty
    ],
  },
  CNAMES: {
    valid: ['word', 'Some word', 'Some@word'],
    invalid: [' someword', 'w', '', ' some??@#$word'],
  },
  COUNTRY: {
    valid: ['DE'],
    invalid: ['', 'D', 'de', 'some string'],
  },
  PERSON_NAME: {
    valid: [
      'Franz Mustermann',
      'Li',
      'Bo Li',
      'Julia Sophie',
      'Julia-Sophie',
      'Dr. Müller',
      'Chloé',
      'Paŭlo',
      'Walther von der Vogelweide',
      'Willard Carroll Smith, Jr.',
      'John F. Kennedy',
      'Ursula K. Le Guin',
      // prettier-ignore
      'Joseph O\'Neill',
      // prettier-ignore
      'd\'Artagnan',
      'Sigríður',
      'Łukasz',
      'Božič',
      'Polývios',
      // prettier-ignore
      'Muhammad bin Salmān Āl Su\'ūd',
    ],
    invalid: [
      'Julia  Sophie',
      'Julia–Sophie',
      'Julia Sophie ',
      ' Julia Sophie ',
      'William H Gates',
      'Prayut Chan-o-cha',
      'Meister. Eder',
      '孔夫子',
      'แพทองธาร ชินวัตร',
      'مُحَمَّدْ بْنْ سَلْمَانْ آلْ سُعُودْ',
      'Muḥammad bin Salmān Āl Su‘ūd',
    ],
  },
  CLIENTID: {
    valid: ['sa-12', 'JSSS', 'Julia12'],
    invalid: ['&^%#@', '!', 'hash &*^#$'],
  },
  EMAIL_SEARCH: {
    valid: [
      'john.doe@example.com',
      'jane_doe123@example.com',
      'user+tag@example.com',
      'email@sub.domain.com',
      'first.last@another-domain.org',
      'name-with-dash@example-company.com',
      'name.surname@domain.travel',
      'name123@domain.ac',
      'firstname+lastname@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'admin@admin-portal.co.uk',
    ],
    invalid: ['()*&^%$#/\\?><,`~'],
  },
  appOverview: {
    valid: ['sa-12', '1234', 'Test123!@#'],
    invalid: ['🚀 Rocket!', 'Invalid\nNewLine'],
  },
}

describe('Input Pattern Tests', () => {
  it('validates BPNs', () => {
    TESTDATA.BPN.valid.forEach((expr) => {
      expect(isBPN(expr)).toBe(true)
    })
    TESTDATA.BPN.invalid.forEach((expr) => {
      expect(isBPN(expr)).toBe(false)
    })
  })

  it('validates mail adresses', () => {
    TESTDATA.MAIL.valid.forEach((expr) => {
      expect(isMail(expr)).toBe(true)
    })
    TESTDATA.MAIL.invalid.forEach((expr) => {
      expect(isMail(expr)).toBe(false)
    })
  })

  it('validates domain names', () => {
    TESTDATA.DOMAIN.valid.forEach((expr) => {
      expect(isDomain(expr)).toBe(true)
    })
    TESTDATA.DOMAIN.invalid.forEach((expr) => {
      expect(isDomain(expr)).toBe(false)
    })
  })

  it('validates URLs', () => {
    TESTDATA.URL.valid.forEach((expr) => {
      expect(isURL(expr)).toBe(true)
    })
    TESTDATA.URL.invalid.forEach((expr) => {
      expect(isURL(expr)).toBe(false)
    })
  })

  it('validates UUIDs', () => {
    TESTDATA.UUID.valid.forEach((expr) => {
      expect(isUUID(expr)).toBe(true)
    })
    TESTDATA.UUID.invalid.forEach((expr) => {
      expect(isUUID(expr)).toBe(false)
    })
  })

  it('validates Company Names', () => {
    TESTDATA.COMPANY_NAME.valid.forEach((expr) => {
      expect(isCompanyName(expr)).toBe(true)
    })
    TESTDATA.COMPANY_NAME.invalid.forEach((expr) => {
      expect(isCompanyName(expr)).toBe(false)
    })
  })

  it('validates connector Names', () => {
    TESTDATA.CNAMES.valid.forEach((expr) => {
      expect(isCName(expr)).toBe(true)
    })
    TESTDATA.CNAMES.invalid.forEach((expr) => {
      expect(isCName(expr)).toBe(false)
    })
  })

  it('validates Country code', () => {
    TESTDATA.COUNTRY.valid.forEach((expr) => {
      expect(isCountryCode(expr)).toBe(true)
    })
    TESTDATA.COUNTRY.invalid.forEach((expr) => {
      expect(isCountryCode(expr)).toBe(false)
    })
  })
  it('validates person name', () => {
    TESTDATA.PERSON_NAME.valid.forEach((expr) => {
      expect(isPersonName(expr)).toBe(true)
    })
    TESTDATA.PERSON_NAME.invalid.forEach((expr) => {
      expect(isPersonName(expr)).toBe(false)
    })
  })
  it('validate tech user clientId', () => {
    TESTDATA.CLIENTID.valid.forEach((expr) => {
      expect(isClientID(expr)).toBe(true)
    })
    TESTDATA.CLIENTID.invalid.forEach((expr) => {
      expect(isClientID(expr)).toBe(false)
    })
  })
  it('Validate email search for users', () => {
    TESTDATA.EMAIL_SEARCH.valid.forEach((expr) => {
      expect(isSearchUserEmail(expr)).toBe(true)
    })
    TESTDATA.EMAIL_SEARCH.invalid.forEach((expr) => {
      expect(isSearchUserEmail(expr)).toBe(false)
    })
  })
  it('validate appoverview search', () => {
    TESTDATA.appOverview.valid.forEach((expr) => {
      expect(isValidAppOverviewSearch(expr)).toBe(true)
    })
    TESTDATA.appOverview.invalid.forEach((expr) => {
      expect(isValidAppOverviewSearch(expr)).toBe(false)
    })
  })
  it('validate idp displayName', () => {
    TESTDATA.IDP.valid.forEach((expr) => {
      expect(isValidIDPName(expr)).toBe(true)
    })
    TESTDATA.IDP.invalid.forEach((expr) => {
      expect(isValidIDPName(expr)).toBe(false)
    })
  })
})
