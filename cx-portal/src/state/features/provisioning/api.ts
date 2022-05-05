import { HttpClient } from 'utils/HttpClient'
import { ProvisionIdentityProviderData } from './types'
import UserService from 'services/UserService'
import getApiBase from 'utils/EnvUtil'

export class ProvisioningApi extends HttpClient {
  private static classInstance?: ProvisioningApi

  public constructor() {
    super(getApiBase() || '')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProvisioningApi()
    }

    return this.classInstance
  }

  public provisionIdp = (provisionIdp: ProvisionIdentityProviderData) => {
    return this.instance.post<void>(
      '/api/provisioning/identityprovider/setup',
      JSON.stringify(provisionIdp),
      {
        headers: {
          authorization: `Bearer ${UserService.getToken()}`,
          'content-type': 'application/json',
        },
      }
    )
  }
}
