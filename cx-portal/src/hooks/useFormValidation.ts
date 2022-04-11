import React, { useState } from 'react'
import debounce from 'lodash.debounce'

type Errors = Record<string, boolean>

type Valids = Record<string, boolean>

interface FormField {
  key: string
  pattern?: RegExp
}

export const useFormValidation = (formFields: FormField[]) => {
  const validate = (
    field: FormField | undefined,
    value: string = ''
  ): boolean => {
    const pattern = field?.pattern
    return !pattern || pattern.test(value)
  }

  const [errors, setErrors] = useState<Errors>({})
  const [valids, setValids] = useState<Valids>(
    formFields.reduce((values, field) => {
      return {
        ...values,
        [field.key]: validate(field),
      }
    }, {} as Valids)
  )

  const handleChange = (key: string) => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const field = formFields.find((item) => item.key === key)
      const isValid = validate(field, value)

      setValids({
        ...valids,
        [key]: isValid,
      })

      setErrors({
        ...errors,
        [key]: !isValid,
      })
    }, 300)
  }

  const valid = Object.values(valids).every((value) => value)

  return { handleChange, errors, valid }
}
