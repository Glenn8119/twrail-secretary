import { combineReducers } from 'redux'
import priceReducer from './priceReducer'
import timeTableReducer from './timeTableReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  timeTable: timeTableReducer,
  price: priceReducer,
  cartInfo: cartReducer
})
