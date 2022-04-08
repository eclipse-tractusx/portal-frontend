import React, { useState } from 'react'
import debounce from 'lodash.debounce'

type Errors = Record<string, boolean>

interface Validation {
  pattern?: RegExp
  required?: boolean
}

type FormValidationProps = Record<string, Validation>

const getRequiredKeys = (validation: FormValidationProps): string[] => {
  return Object.entries(validation).reduce((values, [key, { required }]) => {
    return [...values, ...(required ? [key] : [])]
  }, [] as string[])
}

export const useFormValidation = (validation: FormValidationProps) => {
  const [errors, setErrors] = useState<Errors>({})
  const [required, setRequired] = useState<string[]>(
    getRequiredKeys(validation)
  )

  const handleChange = (key: string) => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const isRequired = validation[key]?.required
      const pattern = validation[key]?.pattern

      setRequired(required.filter((value) => value !== key))

      if (isRequired && !value) {
        setRequired([...required, key])
      }
      setErrors({
        ...errors,
        [key]: Boolean(
          (isRequired && !value) || (pattern && !pattern.test(value))
        ),
      })
    }, 300)
  }

  const valid =
    !required.length && Object.values(errors).every((hasError) => !hasError)

  return { handleChange, errors, required, valid }
}
