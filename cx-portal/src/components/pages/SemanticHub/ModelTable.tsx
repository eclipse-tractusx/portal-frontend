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

import { Button, Table, Input } from 'cx-portal-shared-components'
import { fetchSemanticModels } from 'features/semanticModels/actions'
import { semanticModelsSelector } from 'features/semanticModels/slice'
import {
  FilterParams,
  SearchType,
  SemanticModel,
} from 'features/semanticModels/types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { SemanticModelTableColumns } from './SemanticModelTableColumn'
import { InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material'
import uniqueId from 'lodash/uniqueId'

interface ModelTableProps {
  onModelSelect: (id: string) => void
}

type SelectedFilter = {
  [name: string]: string[]
}

const ModelTable = ({ onModelSelect }: ModelTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { modelList, loadingModelList, deleteModelId, uploadedModel } =
    useSelector(semanticModelsSelector)
  const [models, setModels] = useState<SemanticModel[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [namespaceFilter, setNamespaceFilter] = useState<string>('')
  const [nameFilter, setNameFilter] = useState<string>('')
  const [objectType, setObjectType] = useState<string>('')
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    status: ['RELEASED', 'DRAFT', 'DEPRECATED'],
  })
  const rowCount = 10
  const filter = [
    {
      name: 'status',
      values: [
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
  const searchTypes = Object.entries(SearchType)

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
    if (models.length > 0 && pageNumber > 0) {
      if (modelList.items.length > 0)
        setModels((prevModels) => prevModels.concat(modelList.items))
    } else {
      setModels(modelList.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelList])

  const filterHasValues = () =>
    `${namespaceFilter}${nameFilter}${objectType}`.length > 0

  const onFilterReset = (skipReset?: boolean) => {
    if (!skipReset) {
      setNamespaceFilter('')
      setNameFilter('')
      setObjectType('')
      setOpenFilter(false)
    }
    dispatch(
      fetchSemanticModels({ filter: { page: pageNumber, pageSize: rowCount } })
    )
  }

  const onEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch()
    }
  }

  const onSearch = () => {
    const searchFilter: FilterParams = { page: 0, pageSize: rowCount }
    if (namespaceFilter.length > 0) {
      searchFilter.namespaceFilter = namespaceFilter
    }
    if (nameFilter.length > 0) {
      searchFilter.nameFilter = nameFilter
    }
    if (objectType.length > 0) {
      searchFilter.nameType = encodeURIComponent(objectType)
    }
    dispatch(fetchSemanticModels({ filter: searchFilter }))
  }

  const onOpenFilter = (value: boolean) => {
    setOpenFilter(value)
  }

  const onFilter = (selectedFilter: any) => {
    setSelectedFilter(selectedFilter)
    if (selectedFilter.status && selectedFilter.status.length === 1) {
      dispatch(
        fetchSemanticModels({
          filter: {
            page: 0,
            pageSize: rowCount,
            status: selectedFilter.status[0],
          },
        })
      )
    } else {
      onFilterReset(true)
    }
  }
  const columns = SemanticModelTableColumns(t, onModelSelect)

  return (
    <section>
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
        sx={{
          mb: 2,
          width: '100%',
        }}
      >
        <Input
          value={namespaceFilter}
          onChange={(e) => setNamespaceFilter(e.target.value)}
          onKeyDown={onEnterInput}
          label={t('content.semantichub.table.filter.namespaceLabel')}
          placeholder={t(
            'content.semantichub.table.filter.namespacePlaceholder'
          )}
          variant="filled"
          sx={{ minWidth: '320px' }}
        />
        <Box sx={{ ml: 1 }}>
          <Input
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            onKeyDown={onEnterInput}
            label={t('content.semantichub.table.filter.objNameLabel')}
            placeholder={t(
              'content.semantichub.table.filter.objNamePlaceholder'
            )}
            variant="filled"
            sx={{ minWidth: '320px' }}
          />
        </Box>
        <FormControl variant="outlined" sx={{ ml: 1 }}>
          <InputLabel id="table-select-label">
            {t('content.semantichub.table.filter.selectLabel')}
          </InputLabel>
          <Select
            labelId="table-select-label"
            id="table-select"
            value={objectType}
            label={t('content.semantichub.table.filter.selectLabel')}
            onChange={(e) => setObjectType(e.target.value)}
            variant="filled"
            sx={{ minWidth: '200px' }}
          >
            {searchTypes.map((item) => (
              <MenuItem key={item[0]} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {filterHasValues() && (
          <Button
            onClick={() => {
              onFilterReset()
            }}
            sx={{ ml: 1 }}
          >
            {t('content.semantichub.table.filter.resetButton')}
          </Button>
        )}
        <Button onClick={onSearch} sx={{ ml: 1 }}>
          {t('content.semantichub.table.filter.button')}
        </Button>
      </Box>
      <Table
        rowsCount={modelList.totalItems}
        hideFooter
        loading={loadingModelList}
        disableSelectionOnClick={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        title={t('content.semantichub.table.title')}
        toolbarVariant="premium"
        toolbar={{
          onFilter: onFilter,
          filter: filter,
          openFilterSection: openFilter,
          onOpenFilterSection: onOpenFilter,
          selectedFilter: selectedFilter,
        }}
        columns={columns}
        rows={models}
        getRowId={(row) => uniqueId(row.urn)}
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
