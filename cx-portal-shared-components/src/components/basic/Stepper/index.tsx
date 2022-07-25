import { Box } from '@mui/material'
import { StepperItem } from './StepperItem'

export interface StepperProps {
  list: any[]
  showSteps: number
  activeStep: number
}

export const Stepper = ({
  list,
  showSteps,
  activeStep,
}: StepperProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        margin: '0px auto',
      }}
    >
      {list &&
        list
          .filter(
            (item) => item.step <= showSteps && item.step <= list.length
          )
          .map((item, i) => (
            <StepperItem
              key={i}
              step={item.step}
              headline={item.headline}
              activeStep={activeStep}
              index={i + 1}
            />
          ))}
    </Box>
  )
}
