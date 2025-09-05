import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import debounce from 'lodash.debounce'
import ServicesElements from './ServicesElements'
import RecommendedServices from './RecommendedServices'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import './style.scss'
import {
  SearchInput,
  Typography,
  ViewSelector,
  SortOption,
  CircleProgress,
  LoadMoreButton,
  ErrorBar,
} from '@cofinity-x/shared-components'
import {
  type ServiceRequest,
  useFetchServicesQuery,
} from 'features/serviceMarketplace/serviceApiSlice'
import SortImage from 'components/shared/frame/SortImage'
import { ServiceTypeIdsEnum } from 'features/serviceManagement/apiSlice'
import { SORTING_TYPE } from 'features/serviceManagement/types'
import { serviceTypeMapping } from 'types/Constants'
import { MainHeader } from 'components/shared/cfx/MainHeader'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import NoItems from 'components/pages/NoItems'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const indexToSplit = 4 //show only 2 services in recommended
const serviceTypeIdMapping: Record<string, ServiceTypeIdsEnum> = {
  [ServiceTypeIdsEnum.DATASPACE_SERVICES]: ServiceTypeIdsEnum.DATASPACE_SERVICE,
  [ServiceTypeIdsEnum.CONSULTANCY_SERVICES]:
    ServiceTypeIdsEnum.CONSULTANCY_SERVICE,
}

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(
    t('content.serviceMarketplace.tabs.all')
  )
  const [sortOption, setSortOption] = useState<string>('new')
  const [cardServices, setCardServices] = useState<ServiceRequest[]>([])
  const [page, setPage] = useState<number>(0)
  const [serviceTypeId, setServiceTypeId] = useState<ServiceTypeIdsEnum>()
  const [sortingType, setSortingType] = useState<SORTING_TYPE>(
    SORTING_TYPE.RELEASE_DATE_DESC
  )
  const [argsData, setArgsData] = useState<{
    page: number
    serviceType?: ServiceTypeIdsEnum
    sortingType: SORTING_TYPE
  }>({
    page: 0,
    serviceType: serviceTypeId,
    sortingType,
  })
  const [fullServicesList, setFullServicesList] = useState<ServiceRequest[]>([])

  const { data, error, isError, refetch, isFetching } =
    useFetchServicesQuery(argsData)
  const services = data?.content

  const servicesError = error as FetchBaseQueryError

  const loadServicesWithImages = useCallback(async () => {
    if (services && services.length > 0) {
      const serviceWithImages = await Promise.all(
        services.map((service) => {
          return { ...service, leadPictureId: service.leadPictureId ?? '' }
        })
      )

      const newServices =
        data?.meta.page === 0
          ? serviceWithImages
          : [...fullServicesList, ...serviceWithImages]

      setCardServices(newServices)
      setFullServicesList(newServices)
    }
  }, [services, data?.meta.page])

  useEffect(() => {
    loadServicesWithImages()
  }, [services, data?.meta.page])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    const serviceType = serviceTypeIdMapping[serviceTypeMapping[viewValue]]
    setServiceTypeId(serviceType)
    setArgsData((arg) => ({
      ...arg,
      serviceType: serviceType ?? undefined,
      page: 0,
    }))

    setSelected(viewValue)
    setPage(0)
  }

  const sortOptions = [
    {
      label: t('content.serviceMarketplace.sortOptions.new'),
      value: 'new',
    },
    {
      label: t('content.serviceMarketplace.sortOptions.provider'),
      value: 'provider',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.serviceMarketplace.tabs.all'),
      buttonValue: t('content.serviceMarketplace.tabs.all'),
      onButtonClick: setView,
      dataTestId: 'filter-all-services-button',
    },
    {
      buttonText: t('content.serviceMarketplace.tabs.dataspaceService'),
      buttonValue: t('content.serviceMarketplace.tabs.dataspaceService'),
      onButtonClick: setView,
      dataTestId: 'filter-dataspace-services-button',
    },
    {
      buttonText: t('content.serviceMarketplace.tabs.consultancyService'),
      buttonValue: t('content.serviceMarketplace.tabs.consultancyService'),
      onButtonClick: setView,
      dataTestId: 'filter-consultancy-services-button',
    },
  ]

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        if (!expr) {
          setCardServices(fullServicesList)
          return
        }

        const filtered = fullServicesList.filter(
          (card: ServiceRequest) =>
            card.title.toLowerCase().includes(expr.toLowerCase()) ||
            card.provider.toLowerCase().includes(expr.toLowerCase()) ||
            card?.description?.toLowerCase().includes(expr.toLowerCase())
        )
        setCardServices(filtered)
      }, 300),
    [fullServicesList]
  )

  const doFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const expr = event.target.value

      setSearchExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const setSortOptionFn = useCallback((value: string) => {
    if (value === 'provider') {
      setSortingType(SORTING_TYPE.PROVIDER_DESC)
    }
    setSortOption(value)
    setShowModal(false)
  }, [])

  const setModalFalse = useCallback(() => {
    setShowModal(false)
  }, [])

  const setModalTrue = useCallback(() => {
    setShowModal(true)
  }, [])

  const nextPage = () => {
    setArgsData({
      ...argsData,
      page: page + 1,
    })
    setPage(page + 1)
  }

  const renderServices = () => {
    if (services && services.length === 0) return <NoItems />
    if (!services)
      return (
        <div className="loading-progress">
          <CircleProgress
            variant="indeterminate"
            colorVariant="primary"
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )
    return (
      <RecommendedServices services={cardServices?.slice(0, indexToSplit)} />
    )
  }

  return (
    <main className="serviceMarketplace">
      <MainHeader
        title={t('content.serviceMarketplace.title')}
        subTitle={t('content.serviceMarketplace.description')}
        headerHeight={250}
        subTitleWidth={750}
      />
      {isFetching ? (
        <div style={{ textAlign: 'center' }}>
          <CircleProgress
            variant="indeterminate"
            colorVariant="primary"
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      ) : (
        <>
          <div className="bg-white">
            <div
              className="mainContainer"
              data-testid="services-marketplace-container"
            >
              <div className="mainRow">
                <Typography className="newServicesTitle" variant="h2">
                  {t('content.serviceMarketplace.newServices')}
                </Typography>
                <div>
                  <div className="cx-search-grid">
                    <div className="searchContainer">
                      <SearchInput
                        placeholder={t('notification.search')}
                        value={searchExpr}
                        autoFocus={false}
                        onChange={doFilter}
                      />
                    </div>
                    <div className="filterSection" onMouseLeave={setModalFalse}>
                      <ViewSelector
                        activeView={selected}
                        views={filterButtons}
                      />
                      <SortImage onClick={setModalTrue} selected={showModal} />
                      <div className="sortSection">
                        <SortOption
                          show={showModal}
                          selectedOption={sortOption}
                          setSortOption={setSortOptionFn}
                          sortOptions={sortOptions}
                        />
                      </div>
                    </div>
                  </div>
                  {!isError ? (
                    renderServices()
                  ) : (
                    <ErrorBar
                      errorText={
                        'status' in servicesError &&
                        typeof servicesError.status === 'number' &&
                        servicesError.status >= 400 &&
                        servicesError.status < 500
                          ? t('content.serviceMarketplace.dataLoadFailed')
                          : t('content.serviceMarketplace.loadFailed')
                      }
                      showButton={
                        'status' in servicesError &&
                        typeof servicesError.status === 'number' &&
                        servicesError.status >= 500 &&
                        servicesError.status < 600
                      }
                      buttonText={t('error.tryAgain')}
                      handleButton={refetch}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {cardServices && cardServices.length > 2 && (
            <ServicesElements services={cardServices.slice(indexToSplit)} />
          )}
        </>
      )}
      {cardServices && cardServices.length > 0 && (
        <div className="load-more-btn">
          {data?.meta && data?.meta?.totalPages > page + 1 && (
            <LoadMoreButton
              dataTestId="load-more-services-button"
              onClick={nextPage}
              label={t('content.serviceMarketplace.loadMore')}
            />
          )}
        </div>
      )}
    </main>
  )
}
