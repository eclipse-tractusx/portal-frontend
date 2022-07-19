import { Box, useTheme } from '@mui/material'
import MuiChip from '@mui/material/Chip'
import { useEffect, useState } from 'react'
import { LogoGrayData } from '../../basic/Logo'
import { Typography } from '../../basic/Typography'
import { EnumStatusVariants, getChipBgColor, getChipColor, StatusVariants } from './Card'

interface CardHorizontalProps {
  label: string
  title: string
  borderRadius: number
  imagePath: string
  imageAlt: string
  status: StatusVariants
  statusText: string
}

export const CardHorizontal = ({
  label,
  title,
  borderRadius = 0,
  imagePath,
  imageAlt,
  status = EnumStatusVariants.release,
  statusText,
}: CardHorizontalProps) => {
  const theme = useTheme()
  const [chipColor, setChipColor] = useState('')
  const [chipBackground, setChipBackground] = useState('')

  useEffect(() => {
    setChipColor(getChipColor(status, theme))
    setChipBackground(getChipBgColor(status, theme))
  }, [status, theme])

  return (
    <Box
      sx={{
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

        <MuiChip
          label={statusText}
          variant="outlined"
          sx={{
            color: chipColor,
            backgroundColor: chipBackground,
            borderRadius: '200px',
            border: 'none',
            height: '44px',
          }}
        />
      </Box>
    </Box>
  )
}
