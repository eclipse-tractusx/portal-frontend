import { Typography } from '@mui/material'
import { PageHeaderProps } from '../PageHeader'

export const HeaderTitle = ({ title }: PageHeaderProps) => {
  return (
    <>
      {title && (
        <Typography
          sx={{
            paddingTop: '36px',
            fontFamily: 'LibreFranklin-Light',
          }}
          variant="h4"
        >
          {title}
        </Typography>
      )}
    </>
  )
}
