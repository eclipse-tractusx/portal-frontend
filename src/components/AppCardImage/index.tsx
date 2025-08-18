import { CfxCardMarketplace } from '@cofinity-x/shared-components'
import { fetchImageWithToken } from 'services/ImageService'
import { useState, useEffect } from 'react'
import { type AppMarketplaceCard } from 'features/apps/types'
import { type ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'

interface AppCardWithImageProps {
  item: AppMarketplaceCard | ServiceRequest
  onClick: (id: string) => void
  fullWidth?: boolean
}
type SubscriptionStatus = 'active' | 'pending' | 'inactive' | undefined

export const AppCardWithImage = ({
  item,
  onClick,
  fullWidth = true,
}: AppCardWithImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadImage = async () => {
    if (item.leadPictureId) {
      try {
        setIsLoading(true)
        const arrayBuffer = await fetchImageWithToken(item.leadPictureId)
        const blob = new Blob([arrayBuffer], { type: 'image/*' })
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      } catch (error) {
        console.error('Failed to load image:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    loadImage()
    return () => {
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [item.leadPictureId])

  return (
    <CfxCardMarketplace
      data-testid={`card-with-image-${item.id}`}
      price={item.price}
      companyName={item.provider}
      applicationName={item.name ?? ''}
      image={imageUrl}
      fullWidth={fullWidth}
      loading={isLoading}
      status={
        (
          item as AppMarketplaceCard
        ).subscriptionStatus?.toLocaleLowerCase() as SubscriptionStatus
      }
      onClick={() => {
        onClick(item.id)
      }}
    />
  )
}
