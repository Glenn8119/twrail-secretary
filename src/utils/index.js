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

//將日期轉換成 YY-MM-DD格式
export function changeDateForm(date) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  return `${y}-${m < 9 ? '0' + (m + 1) : m + 1}-${d <= 9 ? '0' + d : d}`
}
