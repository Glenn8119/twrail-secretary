import { PtxTime, GetAuthorizationHeader } from '../apis/Ptx'
import { checkToken } from '../utils'

export const fetchTime =
  (OriginStationID, DestinationStationID, TrainDate) => async (dispatch) => {
    let token = checkToken()
    if (!token) {
      const result = await GetAuthorizationHeader()
      token = result.data.access_token
    }

    const response = await PtxTime.get(
      `/${OriginStationID}/to/${DestinationStationID}/${TrainDate}?&$format=JSON`,
      {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    )

    dispatch({ type: 'RECEIVE_FETCHED_TIMETABLE', payload: response.data })
  }
