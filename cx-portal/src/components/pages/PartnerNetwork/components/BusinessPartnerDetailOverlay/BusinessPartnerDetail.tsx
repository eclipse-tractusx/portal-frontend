/********************************************************************************
 * 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOneBusinessPartner } from 'features/partnerNetwork/actions'
import BusinessPartnerDetailContent from './BusinessPartnerDetailContent'

const BusinessPartnerDetail = ({ id }: { id: string }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneBusinessPartner({ bpn: id }))
  }, [dispatch, id])

  return <BusinessPartnerDetailContent />
}

export default BusinessPartnerDetail
