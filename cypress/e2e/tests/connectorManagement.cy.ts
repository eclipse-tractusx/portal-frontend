import { getConnectorData } from '../../support/utils/dataGenerator/connectorManagement'
import {
  getRandomItem,
  generateDynamicUsername,
  generateDynamicDescription,
} from '../../support/utils/dataGenerator/technicalUserManagement'
import { connectorManagementPage } from '../../support/pages/connectorManagementPage'
import { technicalUserManagementPage } from '../../support/pages/technicalUserManagementPage'

const connectorPage = new connectorManagementPage()
const technicalPage = new technicalUserManagementPage()

describe('Connector Creation & deletion', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    connectorPage.visit()
    cy.get('#usercentrics-cmp-ui', { timeout: 60000 })
      .shadow()
      .find('#accept')
      .click()
  })

  it('create a connector for new technical user', () => {
    // Use the page object methods to perform actions
    connectorPage.clickAddConnectorIcon()
    console.log('Running test: create connector')
    cy.wait(2000) //wait needs to be added for the web elements to load & available
    connectorPage.selectOwnCompanyConnector()
    connectorPage.clickNext()

    // Select the new technical user radio option
    connectorPage.selectNewTechnicalUserOption()
    connectorPage.clickCreateNewTechnicalUser()
    technicalPage.internalTechnicalUser()

    // Generate dynamic data for technical user form
    cy.fixture('technicalUser').then((user) => {
      const selectedRole = getRandomItem(user.roles)
      const username = generateDynamicUsername(selectedRole)
      const description = generateDynamicDescription(user.description)

      // Fill out the technical user creation form
      technicalPage.CreateTechnicalUser(username, description, selectedRole)

      // Verify the technical user creation was successful
      technicalPage.verifySuccessMessage()

      // After creating a technical user, navigate back to the connector management page
      connectorPage.visit()
      connectorPage.clickAddConnectorIcon()
      cy.wait(2000) //wait needs to be added for the web elements to load & available
      connectorPage.selectOwnCompanyConnector()
      connectorPage.clickNext()
      //cy.wait(50000) //wait needs to be added for the web elements to load & available

      // Switch to using an existing technical user

      cy.get('[data-testid="RadioButtonUncheckedIcon"]', { timeout: 30000 })
        .first()
        .click({ force: true })

      // technical user is stored in Cypress.env('recentTechnicalUser')
      const recentTechnicalUser = Cypress.env('recentTechnicalUser')
      cy.fixture('connectorData').then((data) => {
        const connectorData = {
          name: getConnectorData().name, // Use the random name from the generator
          url: data.url, // Use the URL from the fixture
          location: data.location, // Use the location from the fixture
        }
        cy.wait(2000) //wait needs to be added for the web elements to load & available

        // Fill out the connector form for the existing technical user
        connectorPage.CreateConnector(connectorData, recentTechnicalUser)

        // Verify the connector creation was successful
        connectorPage.verifyConnectorCreationSuccess()
      })
    })
  })

  it('should delete the most recently created connector', () => {
    connectorPage.visit()
    cy.get('#usercentrics-cmp-ui', { timeout: 60000 })
      .shadow()
      .find('#accept')
      .click()
    connectorPage.deleteMostRecentConnector()
  })
})
