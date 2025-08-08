/**
 * Unit tests for AppCardWithImage component
 *
 * This test suite covers:
 * - Component rendering with correct props
 * - Navigation functionality
 * - Image loading with scenarios
 * - Subscription status handling
 * - Error handling
 * - Styles and theme
 */

import { render, screen, waitFor } from '@testing-library/react'
import { CfxCardMarketplace, styled } from '@cofinity-x/shared-components'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AppCardWithImage } from '../index'
import {
  type AppMarketplaceCard,
  SubscriptionStatus,
} from 'features/apps/types'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('services/ImageService', () => ({
  fetchImageWithToken: vi.fn(),
}))

vi.mock('services/EnvironmentService', () => ({
  getApiBase: vi.fn(() => 'https://api.example.com'),
}))

vi.mock('hooks/useCfxTheme', () => ({
  useCfxTheme: vi.fn(() => ({
    typography: {
      h6: {
        fontSize: '16px',
        fontWeight: 600,
      },
    },
  })),
}))

vi.mock('@cofinity-x/shared-components', () => ({
  CfxCardMarketplace: vi.fn(({ children, ...props }) => (
    <div data-testid="cfx-card-marketplace" {...props}>
      {children}
    </div>
  )),
  styled: vi.fn((Component) => () => {
    const StyledComponent = (props: any) => <Component {...props} />
    StyledComponent.displayName = 'StyledComponent'
    return StyledComponent
  }),
}))

// Mock URL APIs
const mockCreateObjectURL = vi.fn()
const mockRevokeObjectURL = vi.fn()

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: mockCreateObjectURL,
})

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: mockRevokeObjectURL,
})

const mockCfxCardMarketplace = vi.mocked(CfxCardMarketplace)
const mockStyled = vi.mocked(styled)

describe('AppCardWithImage', () => {
  const mockItem: AppMarketplaceCard = {
    id: 'test-app-id',
    name: 'Test App',
    provider: 'Test Provider',
    price: '$10.00',
    leadPictureId: 'test-picture-id',
    subscriptionStatus: SubscriptionStatus.ACTIVE,
    title: 'Test App',
    shortDescription: 'Test description',
    useCases: [{ id: 'test-use-case', label: 'Test Use Case' }],
    leadPictureUri: 'test-uri',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateObjectURL.mockReturnValue('blob:test-url')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the component with correct props', () => {
      render(<AppCardWithImage item={mockItem} onClick={() => {}} />)

      expect(mockCfxCardMarketplace).toHaveBeenCalledWith(
        expect.objectContaining({
          'data-testid': 'card-with-image-test-app-id',
          price: '$10.00',
          companyName: 'Test Provider',
          applicationName: 'Test App',
          image: '',
          fullWidth: true,
          loading: false,
          status: 'active',
        }),
        {}
      )
    })

    it('renders with correct data-testid', () => {
      render(<AppCardWithImage item={mockItem} onClick={() => {}} />)
      expect(
        screen.getByTestId('card-with-image-test-app-id')
      ).toBeInTheDocument()
    })

    it('handles empty or missing app name', () => {
      const itemWithoutName = { ...mockItem, name: undefined }

      render(<AppCardWithImage item={itemWithoutName} onClick={() => {}} />)

      expect(mockCfxCardMarketplace).toHaveBeenCalledWith(
        expect.objectContaining({
          applicationName: '',
        }),
        {}
      )
    })
  })

  describe('Navigation', () => {
    it('handles navigation on card click', () => {
      const mockOnClick = vi.fn((id) => {
        mockNavigate(`/appdetail/${id}`)
      })

      render(<AppCardWithImage item={mockItem} onClick={mockOnClick} />)

      const onClickHandler = mockCfxCardMarketplace.mock.calls[0][0].onClick
      if (onClickHandler) {
        onClickHandler({} as React.MouseEvent<HTMLDivElement>)
      }

      expect(mockNavigate).toHaveBeenCalledWith('/appdetail/test-app-id')
    })
  })

  describe('Image Loading', () => {
    it('loads image when leadPictureId is provided', async () => {
      const { fetchImageWithToken } = await import('services/ImageService')
      const mockArrayBuffer = new ArrayBuffer(8)

      vi.mocked(fetchImageWithToken).mockResolvedValue(mockArrayBuffer)

      render(<AppCardWithImage item={mockItem} onClick={() => {}} />)

      await waitFor(() => {
        expect(fetchImageWithToken).toHaveBeenCalledWith('test-picture-id')
      })

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob))
      })
    })

    it('does not load image when leadPictureId is not provided', async () => {
      const { fetchImageWithToken } = await import('services/ImageService')
      const itemWithoutImage = { ...mockItem, leadPictureId: undefined }

      render(<AppCardWithImage item={itemWithoutImage} onClick={() => {}} />)

      await waitFor(() => {
        expect(fetchImageWithToken).not.toHaveBeenCalled()
      })
    })
  })

  describe('Subscription Status', () => {
    it('handles different subscription statuses correctly', () => {
      const testCases = [
        { status: SubscriptionStatus.ACTIVE, expected: 'active' },
        { status: SubscriptionStatus.PENDING, expected: 'pending' },
        { status: SubscriptionStatus.INACTIVE, expected: 'inactive' },
        { status: undefined, expected: undefined },
      ]

      testCases.forEach(({ status, expected }) => {
        vi.clearAllMocks()
        const itemWithStatus = { ...mockItem, subscriptionStatus: status }

        render(<AppCardWithImage item={itemWithStatus} onClick={() => {}} />)

        expect(mockCfxCardMarketplace).toHaveBeenCalledWith(
          expect.objectContaining({
            status: expected,
          }),
          {}
        )
      })
    })
  })

  describe('Styling and Theme', () => {
    it('applies custom styles through styled component', () => {
      render(<AppCardWithImage item={mockItem} onClick={() => {}} />)

      expect(mockStyled).toHaveBeenCalledWith(mockCfxCardMarketplace)
    })

    it('uses cfx theme typography for h6 styling', async () => {
      const { useCfxTheme } = await import('hooks/useCfxTheme')

      render(<AppCardWithImage item={mockItem} onClick={() => {}} />)

      expect(vi.mocked(useCfxTheme)).toHaveBeenCalled()
      expect(mockStyled).toHaveBeenCalledWith(mockCfxCardMarketplace)
    })
  })

  describe('Edge Cases', () => {
    it('handles missing leadPictureId gracefully', () => {
      const itemWithoutLeadPictureId = { ...mockItem, leadPictureId: undefined }

      expect(() => {
        render(
          <AppCardWithImage
            item={itemWithoutLeadPictureId}
            onClick={() => {}}
          />
        )
      }).not.toThrow()
    })

    it('handles missing subscription status gracefully', () => {
      const itemWithoutStatus = { ...mockItem, subscriptionStatus: undefined }

      render(<AppCardWithImage item={itemWithoutStatus} onClick={() => {}} />)

      expect(mockCfxCardMarketplace).toHaveBeenCalledWith(
        expect.objectContaining({
          status: undefined,
        }),
        {}
      )
    })

    it('handles empty price gracefully', () => {
      const itemWithEmptyPrice = { ...mockItem, price: '' }

      render(<AppCardWithImage item={itemWithEmptyPrice} onClick={() => {}} />)

      expect(mockCfxCardMarketplace).toHaveBeenCalledWith(
        expect.objectContaining({
          price: '',
        }),
        {}
      )
    })
  })
})
