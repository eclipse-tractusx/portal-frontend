import { Divider, Link, List, ListItem, useTheme } from '@mui/material'
import uniqueId from 'lodash/uniqueId'

type LinkItem = Partial<Record<'href' | 'to', string>>

interface UserNavItem extends LinkItem {
  title: string
  divider?: boolean
}

interface UserNavProps {
  items: UserNavItem[]
  component?: React.ElementType
}

export const UserNav = ({ items, component = Link }: UserNavProps) => {
  const { spacing } = useTheme()

  return (
    <>
      <List sx={{ padding: spacing(0, 1) }}>
        {items?.map(({ title, divider, ...link }) => (
          <ListItem
            key={uniqueId('UserNav')}
            sx={{
              display: 'block',
              padding: 0,
            }}
          >
            <Link
              component={component}
              sx={{
                color: 'text.primary',
                display: 'block',
                padding: spacing(1.5, 2),
                borderRadius: 3,
                typography: 'label3',
                ':hover': {
                  backgroundColor: 'selected.hover',
                  color: 'primary.dark',
                },
              }}
              {...link}
            >
              {title}
            </Link>
            {divider && <Divider />}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ margin: spacing(0, 1) }} />
    </>
  )
}
