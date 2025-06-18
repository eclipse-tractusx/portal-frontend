import { faker } from '@faker-js/faker'

export const getRandomItem = (array: string[]): string => {
  return faker.helpers.arrayElement(array)
}

export const generateDynamicUsername = (role: string): string => {
  const rolePrefix = role.split(' ')[0]
  return `${rolePrefix}_User_${faker.string.alphanumeric(4)}`
}

export const generateDynamicDescription = (template: string): string => {
  const randomString = faker.string.alphanumeric(6)
  return template.replace('{randomString}', randomString)
}
