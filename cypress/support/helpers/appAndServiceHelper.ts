export function getMimeType(fileName: string | undefined | null): string {
  if (!fileName || typeof fileName !== 'string') {
    // fallback mime type
    return 'application/octet-stream'
  }
  const ext = fileName.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'pdf':
      return 'application/pdf'
    case 'csv':
      return 'text/csv'
    default:
      return 'application/octet-stream'
  }
}

export function uploadFileHelper(
  selector: string,
  fileName: string
): Cypress.Chainable<JQuery<HTMLElement>> {
  const fileType = getMimeType(fileName)
  cy.log(`Uploading file: ${fileName} with mime type: ${fileType}`)

  return cy.fixture(fileName, 'binary').then((binary) => {
    const blob = Cypress.Blob.binaryStringToBlob(binary, fileType)
    const file = new File([blob], fileName, { type: fileType })
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    // finding the drop zone first
    return cy
      .get(selector, { timeout: 15000 })
      .should('exist')
      .then(($el) => {
        cy.log(`Found element for selector: ${selector}`)
        if ($el.find('.cx-drop__area').length > 0) {
          cy.wrap($el)
            .find('.cx-drop__area')
            .should('be.visible')
            .trigger('dragenter', { dataTransfer, force: true })
            .trigger('dragover', { dataTransfer, force: true })
            .trigger('drop', { dataTransfer, force: true })
        } else if ($el.find('input[type="file"]').length > 0) {
          // fallback to file input if drop zone is missing
          cy.wrap($el)
            .find('input[type="file"]')
            .selectFile(
              [
                {
                  contents: blob,
                  fileName,
                  lastModified: new Date().getTime(),
                },
              ],
              { force: true }
            )
        } else {
          throw new Error(
            `Neither drop zone (.cx-drop__area) nor input[type="file"] found inside ${selector}`
          )
        }
      })
  })
}

export function uploadMultipleFilesHelper(
  selector: string,
  fileNames: string[]
): Cypress.Chainable<JQuery<HTMLElement>> {
  const initialChain: Cypress.Chainable<JQuery<HTMLElement>> = cy.wrap(
    null
  ) as any

  return fileNames.reduce((chain, fileName) => {
    return chain.then(() => uploadFileHelper(selector, fileName))
  }, initialChain)
}

export function clickSaveAndProceed(selector: string): void {
  cy.get(selector, { timeout: 30000 }).should('be.visible').click()
}

export function handleUsercentricsConsentBanner(): void {
  cy.window({ timeout: 10000 }).then((win) => {
    const banner = win.document.querySelector('#usercentrics-cmp-ui')

    if (banner) {
      cy.log('Usercentrics consent banner detected')

      // Manually access the shadow DOM and click #accept
      const shadowRoot = (banner as any).shadowRoot
      const acceptButton = shadowRoot?.querySelector('#accept')

      if (acceptButton) {
        acceptButton.click() // Native DOM click
        cy.log('Consent accepted via native DOM interaction')
      } else {
        cy.log('Accept button not found inside shadow DOM')
      }
    } else {
      cy.log('Usercentrics banner not present')
    }
  })
}
