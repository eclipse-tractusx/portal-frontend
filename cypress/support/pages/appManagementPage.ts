import {
  uploadFileHelper,
  uploadMultipleFilesHelper,
  clickSaveAndProceed,
  handleUsercentricsConsentBanner,
} from '../helpers/appAndServiceHelper'

export class appManagementPage {
  // Page locators
  private selectors = {
    registerAppButton: 'button.create-btn',
    appTitleInput: 'div.form-field input[type="text"]',
    appProviderInput:
      'div.MuiInputBase-root input[type="text"][maxlength="30"]',
    shortDescENTextarea:
      'div.MuiInputBase-root textarea[aria-invalid="false"][maxlength="255"]:not([readonly])',
    shortDescDETextarea:
      'div.MuiInputBase-root textarea[aria-invalid="false"][maxlength="255"]:not([readonly])',
    longDescENTextarea:
      'textarea.MuiFilledInput-input.MuiInputBase-inputMultiline',
    longDescDETextarea:
      'textarea.MuiFilledInput-input.MuiInputBase-inputMultiline',
    priceInput: 'div.MuiInputBase-root input[type="text"]:not([readonly])',
    openDropdown: 'div.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon',
    selectOptions: 'ul[role="listbox"] li[role="option"]',
    dropAppImage: 'div.cx-drop__area',
    saveAndProceed: '[data-testid="release-process-save-and-proceed-button"]',
    appCard: 'div.card.cx-card',
    confirmToResume: '[data-testid="app-overview-confirm-button"]',
    dropImages: '[data-testid="release-process-images-input"]',
    dropDataPrerequisite:
      '[data-testid="release-process-uploadDataPrerequisits-input"]',
    dropTechnicalGuide:
      '[data-testid="release-process-uploadTechnicalGuide-input"]',
    appContract: '[data-testid="release-process-uploadAppContract-input"]',
    providerHomePage:
      '[data-testid="release-process-provider-home-page-input"]',
    customerContactEmail:
      '[data-testid="release-process-provider-contact-email-input"]',
    customerContactNumber:
      '[data-testid="release-process-provider-phone-contact-input"]',
    companyData: '[data-testid="release-process-COMPANY_DATA-input"]',
    userData: '[data-testid="release-process-USER_DATA-input"]',
    location: '[data-testid="release-process-LOCATION-input"]',
    browserHistory: '[data-testid="release-process-BROWSER_HISTORY-input"]',
    checkboxCatenaXCertificateAgreement:
      '[data-testid="release-process-aa0a0000-7fbc-1f2f-817f-bce0502c1091-input"]',
    checkboxMarketplaceTCs:
      '[data-testid="release-process-aa0a0000-7fbc-1f2f-817f-bce0502c1016-input"]',
    uploadConformityDocument:
      '[data-testid="release-process-upload-image-conformity-input"]',
    uploadUserRoleCSV: '[data-testid="release-process-upload-roles-input"]',
    uploadAppRolesButton: '[data-testid="release-process-upload-button"]',
    technicalUserProfile: '[data-testid="toolbar-button-lable"]',
    selectInternalProfileRadio: 'input[type="radio"][value="Internal"]',
    rolesCheckboxes: 'div.roles input[type="checkbox"].PrivateSwitchBase-input',
    deleteConformityDoc:
      'button[type="button"] svg[aria-hidden="true"] path[d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"]',
    submitApp: '[data-testid="release-process-validate-publish-button"]',
  }
  /**
   * Navigates to the app release process page.
   */
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/appReleaseProcess`)
  }

  /**
   * Navigates to the app overview page.
   */
  visitAppOverview(): void {
    cy.visit(`${Cypress.env('baseUrl')}/appOverview`)
  }

  visitAppReleaseProcess(): void {
    cy.visit(`${Cypress.env('baseUrl')}/appReleaseProcess/form`)
  }

  // Resume app registration process
  resumeAppRegistration(): void {
    cy.get(this.selectors.appCard, { timeout: 30000 })
      .eq(0)
      .should('be.visible')
      .click()
    handleUsercentricsConsentBanner()

    cy.get(this.selectors.confirmToResume).eq(0).click()
  }

  // Click the register app process
  triggerAppRegistration(): void {
    cy.get(this.selectors.registerAppButton, { timeout: 60000 }).eq(0).click()
  }

  fillAppTitle(title: string): void {
    cy.get(this.selectors.appTitleInput).eq(0).click().type(title)
  }

  fillAppProvider(provider: string): void {
    cy.get(this.selectors.appProviderInput).click().type(provider)
  }

  fillShortDescriptions(en: string, de: string): void {
    cy.get(this.selectors.shortDescENTextarea).eq(0).click().type(en)
    cy.get(this.selectors.shortDescENTextarea).eq(1).click().type(de)
  }

  selectUseCases(useCases: string[]): void {
    cy.contains('button', 'Add More').eq(0).should('be.visible').click()
    useCases.forEach((useCase) => {
      cy.get(this.selectors.openDropdown).eq(0).click()
      cy.get(this.selectors.selectOptions, { timeout: 30000 })
        .contains(useCase)
        .click()
    })
  }

  selectLanguages(appLanguages: string[]): void {
    cy.contains('button', 'Add More').should('be.visible').click()
    appLanguages.forEach((lang) => {
      cy.get(this.selectors.openDropdown).eq(0).click()
      cy.get(this.selectors.selectOptions).contains(lang).click()
    })
  }

  fillPrice(price: string): void {
    cy.get(this.selectors.priceInput).eq(3).click().type(price)
  }

  uploadAppImage(imageFixture: string): void {
    uploadFileHelper(this.selectors.dropAppImage, imageFixture)
  }

  saveAndProceedToAppCardCreation(): void {
    // Intercept the network request triggered on Save & Proceed
    cy.intercept('GET', '**/api/apps/appreleaseprocess/privacyPolicies').as(
      'getPrivacyPolicies'
    )

    clickSaveAndProceed(this.selectors.saveAndProceed)

    // Wait for the API response to ensure the next page is ready
    cy.wait('@getPrivacyPolicies')
  }

  verifyHeadingOnPage(headings: string[]): void {
    const headingRegex = new RegExp(headings.join('|'))
    cy.contains('h3', headingRegex, { timeout: 60000 }).should('be.visible')
  }

  saveAndProceedToTechnicalUserProfile(): void {
    // Intercept the network request triggered on Save & Proceed
    cy.intercept('GET', '**/technical-user-profiles').as(
      'getTechnicalUserProfiles'
    )

    clickSaveAndProceed(this.selectors.saveAndProceed)

    // Wait for the API response to ensure the next page is ready
    cy.wait('@getTechnicalUserProfiles')
  }

  fillLongDescriptions(en: string, de: string): void {
    cy.get(this.selectors.longDescENTextarea).eq(0).click().type(en)
    cy.get(this.selectors.longDescDETextarea).eq(2).click().type(de)
  }

  uploadAppImages(images: string[]): void {
    uploadMultipleFilesHelper(this.selectors.dropImages, images)
  }

  uploadSupportingDocs(dataPre: string, guide: string, contract: string): void {
    uploadFileHelper(this.selectors.dropDataPrerequisite, dataPre)
    uploadFileHelper(this.selectors.dropTechnicalGuide, guide)
    uploadFileHelper(this.selectors.appContract, contract)
  }

  fillContactDetails(homePage: string, email: string, number: string): void {
    cy.get(this.selectors.providerHomePage).type(homePage)
    cy.get(this.selectors.customerContactEmail).type(email)
    cy.get(this.selectors.customerContactNumber).type(number)
  }

  selectPrivacyOptions(options: string[]): void {
    const checkboxMap: Record<string, string> = {
      'Company Data': this.selectors.companyData,
      'User Data': this.selectors.userData,
      Location: this.selectors.location,
      'Browser History': this.selectors.browserHistory,
    }

    options.forEach((option) => {
      const selector = checkboxMap[option]
      if (selector) {
        cy.get(selector).click({ force: true })
      } else {
        throw new Error(`Unknown privacy option: ${option}`)
      }
    })
  }

  saveAndproceed() {
    clickSaveAndProceed(this.selectors.saveAndProceed)
  }

  confirmCatenaXCertificateAgreement(): void {
    cy.get(this.selectors.checkboxCatenaXCertificateAgreement).click()
  }

  acceptMarketplaceTerms(): void {
    cy.get(this.selectors.checkboxMarketplaceTCs).click()
  }

  uploadConformityCertificate(CONFORMITY_CERT_FILE: string): void {
    uploadFileHelper(
      this.selectors.uploadConformityDocument,
      CONFORMITY_CERT_FILE
    )
  }

  reUploadConformityCertificate(CONFORMITY_CERT_FILE: string): void {
    this.uploadConformityCertificate(CONFORMITY_CERT_FILE)
    cy.get(this.selectors.deleteConformityDoc).closest('button').click()
    this.uploadConformityCertificate(CONFORMITY_CERT_FILE)
    cy.wait(3000)
  }

  uploadAppUserRoles(APP_ROLE_UPLOAD: string): void {
    uploadFileHelper(this.selectors.uploadUserRoleCSV, APP_ROLE_UPLOAD)
    cy.get(this.selectors.uploadAppRolesButton).click({ force: true })
  }

  appSubmission(): void {
    cy.get(this.selectors.submitApp).click()
  }

  verifySubmissionSuccessMessage() {
    cy.contains(
      'h2',
      /Thank you for submitting the app!|App erfolgreich eingereicht!/
    ).should('be.visible')
  }
}
