/**
 * Transforms text into a kebab-case format suitable for data-testid attributes
 * @param text - The text to transform
 * @returns A kebab-case string with only lowercase letters, numbers, and hyphens
 */
export const toTestId = (text: string | undefined | null): string => {
  if (!text) return ''
  let result = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  // Remove leading hyphens
  while (result.startsWith('-')) {
    result = result.slice(1)
  }

  // Remove trailing hyphens
  while (result.endsWith('-')) {
    result = result.slice(0, -1)
  }

  return result
}

/**
 * Generates a data-testid value by combining multiple parts
 * @param parts - Array of text parts to combine
 * @returns A kebab-case string suitable for data-testid
 */
export const generateTestId = (
  ...parts: (string | undefined | null)[]
): string => {
  return parts
    .map((part) => toTestId(part))
    .filter((part) => part.length > 0)
    .join('-')
}
