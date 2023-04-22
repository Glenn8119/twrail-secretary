import { GetAuthorizationHeader, PtxPrice } from '../apis/Ptx'
import { checkToken } from '../utils'

export const fetchPrice =
  (OriginStationID, DestinationStationID) => async (dispatch) => {
    let token = checkToken()
    if (!token) {
      const result = await GetAuthorizationHeader()
      token = result.data.access_token
    }
    const response = await PtxPrice.get(
      `/${OriginStationID}/to/${DestinationStationID}?&$format=JSON`,
      {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    )

    dispatch({ type: 'RECEIVE_FETCHED_PRICE', payload: response.data })
  }
