import { UserInfo } from '../UserInfo/UserInfo'
import { Logo } from '../Logo/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navigation, Button } from 'cx-portal-shared-components'
import './Header.scss'
import { useTranslation } from 'react-i18next'

export const Header = ({
  pages,
  userPages,
}: {
  pages: string[]
  userPages: string[]
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const menu = pages.map((page) => ({
    to: page,
    title: t(`pages.${page}`),
  }))

  const onButtonClick = () => {
    console.log('click')
  }

  return (
    <header>
      <Logo />
      <Navigation items={menu} component={NavLink} />
      <div className="d-flex">
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => navigate('/help')}
          sx={{ backgroundColor: 'white', marginRight: '16px' }}
        >
          {t('pages.help')}
        </Button>
        <UserInfo pages={userPages} />
      </div>
    </header>
  )
}
