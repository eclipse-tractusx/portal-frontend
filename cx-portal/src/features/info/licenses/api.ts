import { HttpClient } from 'utils/HttpClient'
import { LicenseType } from './types'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super('')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getItems = () =>
    this.instance.get<LicenseType>(`/third-party-licenses.json`)
}
