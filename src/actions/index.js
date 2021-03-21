import { PtxPrice, PtxTime, getAuthorizationHeader } from "../apis/Ptx";

export const fetchTime = (OriginStationID, DestinationStationID, TrainDate) => async dispatch => {
    const response = await PtxTime.get(`/${OriginStationID}/to/${DestinationStationID}/${TrainDate}?$top=30&$format=JSON`,
        {
            headers: getAuthorizationHeader()
        })

    dispatch({ type: "FETCH_TIME", payload: response.data })
}

export const fetchPrice = (OriginStationID, DestinationStationID) => async dispatch => {
    const response = await PtxPrice.get(`/ODFare/${OriginStationID}/to/${DestinationStationID}`,
        {
            headers: getAuthorizationHeader()
        })

    dispatch({ type: "FETCH_PRICE", payload: response.data })
}