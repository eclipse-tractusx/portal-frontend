import { Box } from '@mui/material'
import { ListItem } from './ListItem'

export interface ProcessListProps {
  list: any[]
  stepsColor: string
  stepsFontColor: string
  elementNumbers: number
}

export const ProcessList = ({
  list,
  stepsColor,
  stepsFontColor,
  elementNumbers,
}: ProcessListProps) => {
  return (
    <Box>
      {list &&
        list
          .filter(
            (item) => item.step <= elementNumbers && item.step <= list.length
          )
          .map((item, i) => (
            <ListItem
              key={i}
              step={item.step}
              headline={item.headline}
              description={item.description}
              stepsColor={stepsColor}
              stepsFontColor={stepsFontColor}
              lastItem={item.step === elementNumbers}
            />
          ))}
    </Box>
  )
}
