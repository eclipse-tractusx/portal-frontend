export interface IUser {
  userName: string
  name: string
  email: string
  company: string
  tenant: string
  roles: Array<string>
  isAdmin: boolean
  token: string
  parsedToken: string
}
