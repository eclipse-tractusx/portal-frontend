import UserService from './UserService'

export const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
})

export const getTextHeaders = () => ({
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
    'content-type': 'text/plain',
  },
})

const RequestService = {
  getHeaders,
}

export default RequestService
