import axios from 'axios'

export const PtxTime = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD'
})

export const PtxPrice = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare'
})

export function GetAuthorizationHeader() {
  const parameter = {
    grant_type: 'client_credentials',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET
  }

  const auth_url =
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'

  return axios({
    url: auth_url,
    method: 'POST',
    data: new URLSearchParams(parameter),
    headers: {
      'content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    const timeStamp = new Date().getTime()
    const token = res.data.access_token
    console.log('succ')
    localStorage.setItem('tokenRecord', JSON.stringify({ timeStamp, token }))
    console.log('after succ')
    return res
  })
}
