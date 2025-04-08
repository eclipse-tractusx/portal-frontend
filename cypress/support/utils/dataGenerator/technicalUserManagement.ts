export const getRandomItem = (array: string[]): string => {
  const randomValues = new Uint32Array(1)
  crypto.getRandomValues(randomValues) // Secure random number generation
  const randomIndex = randomValues[0] % array.length // Ensure the index is within array bounds
  return array[randomIndex]
}

// Generate a secure random string using crypto
export const generateDynamicUsername = (role: string): string => {
  const rolePrefix = role.split(' ')[0] // Take the first word of the role as the prefix

  // Generate a random value securely using cryp
  const randomBytes = new Uint8Array(4) // 4 bytes for a 8-character string
  crypto.getRandomValues(randomBytes) // Secure random generation

  // Convert the random bytes to a base-36 string (alphanumeric)
  const randomString = Array.from(randomBytes)
    .map((byte) => byte.toString(36).charAt(0)) // Map each byte to a base-36 character
    .join('')

  return `${rolePrefix}_User_${randomString}`
}

export const generateDynamicDescription = (template: string): string => {
  // Generate secure random string using cryptto
  const randomBytes = new Uint8Array(4) // 4 bytes for an 8-character string
  crypto.getRandomValues(randomBytes) // Secure random generation

  // Convert the random bytes to a base-36 string (alphanumeric)
  const randomString = Array.from(randomBytes)
    .map((byte) => byte.toString(36).charAt(0)) // Map each byte to a base-36 character
    .join('')

  return template.replace('{randomString}', randomString) // Replace placeholder with random string
}
