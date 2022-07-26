import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'

interface CircleProgressProps extends Omit<CircularProgressProps, 'variant'> {
  step?: number
  interval?: number
  iteration?: boolean
  variant: 'determinate' | 'indeterminate'
  colorVariant:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export const CircleProgress = ({
  step = 25,
  interval = 800,
  iteration = true,
  thickness = 8,
  size = 80,
  colorVariant,
  variant,
}: CircleProgressProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const rerun = iteration ? 0 : 100
      setProgress((prevProgress: number) =>
        prevProgress >= 100 ? rerun : prevProgress + step
      )
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [interval, step, iteration])

  return (
    <CircularProgress
      variant={variant}
      value={progress}
      color={colorVariant}
      size={size}
      thickness={thickness}
    />
  )
}
