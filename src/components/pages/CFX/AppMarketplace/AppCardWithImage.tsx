import {
  CfxCardMarketplace,
  styled as CfxStyled,
} from '@cofinity-x/shared-components'
import { useNavigate } from 'react-router-dom'
import { fetchImageWithToken } from 'services/ImageService'
import { getApiBase } from 'services/EnvironmentService'
import { useState, useEffect } from 'react'
import { type AppMarketplaceCard } from 'features/apps/types'
import { useCfxTheme } from 'hooks/useCfxTheme'

interface AppCardWithImageProps {
  item: AppMarketplaceCard
}
type SubscriptionStatus = 'active' | 'pending' | 'inactive' | undefined

export const AppCardWithImage = ({ item }: AppCardWithImageProps) => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const cfxTheme = useCfxTheme()

  const StyledCfxCardMarketplace = CfxStyled(CfxCardMarketplace)(() => ({
    '& .MuiTypography-h6': {
      // To prevent global overridden (legacy) styles of h6
      ...cfxTheme.typography.h6,
    },
  }))

  const loadImage = async () => {
    if (item.leadPictureId) {
      try {
        setIsLoading(true)
        const imageUrl = `${getApiBase()}/api/apps/${item.id}/appDocuments/${item.leadPictureId}`
        const arrayBuffer = await fetchImageWithToken(imageUrl)
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
    <StyledCfxCardMarketplace
      data-testid={`app-card-with-image-${item.id}`}
      price={item.price}
      companyName={item.provider}
      applicationName={item.name ?? ''}
      image={imageUrl}
      fullWidth={true}
      loading={isLoading}
      status={
        item.subscriptionStatus?.toLocaleLowerCase() as SubscriptionStatus
      }
      onClick={() => {
        navigate(`/appdetail/${item.id}`)
      }}
    />
  )
}
