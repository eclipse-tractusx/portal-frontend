import StageHeader from 'components/shared/frame/StageHeader'
import { Button, Typography } from 'cx-portal-shared-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import ModelDetailDialog from './ModelDetailDialog'
import ModelTable from './ModelTable'
import { useDispatch } from 'react-redux'
import { fetchSemanticModelById } from 'features/semanticModels/actions'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModelImportDialog from './ModeImportDialog'

export default function SemanticHub() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showModel, setShowModel] = useState<boolean>(false)
  const [importModel, setImportModel] = useState<boolean>(false)

  const onModelSelect = (urn: string) => {
    setShowModel(true)
    const encodedUrn = encodeURIComponent(urn)
    dispatch(fetchSemanticModelById(encodedUrn))
  }

  return (
    <>
      <StageHeader title={t('content.semantichub.title')} />
      <main className="semantic-models">
        <section>
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <Typography variant="body2" mb={4}>
                {t('content.semantichub.introText')}
              </Typography>
              <Button
                onClick={() => setImportModel(true)}
                startIcon={<AddCircleOutlineIcon fontSize="large" />}
              >
                {t('content.semantichub.addModel')}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <img
                style={{ marginTop: '-200px', border: '16px solid white' }}
                src="/edc-connector-text-image.png"
                width="100%"
                alt={'alt tag info'}
              />
            </Grid>
          </Grid>
        </section>
        <ModelTable onModelSelect={onModelSelect} />
      </main>
      <ModelDetailDialog show={showModel} onClose={() => setShowModel(false)} />
      <ModelImportDialog
        show={importModel}
        onClose={() => setImportModel(false)}
      />
    </>
  )
}
