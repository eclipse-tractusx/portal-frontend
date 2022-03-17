import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

// Tell to typescript, we can use any type of data as response data
declare module 'axios' {
  // eslint-disable-next-line
  interface AxiosResponse<T = any> extends Promise<T> {}
}

// Abstract of axios instance
// Only handles response interceptor in abstract class
// Request interceptor should handle in inherited class
export abstract class HttpClient {
  protected readonly instance: AxiosInstance

  protected constructor(
    baseURL: string,
    headers: AxiosRequestHeaders = {
      'Content-Type': 'application/json',
    },
    timeout: number = Number.parseInt(
      `${process.env.REACT_APP_API_CALL_TIMEOUT}`
    )
  ) {
    this.instance = axios.create({
      baseURL,
      headers,
      timeout,
    })

    // Runs after every response from call
    this._initializeResponseInterceptor()
  }

  // Handles two case in below:
  // _handleResponse : Successful response from call
  // _handleError: Error case of call
  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  // Pass response object to Promise resolve
  private _handleResponse = ({ data }: AxiosResponse) => data

  // Catch error and throw code to .catch block
  protected _handleError = (error: AxiosError) => Promise.reject(error)
}
