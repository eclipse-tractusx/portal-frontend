import {
  getRandomItem,
  generateDynamicUsername,
  generateDynamicDescription,
} from '../../support/utils/dataGenerator/technicalUserManagement'
import { technicalUserManagementPage } from '../../support/pages/technicalUserManagementPage'
const technicalPage = new technicalUserManagementPage()

describe('Technical User Creation', () => {
  beforeEach(() => {
    // Navigate to the technical user management page
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    cy.get('#usercentrics-cmp-ui').shadow().find('#accept').wait(1000).click()
    cy.visit(`${Cypress.env('baseUrl')}/technicalUserManagement`)
  })

  it('should create a technical user with dynamic role-based username', () => {
    cy.fixture('technicalUser').then((user) => {
      // Start the creation process and accept cookies
      technicalPage.clickCreateUserButton()
      technicalPage.internalTechnicalUser()

      // Select a random role and generate dynamic data based on the role
      const selectedRole = getRandomItem(user.roles)
      const username = generateDynamicUsername(selectedRole)
      const description = generateDynamicDescription(user.description)

      // Log generated values for debugging
      cy.log(`Selected Role: ${selectedRole}`)
      cy.log(`Generated Username: ${username}`)
      cy.log(`Generated Description: ${description}`)

      cy.document().then((doc) => {
        const lang = doc.documentElement.lang
        cy.log(`Language: ${lang}`)

        if (lang === 'en') {
          // Fill out the form using the consolidated function
          technicalPage.CreateTechnicalUser(username, description, selectedRole)

          // Verify the success message and close the dialog
          technicalPage.verifySuccessMessage()
        } else {
          technicalPage.DE_CreateTechnicalUser(
            username,
            description,
            selectedRole
          )

          // Verify if the success message is visible
          cy.get('h4.cx-dialog__intro', { timeout: 60000 })
            .should('be.visible')
            .should(
              'include.text',
              'Technischer User erfolgreich angelegt. Unten finden Sie die Details, die für die Serviceverbindung benötigt werden. Bitte behandeln Sie diese Informationen vertraulich.'
            )
        }
      })
    })
  })
})
