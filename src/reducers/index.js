import { combineReducers } from 'redux'
import priceReducer from './priceReducer'
import timeTableReducer from './timeTableReducer'
import formTimeReducer from './formTimeReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  timeTable: timeTableReducer,
  price: priceReducer,
  formTime: formTimeReducer,
  cartInfo: cartReducer
})
