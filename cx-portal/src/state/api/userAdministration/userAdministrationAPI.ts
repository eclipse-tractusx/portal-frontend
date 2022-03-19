import { HttpClient } from 'utils/HttpClient'
import { InviteData } from 'types/userAdministration/UserAdministrationTypes'

// Instance of UserAdministration API endpoint
export class UserAdministrationApi extends HttpClient {
  private static classInstance?: UserAdministrationApi

  // TODO: Token needs to read from Redux store
  public constructor(token: string) {
    super(`${process.env.REACT_APP_BASE_API}`, {
      Authorization: `Bearer ${token}`,
    })
  }

  // To avoid create an instance everytime, pointed to Singleton of static value
  public static getInstance(token: string) {
    if (!this.classInstance) {
      this.classInstance = new UserAdministrationApi(token)
    }

    return this.classInstance
  }

  public inviteBusinessPartner = (invite: InviteData) => {
    return this.instance.post<void>(
      '/api/useradministration/invitation',
      JSON.stringify(invite),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }
}
