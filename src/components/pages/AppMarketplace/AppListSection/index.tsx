import { useTranslation } from 'react-i18next'
import {
  CircleProgress,
  ErrorBar,
  Typography,
} from '@cofinity-x/shared-components'
import { useTheme } from '@mui/material'
import { AppListGroupView } from '../AppListGroupView'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { appsControlSelector } from 'features/apps/control'
import { type AppMarketplaceApp } from 'features/apps/types'
import { useEffect, useState } from 'react'
import NoItems from 'components/pages/NoItems'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const label = 'AppList'

export default function AppListSection() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { data, error, isError, refetch } = useFetchActiveAppsQuery()
  const control = useSelector(appsControlSelector)
  const [list, setList] = useState<AppMarketplaceApp[]>([])

  const activeAppsError = error as FetchBaseQueryError

  useEffect(() => {
    refetch()
  }, [id, location.key])

  useEffect(() => {
    if (data) {
      setList(data)
    }
  }, [data])

  const renderProgress = () => (
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
  )

  const renderNoMatch = () => (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5">
        {t('content.appstore.appOverviewSection.noMatch')}
      </Typography>
      <Typography variant="body1">
        {t('content.appstore.appOverviewSection.for')}
      </Typography>
    </div>
  )

  const renderGroups = () =>
    list && (
      <AppListGroupView
        items={list
          ?.filter(
            (app) =>
              app?.name?.toLowerCase().includes(control.search.toLowerCase()) ??
              app?.title?.toLowerCase().includes(control.search.toLowerCase())
          )
          .map(CommonService.appToCard)
          .map((card) => ({
            ...card,
            onButtonClick: () => {
              navigate(`/appdetail/${card.id}`)
            },

            addButtonClicked: card.addButtonClicked,
            description: card.description,
          }))}
        groupKey={control.group}
      />
    )

  const renderList = () => {
    if (data && data.length === 0) return <NoItems />
    if (!data) return renderProgress()
    if (!data.length) return renderNoMatch()
    return renderGroups()
  }

  return (
    <section>
      {!isError ? (
        renderList()
      ) : (
        <ErrorBar
          errorText={
            'status' in activeAppsError &&
            typeof activeAppsError.status === 'number' &&
            activeAppsError.status >= 400 &&
            activeAppsError.status < 500
              ? t('content.appstore.appOverviewSection.dataLoadFailed')
              : t('content.appstore.appOverviewSection.loadFailed')
          }
          showButton={
            'status' in activeAppsError &&
            typeof activeAppsError.status === 'number' &&
            activeAppsError.status >= 500 &&
            activeAppsError.status < 600
          }
          buttonText={t('error.tryAgain')}
          handleButton={refetch}
        />
      )}
    </section>
  )
}
