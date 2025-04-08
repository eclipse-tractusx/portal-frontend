import {
  getRandomItem,
  generateDynamicUsername,
  generateDynamicDescription,
} from '../../support/utils/dataGenerator/technicalUserManagement'
import { TechnicalUserManagementPage } from '../../support/pages/TechnicalUserManagementPage'
const technicalPage = new TechnicalUserManagementPage()

describe('Technical User Creation', () => {
  beforeEach(() => {
    // Navigate to the technical user management page using the page object method

    cy.login('user')

    technicalPage.visit()
  })

  it('should create a technical user with dynamic role-based username', () => {
    cy.fixture('technicalUser').then((user) => {
      // Start technical user creation proc
      technicalPage.clickCreateUserButton()

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
          technicalPage.clickClose()
        } else {
          technicalPage.DE_CreateTechnicalUser(
            username,
            description,
            selectedRole
          )

          // Verify if the success message is visible
          cy.get('h4.cx-dialog__intro')
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
