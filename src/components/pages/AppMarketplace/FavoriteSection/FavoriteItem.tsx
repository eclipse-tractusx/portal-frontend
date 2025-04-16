/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { Card } from '@catena-x/portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommonService from 'services/CommonService'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import { useRemoveItemMutation } from 'features/apps/favorites/apiSlice'
interface FavoriteItemProps {
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  item: any
  expandOnHover: boolean
  cardClick: boolean
}

export default function FavoriteItem({
  item,
  expandOnHover,
  cardClick,
}: Readonly<FavoriteItemProps>) {
  const navigate = useNavigate()
  const [cardImage, setCardImage] = useState('')
  const [addedToFavorite, setAddedToFavorite] = useState(false)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [removeItem] = useRemoveItemMutation()

  const handleSecondaryButtonClick = (id: string) => {
    removeItem(id)
      .unwrap()
      .then(() => {
        setAddedToFavorite(!addedToFavorite)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (item?.leadPictureId) {
      void fetchImage(item?.leadPictureId)
    }
  }, [])

  const fetchImage = async (documentId: string) => {
    try {
      const id = CommonService.isValidPictureId(documentId)
      const result = await fetchDocumentById({
        appId: item.id,
        documentId: id,
      }).unwrap()
      setCardImage(URL.createObjectURL(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = (id: string) => {
    navigate(`/appdetail/${id}`)
  }

  return (
    <Card
      key={uniqueId(item.title)}
      title={item.title}
      subtitle={item.subtitle}
      image={{
        src: cardImage,
      }}
      buttonText="Details"
      imageSize="small"
      imageShape="round"
      variant="compact"
      expandOnHover={expandOnHover}
      filledBackground={true}
      backgroundColor="background.background11"
      rating={item.rating}
      price={item.price}
      onButtonClick={() => {
        handleButtonClick(item.id)
      }}
      onSecondaryButtonClick={() => {
        handleSecondaryButtonClick(item.id)
      }}
      addButtonClicked={true}
      onClick={
        cardClick
          ? () => {
              handleButtonClick(item.id)
            }
          : () => null
      }
    />
  )
}
