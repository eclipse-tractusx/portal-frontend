import React, { useState, useRef, useEffect, useCallback } from 'react'
import { debounce } from '../Debounce'

function Input({ error, label, onChange, ...rest }) {
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)
  const debounceInput = useCallback(debounce(onChange, 500), [debounce])
  const blurInput = useCallback(() => setTouched(true), [setTouched])

  useEffect(() => {
    const ref = inputRef.current
    ref.addEventListener('input', debounceInput)
    ref.addEventListener('blur', blurInput)

    return () => {
      ref.removeEventListener('input', debounceInput)
      ref.removeEventListener('blur', blurInput)
    }
  }, [blurInput, debounceInput, inputRef])

  return (
    <>
      <label htmlFor={rest.name}>{label}</label>
      <input className="form-control" {...rest} ref={inputRef} />
      <span className="text-danger">{touched && error}</span>
    </>
  )
}
export default Input
