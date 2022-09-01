import { useRef, useState } from 'react'
import {
  LanguageSwitch,
  UserAvatar,
  UserMenu,
  UserNav,
} from 'cx-portal-shared-components'
import UserService from 'services/UserService'
import i18next, { changeLanguage } from 'i18next'
import I18nService from 'services/I18nService'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './UserInfo.scss'
import { INTERVAL_CHECK_NOTIFICATIONS } from 'types/Constants'
import { useGetNotificationCountQuery } from 'features/notification/apiSlice'

export const UserInfo = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const avatar = useRef<HTMLDivElement>(null)
  const { data } = useGetNotificationCountQuery(false, {
    pollingInterval: INTERVAL_CHECK_NOTIFICATIONS,
  })
  const menu = pages.map((link) => ({
    to: link,
    title: t(`pages.${link}`),
  }))

  const openCloseMenu = () => setMenuOpen((prevVal) => !prevVal)
  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!avatar.current?.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="UserInfo">
      <div ref={avatar}>
        <UserAvatar onClick={openCloseMenu} notificationCount={data} />
      </div>
      <UserMenu
        open={menuOpen}
        top={60}
        userName={UserService.getName()}
        userRole={UserService.getCompany()}
        onClickAway={onClickAway}
      >
        <UserNav
          component={Link}
          onClick={openCloseMenu}
          divider
          items={menu}
        />
        <LanguageSwitch
          current={i18next.language}
          languages={I18nService.supportedLanguages.map((key) => ({ key }))}
          onChange={changeLanguage}
        />
      </UserMenu>
    </div>
  )
}
