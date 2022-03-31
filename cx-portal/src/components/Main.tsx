import { Outlet } from 'react-router-dom'
import { Header } from './shared/frame/Header/Header'
import { Footer } from './shared/frame/Footer'
import { useTranslation } from 'react-i18next'
import AccessService from '../services/AccessService'
import './styles/Main.scss'

export default function Main() {
  document.title = useTranslation().t('title')
  return (
    <>
      <Header
        pages={AccessService.mainMenu()}
        userPages={AccessService.userMenu()}
      />
      <Outlet />
      <Footer pages={AccessService.footerMenu()} />
    </>
  )
}
