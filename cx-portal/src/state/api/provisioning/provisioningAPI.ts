import { HttpClient } from 'utils/HttpClient'
import { ProvisionIdentityProviderData } from 'types/provisioning/ProvisioningTypes'

// Instance of Provisioning API endpoint
export class ProvisioningApi extends HttpClient {
  private static classInstance?: ProvisioningApi

  // TODO: Token needs to read from Redux store
  public constructor(token: string) {
    super(`${process.env.REACT_APP_BASE_API}`, {
      Authorization: `Bearer ${token}`,
    })
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new ProvisioningApi(token)
    }

    return this.classInstance
  }

  public provisionIdp = (provisionIdp: ProvisionIdentityProviderData) => {
    return this.instance.post<void>(
      '/api/provisioning/identityprovider/setup',
      JSON.stringify(provisionIdp),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }
}
