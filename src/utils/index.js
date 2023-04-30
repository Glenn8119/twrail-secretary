import { CABIN_CLASS, TICKET_TYPE } from '../config'

export function getTicketPrice(item) {
  const { ticketType, cabinClass, price } = item
  const {
    priceNormalStandard,
    priceNormalBusiness,
    priceNormalFree,
    priceGroupStandard,
    priceGroupBusiness
  } = price

  let p
  if (ticketType === TICKET_TYPE.NORMAL) {
    switch (cabinClass) {
      case CABIN_CLASS.STANDARD:
        p = priceNormalStandard
        break
      case CABIN_CLASS.BUSINESS:
        p = priceNormalBusiness
        break
      case CABIN_CLASS.FREE:
        p = priceNormalFree
        break
      default:
        p = 0
    }
  } else if (ticketType === TICKET_TYPE.GROUP) {
    switch (cabinClass) {
      case CABIN_CLASS.STANDARD:
        p = priceGroupStandard
        break
      case CABIN_CLASS.BUSINESS:
        p = priceGroupBusiness
        break
      default:
        p = 0
    }
  }

  const amount = item.ticketNumber

  const totalPrice = p * amount
  return totalPrice
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
