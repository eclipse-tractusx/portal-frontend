export const generateRandomConnectorName = () =>
  `Connector${Math.floor(Math.random() * 1000)}`

// generate random connector name
export const getConnectorData = () => ({
  name: generateRandomConnectorName(),
})
