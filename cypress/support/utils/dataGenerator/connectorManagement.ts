import { faker } from '@faker-js/faker'

/// Generate a random connector name using faker
export const generateRandomConnectorName = (): string => {
  const adjective = faker.word.adjective().substring(0, 10)
  const number = faker.number.int({ min: 1, max: 999 })
  const name = `Connector_${adjective}_${number}`
  return name.substring(0, 20)
}

// Return connector data object
export const getConnectorData = () => ({
  name: generateRandomConnectorName(),
})
