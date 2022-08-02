import { combineReducers } from 'redux'
import { slice as details } from './details/slice'
import { slice as favorites } from './favorites/slice'
import { slice as marketplace } from './marketplaceDeprecated/slice'

export const reducer = combineReducers({
  details: details.reducer,
  favorites: favorites.reducer,
  marketplace: marketplace.reducer,
})

const Reducer = { reducer }

export default Reducer
