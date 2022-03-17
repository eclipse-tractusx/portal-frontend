import axios from 'axios'
import * as actions from './appsAPI'

const appsMW =
  ({ dispatch }: any) =>
    (next: any) =>
      async (action: any) => {
        if (action.type !== actions.appsCallBegan.type) return next(action)

        const { url, method, data, onStart, onSuccess, onError } = action.payload

        if (onStart) dispatch({ type: onStart })

        next(action)

        try {
          const response = await axios.request({
            baseURL: '/',
            url,
            method,
            data,
          })
          //dispatch(actions.apiCallSuccess(response.data));
          if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
        } catch (error: unknown) {
          //dispatch(actions.apiCallFailed(error.message));
          if (onError) dispatch({ type: onError, payload: error })
        }
      }

export default appsMW
