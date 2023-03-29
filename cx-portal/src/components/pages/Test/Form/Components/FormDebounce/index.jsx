import React, { useState } from 'react'
import Input from './Input'
import { FormValidations } from './index.validations'
import useValidation from './../../hooks/useValidation'

const initialFormState = {
  name: '',
  email: '',
  password: '',
}

function UserForm() {
  const [form, setForm] = useState(initialFormState)
  const { errors, isValid } = useValidation(form, FormValidations)

  const setInput = (newValue) => {
    setForm((form) => ({ ...form, ...newValue }))
  }

  return (
    <>
      <h3>Form Debounce</h3>
      <form>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = ''
            setInput({ password: mail.value })
          }}
        >
          clear
        </button>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = 'valid@email.is'
            setInput({ password: mail.value })
          }}
        >
          valid
        </button>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = 'invalid'
            setInput({ password: mail.value })
          }}
        >
          invalid
        </button>
        <div className="form-group">
          <Input
            name="name"
            onChange={(e) => setInput({ name: e.target.value })}
            label="Name"
            error={errors.name}
            defaultValue={form.name}
          />
        </div>
        <div className="form-group">
          <Input
            id="email"
            name="email"
            onChange={(e) => setInput({ email: e.target.value })}
            label="E-mail"
            error={errors.email}
            defaultValue={form.email}
          />
        </div>
        <div className="form-group">
          <Input
            id="password"
            name="password"
            onChange={(e) => setInput({ password: e.target.value })}
            label="Password"
            error={errors.password}
            defaultValue={form.password}
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default UserForm
