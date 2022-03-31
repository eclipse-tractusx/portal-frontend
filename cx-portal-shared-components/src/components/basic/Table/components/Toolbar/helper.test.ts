import { SelectedFilter, ToolbarProps } from '.'
import { initSelectedFilter, getSelectedFilterUpdate } from './helper'

const filter: ToolbarProps['filter'] = [
  {
    name: 'role',
    values: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
    ],
  },
  {
    name: 'status',
    values: [{ value: 'confirmed' }],
  },
]

const selected: SelectedFilter = {
  role: ['admin', 'editor'],
  status: ['confirmed'],
}

describe('TableToolbarTest', () => {
  it('converts Filter input into initial SelectedFilter object', () => {
    expect(initSelectedFilter(filter)).toEqual({
      role: ['admin', 'editor'],
      status: ['confirmed'],
    })

    expect(initSelectedFilter(undefined)).toEqual({})
  })

  it('removes values from SelectedFilter object', () => {
    expect(getSelectedFilterUpdate(selected, 'role', 'admin', false)).toEqual({
      role: ['editor'],
      status: ['confirmed'],
    })
  })

  it('adds values to SelectedFilter object', () => {
    expect(getSelectedFilterUpdate(selected, 'role', 'manager', true)).toEqual({
      role: ['admin', 'editor', 'manager'],
      status: ['confirmed'],
    })
  })
})
