import { useCallback, useMemo, useState } from 'react'
import { InviteData } from 'features/admin/registration/types'
import {
  DialogHeader,
  DialogContent,
  Button,
  DialogActions,
  Input,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import debounce from 'lodash.debounce'
import { useTranslation } from 'react-i18next'
import Patterns from 'types/Patterns'

export default function InviteForm() {
  const [processing, setProcessing] = useState<string>('input')
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [inpExpr, setInpExpr] = useState<string[]>(['', '', '', ''])
  const [inpValid, setInpValid] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true,
  ])

  console.log(processing)

  const debouncedValidation = useMemo(
    () =>
      debounce((expr: string[]) => {
        const check = [
          /^.{2,60}$/i,
          Patterns.MAIL,
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

  const doSubmitInvite = (data: InviteData) => {
    setProcessing('busy')
    console.log('submit invite', data)
    /*
    new AdminRegistrationApi()
      .postInviteBusinessPartner(data)
      .then(() => {
        setProcessing('success')
        info(`onboarding for company ${data.organisationName} started`)
      })
      .catch((error: unknown) => {
        setProcessing('failure')
        info(`onboarding for company ${data.organisationName} failed`)
        info(JSON.stringify(error))
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing('input')
        }, 5000)
      })
      */
  }

  const doSubmit = () =>
    doSubmitInvite({
      userName: inpExpr[1].trim(),
      firstName: inpExpr[2].trim(),
      lastName: inpExpr[3].trim(),
      email: inpExpr[1].trim(),
      organisationName: inpExpr[0].trim(),
    })

  return (
    <>
      <DialogHeader
        {...{
          title: t('content.invite.headerTitle'),
          intro: t('content.invite.headerIntro'),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent sx={{ padding: '0px 130px 40px 150px' }}>
        <form className="InviteForm">
          {['company', 'email', 'first', 'last'].map((value, i) => (
            <Input
              label={t(`global.field.${value}`)}
              key={i}
              name={value}
              placeholder={t(`global.field.${value}`)}
              value={inpExpr[i]}
              error={inpValid[i]}
              autoFocus={value === 'company'}
              onChange={(e) => doValidate(i, e.target.value)}
            ></Input>
          ))}
        </form>
        {/*<span className={`InviteFormResult ${state}`}>
            {state === 'busy' && <span className="loader" />}
            </span>*/}
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={(e) => dispatch(show(OVERLAYS.NONE))}
        >
          {`${t('global.actions.cancel')}`}
        </Button>
        <Button name="send" disabled={inpValid[4]} onClick={doSubmit}>
          {`${t('content.invite.invite')}`}
        </Button>
      </DialogActions>
    </>
  )
}
