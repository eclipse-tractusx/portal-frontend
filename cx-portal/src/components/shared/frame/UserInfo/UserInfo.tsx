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
import AccessService from 'services/AccessService'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './UserInfo.scss'

export const UserInfo = () => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const avatar = useRef<HTMLDivElement>(null)

  const openMenu = () => setMenuOpen(true)
  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!avatar.current?.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="UserInfo">
      <div ref={avatar}>
        <UserAvatar onClick={openMenu} />
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
          items={AccessService.userMenu().map((link) => ({
            to: link,
            title: t(`pages.${link}`),
          }))}
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
