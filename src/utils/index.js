const discount = (price, disc) => {
  if ((price * disc) % 10 > 5) {
    return Math.round((price * disc) / 10) * 10 - 5
  }
  return Math.round((price * disc) / 10) * 10
}

// 團體票規則: 95折之後個位數大於五則取5, 小於五則取0
export const groupPrice = (price) => discount(price, 0.95)

// 敬老票規則: 半價之後個位數大於五則取5, 小於五則取0
export const oldPrice = (price) => discount(price, 0.5)

export function getTicketPrice(item) {
  const price = item.price[item.seatType]
  const amount = item.ticketNumber

  if (item.ticketType === 'adult') {
    return price * amount
  } else if (item.ticketType === 'old') {
    return oldPrice(price) * amount
  } else {
    return groupPrice(price) * amount
  }
}

export function getTimeDifference(train) {
  if (train) {
    const trainTimeSecond = toMillisecond(train)
    const currentTime = new Date()
    return new Date(trainTimeSecond - currentTime)
  }
  return null
}

export function toMillisecond(trainObj) {
  const trainDateArr = trainObj.date.split('-')
  const trainTimeArr = trainObj.departureTime.split(':')
  return new Date(
    trainDateArr[0],
    trainDateArr[1] - 1,
    trainDateArr[2],
    ...trainTimeArr
  ).getTime()
}

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
