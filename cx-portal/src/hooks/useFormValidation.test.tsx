import { render } from '@testing-library/react'
import { useFormValidation } from './useFormValidation'

const formFields = [{ key: 'firstname' }, { key: 'lastname' }]

const formFieldsPattern = [
  { key: 'firstname', pattern: /^([A-Za-zÀ-ÿ-,.']{1,40}[ ]?){1,8}$/i },
  { key: 'lastname' },
]

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

  it('initializes the state', () => {
    const { errors, valid } = renderHook(useFormValidation, formFields)

    expect(errors).toEqual({})
    expect(valid).toEqual(true)
  })

  it('initializes the state with patterns', () => {
    const { errors, valid } = renderHook(useFormValidation, formFieldsPattern)

    expect(errors).toEqual({})
    expect(valid).toEqual(false)
  })
})
