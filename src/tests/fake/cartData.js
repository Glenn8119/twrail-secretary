import { TICKET_TYPE } from '../../config'

const mockCartDetail = [
  {
    originStop: '南港',
    destinationStop: '左營',
    number: '0803',
    date: '2022-12-26',
    departureTime: '06:15',
    price: { business: 1530, normal: 2500, freeSeat: 1480 },
    ticketType: TICKET_TYPE.NORMAL,
    cabinClass: 'normal',
    ticketNumber: 1
  },
  {
    originStop: '台中',
    destinationStop: '雲林',
    number: '0805',
    date: '2022-12-26',
    departureTime: '08:17',
    price: { business: 230, normal: 550, freeSeat: 220 },
    ticketType: TICKET_TYPE.NORMAL,
    cabinClass: 'normal',
    ticketNumber: 1
  }
]

export const mockCartInfo = {
  show: true,
  detail: mockCartDetail
}

export default mockCartInfo
