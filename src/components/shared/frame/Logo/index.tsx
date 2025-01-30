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

import { NavLink } from 'react-router-dom'

export const Logo = () => (
  <NavLink to="/" style={{ textDecoration: 'none' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Logo oben, Text unten
        alignItems: 'center',
        textAlign: 'center',
        gap: '5px', // Abstand zwischen Logo und Text vergrößern
        padding: '10px',
      }}
    >
      {/* Logo */}
      <img
        src={'/src/assets/logo/arena-logo.svg'}
        alt="logo"
        style={{ objectFit: 'contain', width: '250px', height: 'auto' }}
      />

      {/* Text unter dem Logo */}
      <span
        style={{
          fontSize: '14px', // Schriftgröße erhöhen
          fontWeight: 'bold',
          color: '#333', // Dunklere Farbe für bessere Lesbarkeit
          whiteSpace: 'normal', // Zeilenumbrüche erlauben
          textAlign: 'center', // Text mittig ausrichten
          maxWidth: '80%', // Breite begrenzen für bessere Lesbarkeit
          lineHeight: '1.5', // Mehr Abstand zwischen Zeilen
          padding: '5px', // Mehr Abstand um den Text
        }}
      >
        Tractus-X implementation of Release 24.08, but bypassing DS Factory and
        Clearing House.
      </span>
    </div>
  </NavLink>

