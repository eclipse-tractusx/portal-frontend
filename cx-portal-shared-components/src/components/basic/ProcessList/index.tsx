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
        list.map((item: any) => {
          if (item.step <= elementNumbers && item.step <= list.length) {
            return (
              <ListItem
                step={item.step}
                headline={item.headline}
                description={item.description}
                stepsColor={stepsColor}
                stepsFontColor={stepsFontColor}
                lastItem={item.step === elementNumbers}
              />
            )
          }
        })}
    </Box>
  )
}
