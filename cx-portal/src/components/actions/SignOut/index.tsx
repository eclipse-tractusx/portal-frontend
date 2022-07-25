import UserService from 'services/UserService'

export default function SignOut() {
  UserService.doLogout({ redirectUri: `${document.location.origin}/` })
  return null
}
