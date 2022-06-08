import { fetchSemanticModels } from 'features/semanticModels/actions'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { SemanticModel } from 'features/semanticModels/types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

interface ModelTableProps {
  onModelSelect: (id: string) => void
}

const ModelTable = ({ onModelSelect }: ModelTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { modelList, loading } = useSelector(semanticModelsSelector)
  const [models, setModels] = useState<SemanticModel[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const rowCount = 10

  useEffect(() => {
    dispatch(
      fetchSemanticModels({ filter: { page: pageNumber, pageSize: rowCount } })
    )
  }, [dispatch, pageNumber])

  useEffect(() => {
    setModels((prevModels) => prevModels.concat(modelList.items))
  }, [modelList])

  return (
    <section>
      {t('content.semantichub.table.title')}
      {/* <Table
        rowsCount={modelList.totalItems}
        hideFooter
        loading={loading}
        disableSelectionOnClick={true}
        title={t('content.semantichub.table.title')}
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={models}
        getRowId={(row) => `${row.identification}_${row.idShort}`}
      /> */}
    </section>
  )
}

export default ModelTable
