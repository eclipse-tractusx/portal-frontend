import { Button, Input, Typography } from 'cx-portal-shared-components'
import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProvisionIdentityProviderData } from 'types/provisioning/ProvisioningTypes'
import './ProvisionIdentityProviderForm.scss'

export const ProvisionIdentityProviderForm = ({
  state,
  onSubmit,
}: {
  state: string
  onSubmit: (data: ProvisionIdentityProviderData) => void
}) => {
  const { t } = useTranslation()
  const [inpExpr, setInpExpr] = useState<string[]>(['', '', '', '', ''])
  const [inpValid, setInpValid] = useState<boolean[]>([
    false,
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
          /^.{2,60}$/,
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          /^.{2,60}$/,
          /^.{2,60}$/,
          /^[a-z_]{4,20}$/,
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
      organisationName: inpExpr[0].trim(),
      metadataUrl: inpExpr[1].trim(),
      clientId: inpExpr[2].trim(),
      clientSecret: inpExpr[3].trim(),
      clientAuthMethod: inpExpr[4].trim(),
    })

  return (
    <>
      <form className="ProvisionIdentityProviderForm">
        <Typography variant="h4">{t('content.provisionIdp.title')}</Typography>
        {[
          'organization',
          'metadata',
          'clientId',
          'clientSecret',
          'clientAuthMethod',
        ].map((value, i) => (
          <Input
            key={i}
            name={value}
            placeholder={t(`content.provisionIdp.field.${value}`)}
            value={inpExpr[i]}
            error={inpValid[i]}
            onChange={(e) => doValidate(i, e.target.value)}
          ></Input>
        ))}
        <Button
          name="send"
          size="medium"
          disabled={inpValid[5]}
          onClick={doSubmit}
        >{`${t('content.provisionIdp.send')}`}</Button>
      </form>
      <div className={`ProvisionIdentityProviderFormOverlay ${state}`}>
        {state === 'busy' ? (
          <div className="loader" />
        ) : (
          t(`content.provisionIdp.${state}`)
        )}
      </div>
    </>
  )
}
