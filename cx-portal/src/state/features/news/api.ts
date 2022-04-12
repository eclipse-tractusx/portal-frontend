import { CardItems } from 'cx-portal-shared-components'
import UserService from 'services/UserService'
import { HttpClient } from 'utils/HttpClient'

export class NewsApi extends HttpClient {
  private static classInstance?: NewsApi

  public constructor() {
    super('')
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new NewsApi()
    }
    return this.classInstance
  }

  public getItems = () => {
    return this.instance.get<CardItems[]>(`/testdata/news.json`, {
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    })
  }
}
