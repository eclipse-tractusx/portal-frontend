import { Box, useTheme } from '@mui/material'
import { LogoGrayData } from '../../basic/Logo'
import { Typography } from '../../basic/Typography'
import { CardChip, CardChipProps } from './CardChip'

interface CardHorizontalProps extends CardChipProps {
  label: string
  title: string
  borderRadius: number
  imagePath: string
  imageAlt: string
  description?: string
  backgroundColor?: string
}

export const CardHorizontal = ({
  label,
  title,
  borderRadius = 0,
  imagePath,
  imageAlt,
  description,
  status,
  statusText,
  backgroundColor,
}: CardHorizontalProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || 'common.white',
        height: '160px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        maxWidth: '539px',
        borderRadius: `${borderRadius}px`,
        ':hover': {
          boxShadow: theme.shadows['20'],
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          width: '160px',
          height: '160px',
          background: theme.palette.accent.accent02,
          borderRadius: `${borderRadius}px`,
        }}
        component="img"
        src={imagePath || LogoGrayData}
        alt={imageAlt}
      />
      <Box
        sx={{
          width: '299px',
          height: '160px',
          margin: '0px 0px 0px auto ',
          paddingTop: '20px',
        }}
      >
        <Typography
          variant="caption2"
          sx={{
            color: theme.palette.text.tertiary,
            fontWeight: '600',
            height: '24px',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            display: 'box',
            lineClamp: '2',
            boxOrient: 'vertical',
            height: '36px',
            marginBottom: '17px',
            marginTop: '9px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption2"
          sx={{
            color: theme.palette.text.tertiary,
            fontWeight: '600',
            height: '24px',
          }}
        >
          {description}
        </Typography>

        {statusText && (
          <Box
            sx={{
              marginTop: '21px',
            }}
          >
            <CardChip status={status} statusText={statusText} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
