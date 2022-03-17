import { UserInfo } from '../UserInfo/UserInfo'
import { Logo } from '../Logo/Logo'
import { NavMenu } from '../NavMenu/NavMenu'
import './Header.scss'

export const Header = ({ pages }: { pages: string[] }) => (
  <header>
    <Logo />
    <NavMenu horizontal={true} pages={pages} />
    <UserInfo />
  </header>
)
