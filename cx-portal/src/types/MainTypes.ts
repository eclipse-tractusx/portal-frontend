import { PageNotificationsProps } from 'cx-portal-shared-components'
import { ErrorServiceState } from 'features/error/types'

export type Nullable<T> = T | null

export interface IHashMap<T> {
  [item: string]: T
}

export type TableType = {
  head: string[]
  body: string[][]
}

export interface GeographicCoordinate {
  longitude: number
  latitude: number
  altitude?: number
}

export type SearchParams = {
  readonly name?: string
  readonly page: number
  readonly size: number
}

export interface CardImage {
  src: string
  alt?: string
}

export enum RequestState {
  NONE,
  SUBMIT,
  OK,
  ERROR,
}

export interface AsyncState {
  request: RequestState
  error: string
}

export interface AsyncDataState<T> extends AsyncState {
  data: T
}

export interface ListState<T> {
  items: T[]
  change: T | null
  request: RequestState
  error: string
}

export const InitialListState = {
  items: [],
  change: null,
  request: RequestState.NONE,
  error: '',
}

export type PaginMeta = {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
}

export const initialPaginMeta: PaginMeta = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  contentSize: 0,
}

export type PaginResult<T> = {
  meta: PaginMeta
  content: T[]
}

export const initialPaginResult = { meta: { ...initialPaginMeta }, content: [] }

export type IPage = {
  name: string
  role?: string
  element: JSX.Element
  isRoute?: boolean
  children?: string[]
}

export type IOverlay = {
  name: string
  role?: string
}

export type IAction = {
  name: string
  role?: string
  element: JSX.Element
  value?: string
}

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface Tree {
  name: string
  hint?: string
  children?: Tree[]
}

export interface MenuItem extends LinkItem, Tree {
  title: string
  children?: MenuItem[]
}

export type UserInput = {
  key: string
  i18n: string
  helperText: string
  pattern: RegExp
  value: string
  valid: boolean
}

export const initServicetNotifications: PageNotificationsProps = {
  open: false,
  severity: undefined,
  title: '',
  description: '',
}

export const initErrorServiceState: ErrorServiceState = {
  hasError: false,
  hasNavigation: false,
  header: '',
  title: '',
  description: '',
  reloadPageLink: '',
  reloadButtonTitle: '',
  homePageLink: '',
  homeButtonTitle: '',
}
