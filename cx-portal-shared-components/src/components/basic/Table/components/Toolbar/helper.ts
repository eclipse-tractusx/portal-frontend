import { SelectedFilter, ToolbarProps } from '.'

export const initSelectedFilter = (filter: ToolbarProps['filter']) => {
  return (
    filter?.reduce(
      (obj, { name, values }) => ({
        ...obj,
        [name]: values?.map(({ value }) => value),
      }),
      {}
    ) || {}
  )
}

export const getSelectedFilterUpdate = (
  selectedFilter: SelectedFilter,
  name: string,
  value: string,
  checked: boolean
): SelectedFilter => {
  return {
    ...selectedFilter,
    [name]: checked
      ? [...selectedFilter[name], value]
      : selectedFilter[name].filter((entry) => entry !== value),
  }
}
