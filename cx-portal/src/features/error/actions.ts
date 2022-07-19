import { createAction } from '@reduxjs/toolkit'
import { ErrorServiceState, name } from './types'

const setError = createAction(
  `${name}/setError`,
  function update(error: ErrorServiceState) {
    return {
      payload: {
        hasError: error.hasError,
        hasNavigation: error.hasNavigation,
        header: error.header,
        title: error.title,
        description: error.description,
        reloadPageLink: error.reloadPageLink,
        reloadButtonTitle: error.reloadButtonTitle,
        homePageLink: error.homePageLink,
        homeButtonTitle: error.homeButtonTitle,
      },
    }
  }
)

const resetError = createAction(`${name}/resetError`)

export { setError, resetError }
