import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab'

interface TabProps extends MuiTabProps {}

export const Tab = ({ ...props }: TabProps) => {
  return <MuiTab {...props} />
}
