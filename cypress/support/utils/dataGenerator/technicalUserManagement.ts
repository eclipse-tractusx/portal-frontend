/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

export const getRandomItem = (array: string[]): string => {
  const randomValues = new Uint32Array(1)
  crypto.getRandomValues(randomValues) // Secure random number generation
  const randomIndex = randomValues[0] % array.length // Ensure the index is within array bounds
  return array[randomIndex]
}

// Generate a secure random string using crypto
export const generateDynamicUsername = (role: string): string => {
  const rolePrefix = role.split(' ')[0] // Take the first word of the role as the prefix

  // Generate a random value securely using crypto
  const randomBytes = new Uint8Array(4) // 4 bytes for a 8-character string
  crypto.getRandomValues(randomBytes) // Secure random generation

  // Convert the random bytes to a base-36 string (alphanumeric)
  const randomString = Array.from(randomBytes)
    .map((byte) => byte.toString(36).charAt(0)) // Map each byte to a base-36 character
    .join('')

  return `${rolePrefix}_User_${randomString}`
}

export const generateDynamicDescription = (template: string): string => {
  // Generate secure random string using crypto
  const randomBytes = new Uint8Array(4) // 4 bytes for an 8-character string
  crypto.getRandomValues(randomBytes) // Secure random generation

  // Convert the random bytes to a base-36 string (alphanumeric)
  const randomString = Array.from(randomBytes)
    .map((byte) => byte.toString(36).charAt(0)) // Map each byte to a base-36 character
    .join('')

  return template.replace('{randomString}', randomString) // Replace placeholder with random string
}
