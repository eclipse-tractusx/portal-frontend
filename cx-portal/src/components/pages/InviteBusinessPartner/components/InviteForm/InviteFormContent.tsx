import { Button, Input, Typography } from 'cx-portal-shared-components'
import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteData } from 'features/admin/registration/types'
import Patterns from 'types/Patterns'
import './InviteFormContent.scss'

export const InviteFormContent = ({
  state,
  onSubmit,
}: {
  state: string
  onSubmit: (data: InviteData) => void
}) => {
  const { t } = useTranslation()
  const [inpExpr, setInpExpr] = useState<string[]>(['', '', '', ''])
  const [inpValid, setInpValid] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true,
  ])

  const debouncedValidation = useMemo(
    () =>
      debounce((expr: string[]) => {
        console.log('x')
        const check = [
          Patterns.MAIL,
          /^.{2,60}$/i,
          Patterns.NAME,
          Patterns.NAME,
        ].map((p, i) => !p.test(expr[i]))
        check.push(check.reduce((all, valid) => all || valid))
        setInpValid(check)
      }, 300),
    [setInpValid]
  )

  const doValidate = useCallback(
    (index: number, value: string) => {
      const data = inpExpr
      data[index] = value
      setInpExpr(data.slice())
      debouncedValidation(data)
    },
    [debouncedValidation, inpExpr]
  )

  const doSubmit = () =>
    onSubmit({
      userName: inpExpr[0].trim(),
      firstName: inpExpr[2].trim(),
      lastName: inpExpr[3].trim(),
      email: inpExpr[0].trim(),
      organisationName: inpExpr[1].trim(),
    })

  return (
    <>
      <form className="InviteForm">
        {['email', 'company', 'first', 'last'].map((value, i) => (
          <Input
            key={i}
            name={value}
            placeholder={t(`global.field.${value}`)}
            value={inpExpr[i]}
            error={inpValid[i]}
            autoFocus={value==='email'}
            onChange={(e) => doValidate(i, e.target.value)}
          ></Input>
        ))}
        <Button
          name="send"
          size="medium"
          disabled={inpValid[4]}
          onClick={doSubmit}
        >{`${t('content.invite.send')}`}</Button>
        <span className={`InviteFormResult ${state}`}>
          {state === 'busy' ? (
            <span className="loader" />
          ) : (
            t(`content.invite.${state}`)
          )}
        </span>
      </form>
    </>
  )
}
