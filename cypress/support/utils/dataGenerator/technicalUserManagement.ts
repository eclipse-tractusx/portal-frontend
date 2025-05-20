export const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)] // Randomly select an item from the array
}

export const generateDynamicUsername = (role: string): string => {
  const rolePrefix = role.split(' ')[0] // Take the first word of the role as the prefix
  return `${rolePrefix}_User_${Math.random().toString(36).substring(2, 6)}` // Generate a dynamic username with a random string
}

export const generateDynamicDescription = (template: string): string => {
  return template.replace(
    '{randomString}',
    Math.random().toString(36).substring(2, 8)
  ) // Replace placeholder with random string
}
