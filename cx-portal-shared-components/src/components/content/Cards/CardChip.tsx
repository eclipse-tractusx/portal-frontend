import { useTheme } from '@mui/material'
import MuiChip from '@mui/material/Chip'
import { useEffect, useState } from 'react'

export enum StatusVariants {
  release = 'release',
  active = 'active',
  inactive = 'inactive',
}

export type Variants =
  | StatusVariants.release
  | StatusVariants.active
  | StatusVariants.inactive

export interface CardChipProps {
  status?: Variants
  statusText?: string
}

export const CardChip = ({ status, statusText }: CardChipProps) => {
  const theme = useTheme()
  const [chipColor, setChipColor] = useState('')
  const [chipBackground, setChipBackground] = useState('')

  useEffect(() => {
    switch (status) {
      case StatusVariants.release:
        setChipColor(theme.palette.chip.release)
        setChipBackground(theme.palette.chip.bgRelease)
        break
      case StatusVariants.active:
        setChipColor(theme.palette.chip.active)
        setChipBackground(theme.palette.chip.bgActive)
        break
      case StatusVariants.inactive:
        setChipColor(theme.palette.chip.inactive)
        setChipBackground(theme.palette.chip.bgInactive)
        break
    }
  }, [status, theme])

  return (
    <MuiChip
      label={statusText}
      variant="outlined"
      sx={{
        color: chipColor,
        backgroundColor: chipBackground,
        borderRadius: '200px',
        border: 'none',
        height: '28px',
      }}
    />
  )
}
