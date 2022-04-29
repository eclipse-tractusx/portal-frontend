import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'
import { LicenseType } from './types'

export class LicensesApi extends HttpClient {
  private static classInstance?: LicensesApi

  public constructor() {
    super('')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new LicensesApi()
    }
    return this.classInstance
  }

  public getItems = () => {
    return this.instance.get<LicenseType>(`/third-party-licenses.json`, {
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }
}
