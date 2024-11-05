/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { Table } from '@catena-x/portal-shared-components'
import { fetchSemanticModels } from 'features/semanticModels/actions'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import {
  type FilterParams,
  type SemanticModel,
  DefaultStatus,
} from 'features/semanticModels/types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { LoadMoreButton } from '../../shared/basic/LoadMoreButton'
import { SemanticModelTableColumns } from './SemanticModelTableColumn'
import uniqueId from 'lodash/uniqueId'
import type { AppDispatch } from 'features/store'

interface ModelTableProps {
  onModelSelect: (id: string) => void
}

type SelectedFilter = {
  [name: string]: string[]
}

const ModelTable = ({ onModelSelect }: ModelTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { modelList, loadingModelList, deleteModelId, uploadedModel, error } =
    useSelector(semanticModelsSelector)
  const [models, setModels] = useState<SemanticModel[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    status: [DefaultStatus],
  })
  const rowCount = 10
  const filter = [
    {
      name: 'status',
      values: [
        {
          value: DefaultStatus,
          label: t('content.semantichub.modelTable.status.all'),
        },
        {
          value: 'RELEASED',
          label: t('content.semantichub.modelTable.status.released'),
        },
        {
          value: 'DRAFT',
          label: t('content.semantichub.modelTable.status.draft'),
        },
        {
          value: 'DEPRECATED',
          label: t('content.semantichub.modelTable.status.deprecated'),
        },
      ],
    },
  ]

  useEffect(() => {
    const filter = {
      page: pageNumber,
      pageSize: rowCount,
      ...(selectedFilter.status[0] !== DefaultStatus && {
        status: selectedFilter.status[0],
      }),
    }
    dispatch(fetchSemanticModels({ filter }))
  }, [dispatch])

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
    if (models.length > 0 && pageNumber > 0) {
      if (modelList.items.length > 0)
        setModels((prevModels) => prevModels.concat(modelList.items))
    } else {
      setModels(modelList.items)
    }
  }, [modelList])

  const onFilterReset = () => {
    //Reset PageNumber back to 0
    dispatch(
      fetchSemanticModels({
        filter: { page: 0, pageSize: rowCount, namespaceFilter: searchText },
      })
    )
  }

  const onSearch = (value: string) => {
    setModels([])
    setSearchText(value)
    const filter: FilterParams = {
      page: 0,
      pageSize: rowCount,
      namespaceFilter: value,
      ...(selectedFilter.status[0] !== DefaultStatus && {
        status: selectedFilter.status[0],
      }),
    }
    dispatch(fetchSemanticModels({ filter }))
  }

  const onFilter = (selectedFilter: SelectedFilter) => {
    setModels([])
    //Reset PageNumber back to 0
    setSelectedFilter(selectedFilter)
    setPageNumber(0)
    if (selectedFilter.status[0] !== DefaultStatus) {
      dispatch(
        fetchSemanticModels({
          filter: {
            page: 0,
            pageSize: rowCount,
            status: selectedFilter.status[0],
            namespaceFilter: searchText,
          },
        })
      )
    } else {
      onFilterReset()
    }
  }

  const onLoadMore = () => {
    const page = pageNumber + 1
    setPageNumber(page)
    const filter = {
      page,
      pageSize: rowCount,
      namespaceFilter: searchText,
      ...(selectedFilter.status[0] !== DefaultStatus && {
        status: selectedFilter.status[0],
      }),
    }
    dispatch(fetchSemanticModels({ filter }))
  }
  const columns = SemanticModelTableColumns(t, onModelSelect)
  const errorObj = {
    status: 0,
    message: '',
  }

  if (error) {
    errorObj.status = Number(error)
    errorObj.message =
      Number(error) >= 400 && Number(error) < 500
        ? t('global.errors.dataLoadFailed')
        : t('global.errors.loadFailed')
  }

  return (
    <section>
      <Table
        autoFocus={false}
        rowsCount={modelList.totalItems}
        hideFooter
        loading={loadingModelList}
        disableRowSelectionOnClick={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        columnHeadersBackgroundColor={'#ffffff'}
        title={t('content.semantichub.table.title')}
        searchPlaceholder={t(
          'content.semantichub.table.searchfielddefaulttext'
        )}
        toolbarVariant="ultimate"
        searchExpr={searchText}
        toolbar={{
          onSearch,
          onFilter,
          filter,
          selectedFilter,
        }}
        columns={columns}
        rows={models}
        getRowId={(row: { urn: string | undefined }) => uniqueId(row.urn)}
        hasBorder={false}
        error={errorObj}
        reload={() =>
          dispatch(
            fetchSemanticModels({ filter: { page: 0, pageSize: rowCount } })
          )
        }
        noRowsMsg={t('global.noData.heading')}
      />
      <div className="load-more-button-container">
        {modelList.totalItems > models.length && !loadingModelList && (
          <LoadMoreButton
            onClick={() => {
              onLoadMore()
            }}
            sx={{ mt: 4 }}
          />
        )}
      </div>
    </section>
  )
}

export default ModelTable
