/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Button, Table } from 'cx-portal-shared-components'
import { fetchSemanticModels } from 'features/semanticModels/actions'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import { SemanticModel } from 'features/semanticModels/types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { SemanticModelTableColumns } from './SemanticModelTableColumn'

interface ModelTableProps {
  onModelSelect: (id: string) => void
}

const ModelTable = ({ onModelSelect }: ModelTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { modelList, loadingModelList, deleteModelId, uploadedModel } =
    useSelector(semanticModelsSelector)
  const [models, setModels] = useState<SemanticModel[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const rowCount = 10
  const modelListHasItems = () => modelList.items.length > 0

  useEffect(() => {
    dispatch(
      fetchSemanticModels({ filter: { page: pageNumber, pageSize: rowCount } })
    )
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (deleteModelId.length > 0) {
      setModels((prevModels) =>
        prevModels.filter((model) => model.urn !== deleteModelId)
      )
    }
  }, [deleteModelId])

  useEffect(() => {
    if (uploadedModel !== null) {
      setModels((prevModels) => [uploadedModel, ...prevModels])
    }
  }, [uploadedModel])

  useEffect(() => {
    if (modelListHasItems() && modelList.currentPage === 0)
      setModels(modelList.items)
    if (modelListHasItems() && modelList.currentPage > 0) {
      setModels((prevModels) => prevModels.concat(modelList.items))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelList])

  const onSearch = (value: string) => console.log(value)
  const columns = SemanticModelTableColumns(t, onModelSelect)

  return (
    <section>
      <Table
        rowsCount={modelList.totalItems}
        hideFooter
        loading={loadingModelList}
        disableSelectionOnClick={true}
        title={t('content.semantichub.table.title')}
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={models}
        getRowId={(row) => `${row.urn}`}
      />
      <div className="load-more-button-container">
        {modelList.totalPages !== modelList.currentPage + 1 && (
          <Button
            size="medium"
            sx={{ mt: 15 }}
            onClick={() => setPageNumber((prevState) => prevState + 1)}
          >
            {t('content.semantichub.table.load_button')}
          </Button>
        )}
      </div>
    </section>
  )
}

export default ModelTable
