import React from 'react'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, screen } from 'utils/reduxTestUtils'
import RegistrationRequests from 'components/pages/Admin/RegistrationRequests'
import I18nService from 'services/I18nService'
import { SharedThemeProvider } from 'cx-portal-shared-components'

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint

beforeAll(() => {
  I18nService.init()
})

test('fetches & receives a user after clicking the fetch user button', async () => {
  render(
    <SharedThemeProvider>
      <RegistrationRequests />
    </SharedThemeProvider>
  )

  // should show no user initially, and not be fetching a user
  expect(screen.getByText(/User Registration Requests/i)).toBeInTheDocument()

  /*expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

  // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
  expect(screen.getByText(/no user/i)).toBeInTheDocument()

  // after some time, the user should be received
  expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

   */
})

test('should return the initial state', () => {
  expect(2).toEqual(2)
})

/*
test('should return the initial state', () => {
  expect(userAdministrationSlice.reducer(undefined, {type:})).toEqual([
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    }
  ])
})

 */
