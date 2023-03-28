import { useState, useEffect, useCallback } from 'react'
import { ValidationError } from "yup"

const useValidation = (values, schema) => {
   const [errors, setErrors] = useState({})
   const [isValid, setIsValid] = useState(false)

   const validate = useCallback(async () => {
      try {
         await schema.validate(values, { abortEarly: false })
         setErrors({})
         setIsValid(true)
      } catch (e) {
         if (e instanceof ValidationError) {
            const errors = {}
            e.inner.forEach((key) => {
               errors[key.path] = key.message
            })
            setErrors(errors)
            setIsValid(false)
         }
      }
   }, [schema, values])

   useEffect(() => {
      validate()
   }, [validate])

   return { errors, isValid }
}

export default useValidation

