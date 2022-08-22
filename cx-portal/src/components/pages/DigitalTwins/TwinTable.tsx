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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDigitalTwins } from 'features/digitalTwins/actions'
import { twinsSelector } from 'features/digitalTwins/slice'
import { ShellDescriptor } from 'features/digitalTwins/types'
import { DigitalTwinsTableColumns } from './DigitalTwinsTableColumns'
import uniqueId from 'lodash/uniqueId'

interface TwinTableProps {
  onTwinSelect: (id: string) => void
}

const TwinTable = ({ onTwinSelect }: TwinTableProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { twinList, loading } = useSelector(twinsSelector)
  const [twins, setTwins] = useState<ShellDescriptor[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const rowCount = 10

  useEffect(() => {
    dispatch(
      fetchDigitalTwins({ filter: { page: pageNumber, pageSize: rowCount } })
    )
  }, [dispatch, pageNumber])

  useEffect(() => {
    setTwins((prevTwins) => prevTwins.concat(twinList.items))
  }, [twinList])

  const onSearch = (value: string) => {
    onTwinSelect(value)
  }

  const columns = DigitalTwinsTableColumns(useTranslation, onTwinSelect)

  return (
    <section>
      <Table
        sx={{ '.MuiTextField-root': {marginLeft: '-30px'} }}
        rowsCount={twinList.totalItems}
        disableColumnMenu
        hideFooter
        loading={loading}
        disableSelectionOnClick={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        columnHeadersBackgroundColor={'#ffffff'}
        title={t('content.digitaltwin.table.title')}
        searchPlaceholder={t('content.digitaltwin.table.searchfielddefaulttext')}
        toolbarVariant="ultimate"
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={twins}
        getRowId={(row) => uniqueId(row.idShort)}
        rowHeight={50}
        hasBorder={false}
      />
      <div className="load-more-button-container">
        {twinList.totalPages !== twinList.currentPage && (
          <Button
            size="medium"
            sx={{ mt: 15 }}
            onClick={() => setPageNumber((prevState) => prevState + 1)}
          >
            {t('content.digitaltwin.table.load_button')}
          </Button>
        )}
      </div>
    </section>
  )
}

export default TwinTable
