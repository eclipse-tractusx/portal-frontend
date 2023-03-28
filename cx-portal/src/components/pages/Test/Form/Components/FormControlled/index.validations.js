import * as yup from 'yup'

export const FormValidations = yup.object().shape({
    name: yup
      .string()
      .required('Name is required'),
    email: yup
      .string()
      .email("E-mail is invalid")
      .required('E-mail is required'),
    password: yup
      .string()
      .min(8, 'Minimum 8 characters')
      .max(20, 'Max 20 characters')
})