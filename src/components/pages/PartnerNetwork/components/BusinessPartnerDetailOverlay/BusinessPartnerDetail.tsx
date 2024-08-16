/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useFetchBusinessPartnerAddressMutation } from 'features/newPartnerNetwork/partnerNetworkApiSlice'
import BusinessPartnerDetailContent from './BusinessPartnerDetailContent'
import { useEffect, useState } from 'react'
import { type BusinessPartner } from 'features/partnerNetwork/types'

const BusinessPartnerDetail = ({ id }: { id: string }) => {
  const [bpMutation] = useFetchBusinessPartnerAddressMutation()
  const [items, setItems] = useState<BusinessPartner[]>()
  const callApi = async () => {
    await bpMutation({
      bpnLs: [id],
      legalName: '',
    })
      .unwrap()
      .then((data) => {
        console.log(data)
        setItems(data.content)
      })
      .catch(() => {
        setItems([])
      })
  }

  useEffect(() => {
    callApi()
  }, [])

  return (
    <>
      {items?.length && (
        <BusinessPartnerDetailContent selectedRowBPN={items[0]} />
      )}
    </>
  )
}

export default BusinessPartnerDetail
