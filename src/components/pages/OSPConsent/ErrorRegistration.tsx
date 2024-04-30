import type { Dispatch, SetStateAction } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  LoadingButton,
  Typography,
} from '@catena-x/portal-shared-components'

interface ErrorRegProps {
  loading: boolean
  handleSubmit: () => void
  setIsError: Dispatch<SetStateAction<boolean>>
}

export const ErrorRegistration = ({
  loading,
  handleSubmit,
  setIsError,
}: ErrorRegProps) => {
  const { t } = useTranslation('registration')

  return (
    <div className="registration-error">
      <Trans>
        <Typography variant="body2" className="description">
          {t('osp.error.description')}
        </Typography>
      </Trans>
      <div className="retryBtn">
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="small"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button variant="contained" size="small" onClick={handleSubmit}>
            {t('osp.error.retry')}
          </Button>
        )}
        <Button
          variant="outlined"
          size="small"
          className="backBtn"
          onClick={() => {
            setIsError(false)
          }}
        >
          {t('osp.error.back')}
        </Button>
      </div>
      <div className="helpdeskText">
        <Trans>
          <Typography variant="body3">{t('osp.helpText')}</Typography>
        </Trans>
      </div>
    </div>
  )
}
