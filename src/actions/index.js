import { PtxPrice, PtxTime, GetAuthorizationHeader } from "../apis/Ptx";
import { checkToken } from '../utils';

export const fetchTime = (OriginStationID, DestinationStationID, TrainDate) => async dispatch => {
    let token = checkToken()
    if (!token) {
        token = await GetAuthorizationHeader().access_token
    }
    const response = await PtxTime.get(`/${OriginStationID}/to/${DestinationStationID}/${TrainDate}?&$format=JSON`,
        {
            headers: {
                "authorization": "Bearer " + token, 
            }
        })

    dispatch({ type: "FETCH_TIME", payload: response.data })
}

export const fetchPrice = (OriginStationID, DestinationStationID) => async dispatch => {
    let token = checkToken()
    if (!token) {
        token = await GetAuthorizationHeader().access_token
    }
    const response = await PtxPrice.get(`/ODFare/${OriginStationID}/to/${DestinationStationID}`,
        {
            headers: {
                "authorization": "Bearer " + token, 
            }
        })

    dispatch({ type: "FETCH_PRICE", payload: response.data })
}
//儲存所選時間
export const getSelectedTime = (time) => {
    return {
        type:"GET_SELECTED_TIME",
        payload: time
    }
}
//儲存所選日期
export const getSelectedDate = (date) => {
    return {
        type:"GET_SELECTED_DATE",
        payload: date
    }
}
//設定購物車狀態on
export const setShow = () => {
    return {
        type:"SET_SHOW"
    }
}
//設定購物車狀態off
export const setNotShow = () => {
    return {
        type:"SET_NOT_SHOW"
    }
}
//將LOCALSTORAGE的資料儲存
export const setLocalStorage = ( storageArr ) => {
    return {
        type:"SET_LOCALSTORAGE",
        payload: storageArr
    }
}