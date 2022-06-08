import { Typography } from '@mui/material'
import { PageHeaderProps } from '../../PageHeader/PageHeader'

export const MainHeaderTitle = ({ title }: PageHeaderProps) => {
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
          {title} MAIN
        </Typography>
      )}
    </>
  )
}
