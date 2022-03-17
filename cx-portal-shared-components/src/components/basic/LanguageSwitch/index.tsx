import { Box, Link, useTheme } from '@mui/material'

interface Language {
  key: string
  name?: string
}

interface LanguageSwitchProps {
  current: Language['key']
  languages: Language[]
  onChange: (key: string) => void
}

export const LanguageSwitch = ({
  current,
  languages,
  onChange,
}: LanguageSwitchProps) => {
  const { spacing } = useTheme()

  const onClick = (e: React.SyntheticEvent, key: string) => {
    e.preventDefault()
    onChange(key)
  }

  return (
    <Box sx={{ padding: spacing(2, 3) }}>
      {languages?.map(({ key, name }) => (
        <Link
          href={`?language=${key}`}
          onClick={(e) => onClick(e, key)}
          sx={{
            typography: 'label3',
            marginRight: 2,
            ':last-child': {
              marginRight: 0,
            },
            ...(key === current && {
              color: 'text.primary',
              borderBottom: '2px solid',
            }),
          }}
          key={key}
        >
          {name ? name : key.toUpperCase()}
        </Link>
      ))}
    </Box>
  )
}
