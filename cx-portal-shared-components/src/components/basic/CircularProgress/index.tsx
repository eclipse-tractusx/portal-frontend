import {
  CircularProgress as Loading,
  CircularProgressProps,
} from '@mui/material'

export const CircularProgress = ({
  size = 60,
  thickness = 4,
  ...props
}: CircularProgressProps) => {
  return (
    <Loading
      {...{
        ...props,
        ...{
          size,
          thickness,
          variant: 'indeterminate',
          value: 100,
        },
      }}
    />
  )
}
