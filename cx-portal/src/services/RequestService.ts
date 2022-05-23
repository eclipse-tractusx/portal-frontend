import UserService from './UserService'

export const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
})

const RequestService = {
  getHeaders,
}

export default RequestService
