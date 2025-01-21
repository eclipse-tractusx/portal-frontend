import {
  getRandomItem,
  generateDynamicUsername,
  generateDynamicDescription,
} from '../support/utils/dataGenerator'
import { USER_TYPES } from '../support/constants'

describe('Technical User Creation', () => {
  beforeEach(() => {
    // Navigate to the technical user management page
    cy.visit(`${Cypress.env('baseUrl')}/technicalUserManagement`)
  })

  it('should create a technical user with dynamic role-based username', () => {
    cy.fixture('technicalUser').then((user) => {
      // Select a random role from the user roles defined in the fixture
      cy.get('.cx-page-info__button > .MuiButtonBase-root').click()
      cy.get('#usercentrics-root')
        .shadow()
        .find('[data-testid="uc-accept-all-button"]')
        .click()

      const selectedRole = getRandomItem(user.roles)

      // Generate a dynamic username based on the selected role
      const username = generateDynamicUsername(selectedRole)

      // Generate a dynamic description using the template and random string
      const description = generateDynamicDescription(user.description)

      // Log the generated values
      cy.log(`Selected Role: ${selectedRole}`)
      cy.log(`Generated Username: ${username}`)
      cy.log(`Generated Description: ${description}`)

      cy.get('textarea[placeholder="Username*"]').type(username)
      cy.wait(2000)
      cy.get('textarea[placeholder="Description*"]').type(description)

      // Select the random role from the available roles
      cy.contains(selectedRole).click()

      // Submit the data to create the user

      cy.get('button.cx-button.cx-variant-contained.cx-color-primary')
        .contains('Confirm')
        .click()

      // Verify if the success message is visible
      cy.get('h4.cx-dialog__intro')
        .should('be.visible')
        .should(
          'include.text',
          'Below are the details needed for service connection. Please keep this secret confidential.'
        )
    })
  })
})
