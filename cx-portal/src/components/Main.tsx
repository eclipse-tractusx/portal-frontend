import { Outlet, useSearchParams } from 'react-router-dom'
import { Header } from './shared/frame/Header'
import { Footer } from './shared/frame/Footer'
import { useTranslation } from 'react-i18next'
import AccessService from '../services/AccessService'
import './styles/main.scss'
import MainOverlay from './MainOverlay'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { Overlay } from 'features/control/overlay/types'
import { useEffect } from 'react'

export default function Main() {
  document.title = useTranslation().t('title')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const overlay = searchParams.get('overlay')?.split(':')
    overlay && dispatch(show(overlay[0] as Overlay, overlay[1]))
  }, [dispatch, searchParams])

  return (
    <>
      <Header
        main={AccessService.mainMenuTree()}
        user={AccessService.userMenu()}
      />
      <Outlet />
      <Footer pages={AccessService.footerMenu()} />
      <MainOverlay />
    </>
  )
}
