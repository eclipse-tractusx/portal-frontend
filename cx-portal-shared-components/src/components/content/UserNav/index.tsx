import { Menu, MenuProps } from '../../basic/Menu'

export type UserNavProps = MenuProps

export const UserNav = (props: UserNavProps) => {
  return <Menu {...props} />
}
