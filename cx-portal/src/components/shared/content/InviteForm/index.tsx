import { Button, Input, Typography } from 'cx-portal-shared-components'
import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteData } from 'types/userAdministration/UserAdministrationTypes'
import './InviteForm.scss'

export const InviteForm = ({
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
        const check = [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          /^.{2,60}$/i,
          /^.([A-Za-zÀ-ÿ-,.']{1,40}[ ]?){1,8}$/i,
          /^.([A-Za-zÀ-ÿ-,.']{1,40}[ ]?){1,8}$/i,
        ].map((p, i) => !p.test(expr[i]))
        check.push(
          check.reduce((all, valid) => all || valid),
          false
        )
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
      organizationName: inpExpr[1].trim(),
    })

  return (
    <>
      <form className="InviteForm">
        <Typography variant="h4">{t('content.invite.title')}</Typography>
        {['email', 'company', 'first', 'last'].map((value, i) => (
          <Input
            key={i}
            name={value}
            placeholder={t(`global.field.${value}`)}
            value={inpExpr[i]}
            error={inpValid[i]}
            onChange={(e) => doValidate(i, e.target.value)}
          ></Input>
        ))}
        <Button
          name="send"
          size="medium"
          disabled={inpValid[4]}
          onClick={doSubmit}
        >{`${t('content.invite.send')}`}</Button>
      </form>
      <div className={`InviteFormOverlay ${state}`}>
        {state === 'busy' ? (
          <div className="loader" />
        ) : (
          t(`content.invite.${state}`)
        )}
      </div>
    </>
  )
}
