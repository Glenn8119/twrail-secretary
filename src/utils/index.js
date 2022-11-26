export const checkToken = () => {
  const now = new Date().getTime()
  const FOUR_HOURS = 1000 * 60 * 60 * 4
  let tokenInfo = localStorage.getItem('tokenRecord')
  if (tokenInfo) {
    tokenInfo = JSON.parse(tokenInfo)
    const { timeStamp, token } = tokenInfo
    if (now - timeStamp < FOUR_HOURS) {
      return token
    }
  }
}
