import { combineReducers } from "redux";
import priceReducer from "./priceReducer";
import timeReducer from "./timeReducer";

export default combineReducers({
    time : timeReducer,
    price: priceReducer
}) 