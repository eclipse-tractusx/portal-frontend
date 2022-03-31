import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs'
import React from 'react'

interface TabsProps extends MuiTabsProps {
  children?: React.ReactElement[]
}

export const Tabs = ({ children, ...props }: TabsProps) => {
  return <MuiTabs {...props}>{children}</MuiTabs>
}
