import { render } from '@testing-library/react'
import { useFormValidation } from './useFormValidation'

const validation = {
  email: {
    required: true,
  },
  firstname: {
    required: true,
  },
  lastname: {},
}

describe('useFormValidation hook', () => {
  const renderHook = (hook: Function, args: any) => {
    let values: any = {}
    const Component = () => {
      Object.assign(values, hook(args))
      return null
    }
    render(<Component />)
    return values
  }

  let result: any
  beforeEach(() => {
    result = renderHook(useFormValidation, validation)
  })

  it('initializes the state', () => {
    const { errors, required, valid } = result

    expect(errors).toEqual({})
    expect(required).toEqual(['email', 'firstname'])
    expect(valid).toEqual(false)
  })
})
