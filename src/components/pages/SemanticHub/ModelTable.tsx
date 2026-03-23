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

import { Table } from '@arena2036/portal-shared-components-construct-x'
import {
  useDeleteModelByIdMutation,
  useGetModelsQuery,
} from 'features/semanticModels/apiSlice'
import {
  type SemanticModel,
  DefaultStatus,
} from 'features/semanticModels/types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadMoreButton } from '../../shared/basic/LoadMoreButton'
import { SemanticModelTableColumns } from './SemanticModelTableColumn'
import uniqueId from 'lodash/uniqueId'
import { useSelector } from 'react-redux'
import { semanticModelsSelector } from 'features/semanticModels/slice'

interface ModelTableProps {
  onModelSelect: (id: string) => void
}

type SelectedFilter = {
  [name: string]: string[]
}

const ModelTable = ({ onModelSelect }: ModelTableProps) => {
  const { t } = useTranslation()
  const [models, setModels] = useState<SemanticModel[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>('')
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
          label: 'All',
        },
        {
          value: 'RELEASED',
          label: 'Released',
        },
        {
          value: 'DRAFT',
          label: 'Draft',
        },
        {
          value: 'DEPRECATED',
          label: 'Deprecated',
        },
      ],
    },
  ]

  const {
    data: modelList,
    isLoading: loadingModelList,
    error: modelListError,
  } = useGetModelsQuery({
    page: pageNumber,
    pageSize: rowCount,
    namespaceFilter: searchValue,
    status:
      selectedFilter.status[0] !== DefaultStatus
        ? selectedFilter.status[0]
        : undefined,
  })

  const [deleteModelById] = useDeleteModelByIdMutation()

  const { uploadedModel } = useSelector(semanticModelsSelector)

  useEffect(() => {
    if (modelList) {
      if (pageNumber === 0) {
        setModels(modelList.items)
      } else {
        setModels((prevModels) => [...prevModels, ...modelList.items])
      }
    }
  }, [modelList, pageNumber])

  useEffect(() => {
    if (deleteModelById.length > 0) {
      setModels((prevModels) =>
        prevModels.filter((model) => model.urn !== deleteModelById.toString())
      )
    }
  }, [deleteModelById])

  useEffect(() => {
    if (uploadedModel) {
      setModels((prevModels) => [uploadedModel, ...prevModels])
    }
  }, [uploadedModel])

  const onFilterReset = () => {
    setPageNumber(0)
    setSelectedFilter({ status: [DefaultStatus] })
  }

  const onSearch = (value: string) => {
    setSearchValue(value)
    setModels([])
  }

  const onFilter = (selectedFilter: SelectedFilter) => {
    setModels([])
    setPageNumber(0)
    setSelectedFilter(selectedFilter)
    if (selectedFilter.status[0] === DefaultStatus) {
      onFilterReset()
    }
  }

  const columns = SemanticModelTableColumns(t, onModelSelect)

  const errorObj = {
    status: 0,
    message: '',
  }

  if (modelListError) {
    errorObj.status = Number(modelListError)
    errorObj.message =
      Number(modelListError) >= 400 && Number(modelListError) < 500
        ? t('global.errors.dataLoadFailed')
        : t('global.errors.loadFailed')
  }

  return (
    <section>
      <Table
        autoFocus={false}
        rowsCount={modelList?.totalItems}
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
        reload={() => {
          setPageNumber(0)
        }}
        noRowsMsg={t('global.noData.heading')}
      />
      <div className="load-more-button-container">
        {modelList?.totalPages !== pageNumber && (
          <LoadMoreButton
            onClick={() => {
              setPageNumber((prevState) => prevState + 1)
            }}
            sx={{ mt: 4 }}
          />
        )}
      </div>
    </section>
  )
}

export default ModelTable
