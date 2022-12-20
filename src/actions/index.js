import { PtxPrice, PtxTime, GetAuthorizationHeader } from '../apis/Ptx';
export * from './cartAction';

export const checkToken = () => {
  const now = new Date().getTime();
  const FOUR_HOURS = 1000 * 60 * 60 * 4;
  let tokenInfo = localStorage.getItem('tokenRecord');
  if (tokenInfo) {
    tokenInfo = JSON.parse(tokenInfo);
    const { timeStamp, token } = tokenInfo;
    if (now - timeStamp < FOUR_HOURS) {
      return token;
    }
  }
};

export const fetchTime =
  (OriginStationID, DestinationStationID, TrainDate) => async (dispatch) => {
    let token = checkToken();
    if (!token) {
      token = await GetAuthorizationHeader().access_token;
    }
    const response = await PtxTime.get(
      `/${OriginStationID}/to/${DestinationStationID}/${TrainDate}?&$format=JSON`,
      {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    );

    dispatch({ type: 'FETCH_TIME', payload: response.data });
  };

export const fetchPrice =
  (OriginStationID, DestinationStationID) => async (dispatch) => {
    let token = checkToken();
    if (!token) {
      token = await GetAuthorizationHeader().access_token;
    }
    const response = await PtxPrice.get(
      `/ODFare/${OriginStationID}/to/${DestinationStationID}`,
      {
        headers: {
          authorization: 'Bearer ' + token
        }
      }
    );

    dispatch({ type: 'FETCH_PRICE', payload: response.data });
  };
//儲存所選時間
export const getSelectedTime = (time) => {
  return {
    type: 'GET_SELECTED_TIME',
    payload: time
  };
};
//儲存所選日期
export const getSelectedDate = (date) => {
  return {
    type: 'GET_SELECTED_DATE',
    payload: date
  };
};
