import React from 'react'
import { screen, RenderResult, waitFor } from '@testing-library/react'
import RegistrationRequests from 'components/pages/Admin/RegistrationRequests'
import I18nService from 'services/I18nService'
import { MockReduxStoreInitialState } from 'utils/mockDataSet/mockReduxStore'
import { renderWithStore } from 'utils/renderWithStore'
import RegistrationRequestsMockData from 'utils/mockDataSet/registrationRequests.json'
import { RegistrationRequestAPIResponse } from 'types/userAdministration/UserAdministrationTypes'
import EnglishScripts from 'assets/locales/en/main.json'

const renderRegistrationRequestsPage = (): RenderResult =>
  renderWithStore(<RegistrationRequests />, MockReduxStoreInitialState)

beforeAll(() => {
  // Fallback language is English, keep it like that and check only english scripts
  I18nService.init()
  renderRegistrationRequestsPage()
})

test('Control page is correctly rendered', async () => {
  // Check page title to be sure page rendered correctly
  expect(
    screen.getByText(
      EnglishScripts.content.admin['registration-requests'].headertitle
    )
  ).toBeInTheDocument()

  // Check table component rendered correctly via one of the table column
  expect(
    screen.getByText(
      EnglishScripts.content.admin['registration-requests'].columns.companyinfo
    )
  ).toBeInTheDocument()
})

test('Control data grid correctly filled up', async () => {
  renderRegistrationRequestsPage()
  // Wait for page initialization and data gather
  await waitFor(() => {
    // get last item id at mock data response
    const lastRequestItem = RegistrationRequestsMockData[
      RegistrationRequestsMockData.length - 1
    ] as unknown as RegistrationRequestAPIResponse

    // Check id is rendered at page
    expect(screen.getByText(lastRequestItem.application_id)).toBeInTheDocument()
  })
})
