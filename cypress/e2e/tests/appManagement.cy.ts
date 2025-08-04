import {
  generateAppCardData,
  generateAppPageDetailsData,
  getRandomUseCases,
  getRandomLanguages,
} from '../../support/utils/dataGenerator/appManagement'
import { appManagementPage } from '../../support/pages/appManagementPage'

const appPage = new appManagementPage()
const CONFORMITY_CERT_FILE = 'ConformityCertificate.pdf'

describe('App registration', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    appPage.visit()
    cy.get('#usercentrics-cmp-ui', { timeout: 60000 })
      .shadow()
      .find('#accept')
      .click()
  })

  it('fills data to create App card', () => {
    const appData = generateAppCardData()

    cy.fixture('appRegistration').then((data) => {
      const selectedUseCases = getRandomUseCases(data.useCases)
      const selectedLanguages = getRandomLanguages(data.getRandomLanguages)

      appPage.triggerAppRegistration()
      cy.wait(2000)

      appPage.fillAppTitle(appData.appTitle)
      appPage.fillShortDescriptions(
        appData.shortDescriptionEn,
        appData.shortDescriptionDe
      )
      appPage.selectUseCases(selectedUseCases)
      appPage.selectLanguages(selectedLanguages)
      appPage.fillPrice(appData.pricingInfo)
      appPage.uploadAppImage('AppCover.png')
    })

    appPage.saveAndProceedToAppCardCreation()
  })

  it('fills App Page Details', () => {
    appPage.visitAppOverview()
    appPage.resumeAppRegistration()

    const appDetails = generateAppPageDetailsData()
    const DATA_PREREQUISITE_FILE = 'DataPrerequisits.pdf'
    const TECHNICAL_GUIDE_FILE = 'TechnicalGuide.pdf'
    const APP_CONTRACT_FILE = 'AppContract.pdf'

    cy.fixture('appRegistration').then((fixtureData) => {
      appPage.verifyHeadingOnPage(fixtureData.validPageHeadings)
      appPage.fillLongDescriptions(
        appDetails.longDescriptionEn,
        appDetails.longDescriptionDe
      )
      appPage.uploadAppImages([
        'AppImage1.png',
        'AppImage2.png',
        'AppImage3.png',
      ])
      appPage.uploadSupportingDocs(
        DATA_PREREQUISITE_FILE,
        TECHNICAL_GUIDE_FILE,
        APP_CONTRACT_FILE
      )
      appPage.fillContactDetails(
        fixtureData.providerHomePage,
        fixtureData.customerContactEmail,
        fixtureData.customerContactNumber
      )
      appPage.selectPrivacyOptions(fixtureData.privacyOptions)
    })

    appPage.saveAndproceed()
  })

  it('selects agreement & uploads conformity certificate', () => {
    appPage.visitAppOverview()
    appPage.resumeAppRegistration()
    cy.fixture('appRegistration').then((fixtureData) => {
      appPage.verifyHeadingOnPage(fixtureData.validPageHeadings)
      appPage.confirmCatenaXCertificateAgreement()
      appPage.acceptMarketplaceTerms()
      appPage.uploadConformityCertificate(CONFORMITY_CERT_FILE)
      cy.wait(3000)
    })
    appPage.saveAndProceedToTechnicalUserProfile()
  })

  it('selects technical users & upload app roles', () => {
    const APP_ROLE_UPLOAD = 'app_role_upload.csv'

    appPage.visitAppOverview()
    appPage.resumeAppRegistration()

    cy.fixture('appRegistration').then((appRegData) => {
      appPage.verifyHeadingOnPage(appRegData.validPageHeadings)
      appPage.uploadAppUserRoles(APP_ROLE_UPLOAD)
      appPage.saveAndproceed()
    })
  })

  it('validate and submit the app', () => {
    appPage.visitAppOverview()
    appPage.resumeAppRegistration()
    cy.wait(5000)
    appPage.saveAndproceed()
    appPage.appSubmission()
    appPage.verifySubmissionSuccessMessage()
  })
})
