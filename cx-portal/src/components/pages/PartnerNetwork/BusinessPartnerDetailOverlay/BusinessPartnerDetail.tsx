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
