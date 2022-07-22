import { getApiBase } from 'services/EnvironmentService'
import { HttpClient } from 'utils/HttpClient'
import { InviteData, CompanyDetail, InvitesDataGrid } from './types'
import { getHeaders } from 'services/RequestService'
import { SearchParams } from '../../connector/types'
import qs from 'querystring'
import { PAGE_SIZE, PaginResult } from 'types/MainTypes'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }

    return this.classInstance
  }

  public getRegistrationRequests = (filters: SearchParams) =>
    this.instance.get<void>(
      `/api/administration/registration/applications?${qs.stringify(filters)}`,
      getHeaders()
    )

  public postInviteBusinessPartner = (invite: InviteData) =>
    this.instance.post<void>(
      '/api/administration/invitation',
      invite,
      getHeaders()
    )

  public getCompanyDetail = (applicationId: string) =>
    this.instance.get<CompanyDetail>(
      `/api/administration/registration/application/${applicationId}/companyDetailsWithAddress`,
      getHeaders()
    )

  public getItems = (page: number) =>
    this.instance.get<PaginResult<InvitesDataGrid>>(
      `api/administration/registration/applicationsWithStatus?page=${page}&size=${PAGE_SIZE}`,
      getHeaders()
    )

  public approveRegistrationRequest = (applicationId: string) =>
    this.instance.put<void>(
      `/api/administration/registration/application/${applicationId}/approveRequest`,
      getHeaders()
    )

  public declineRegistrationRequest = (applicationId: string) =>
    this.instance.put<void>(
      `/api/administration/registration/application/${applicationId}/declineRequest`,
      getHeaders()
    )
}
