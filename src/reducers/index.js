import { combineReducers } from 'redux'
import priceReducer from './priceReducer'
import timeTableReducer from './timeTableReducer'
import getSelectedTimeReducer from './getSelectedTimeReducer'
import getSelectedDateReducer from './getSelectedDateReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  timeTable: timeTableReducer,
  price: priceReducer,
  selectedTime: getSelectedTimeReducer,
  selectedDate: getSelectedDateReducer,
  cartInfo: cartReducer
})
