import { useState } from 'react'
import { CustomAccordionItem, CustomAccordionProps } from './Item'

export const CustomAccordion = ({
  items,
}: {
  items: CustomAccordionProps[]
}) => {
  const defaultExpanded = items.map((item) => (item.expanded ? item.id : ''))[0]
  const [expanded, setExpanded] = useState<string | false>(defaultExpanded)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <>
      {items.map((item) => {
        item.expanded = expanded === item.id
        item.onChange = handleChange(item.id)
        return <CustomAccordionItem {...item} key={item.id} />
      })}
    </>
  )
}
