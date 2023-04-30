import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { setShow, setCartDetail } from '../../../actions'
import { connect } from 'react-redux'
import { CABIN_CLASS, TICKET_TYPE } from '../../../config'
import { collectPrices } from './Price'

const week = ['日', '一', '二', '三', '四', '五', '六']

const laterThan = (t1, t2) => {
  const t1Arr = t1.split(':')
  const t2Arr = t2.split(':')
  return t1Arr[0] * 60 + t1Arr[1] - (t2Arr[0] * 60 + t2Arr[1]) > 0
}

function calculateTime(DepartureTime, ArrivalTime) {
  if (!DepartureTime || !ArrivalTime) return ''

  const DepartureArr = DepartureTime.split(':')
  const ArrivalArr = ArrivalTime.split(':')

  const hourDiff = ArrivalArr[0] - DepartureArr[0]
  const minuteDiff = ArrivalArr[1] - DepartureArr[1]

  if (minuteDiff < 0) return `${hourDiff - 1}:${minuteDiff + 60}`
  else return `${hourDiff}:${minuteDiff}`
}

const Result = ({
  timeTable,
  time,
  date,
  setShow,
  price,
  setCartDetail,
  cartInfo
}) => {
  const [startIdxOffset, setStartIdxOffset] = useState(0)
  const weekValue = week[new Date(date).getDay()]

  useEffect(() => {
    setStartIdxOffset(0)
  }, [timeTable])

  const handleTicketClick = (e, index) => {
    // stop cart from not showing
    e.stopPropagation()

    const ticket = resultArr[index]
    const clonedCartDetail = cartInfo.detail ? [...cartInfo.detail] : []
    const ticketInfo = {
      originStop: ticket.OriginStopTime.OSStationName.Zh_tw,
      destinationStop: ticket.DestinationStopTime.DSStationName.Zh_tw,
      number: ticket.DailyTrainInfo.TrainNo,
      date: ticket.TrainDate,
      departureTime: ticket.OriginStopTime.DepartureTime,
      // price: {
      //   business: price[0].Fares[0].Price,
      //   normal: price[0].Fares[1].Price,
      //   freeSeat: price[0].Fares[2].Price
      // },
      // ticketType: 'adult',
      // cabinClass: 'normal', -> cabinClass
      price: collectPrices(price),
      ticketType: TICKET_TYPE.NORMAL,
      cabinClass: CABIN_CLASS.STANDARD,
      ticketNumber: 1
    }

    clonedCartDetail.push(ticketInfo)
    setCartDetail(clonedCartDetail)
    setShow()
  }

  function onPrev() {
    if (startIdx + startIdxOffset > 0) {
      setStartIdxOffset(startIdxOffset - 5)
    }
  }

  function onNext() {
    if (endIdx + 5 <= timeTable.length) {
      setStartIdxOffset(startIdxOffset + 5)
    }
  }

  const startItem = timeTable.find((item) =>
    laterThan(item.OriginStopTime.DepartureTime, time)
  )

  const startIdx = startItem ? timeTable.indexOf(startItem) : timeTable.length
  const sliceStart =
    startIdx + startIdxOffset < 0 ? 0 : startIdx + startIdxOffset
  const endIdx = sliceStart + 5

  const resultArr = timeTable.slice(sliceStart, endIdx)
  const renderDetail = resultArr.map((data, index) => {
    return (
      <tr key={data.DailyTrainInfo.TrainNo} className='detail__body-row'>
        <td>
          {data.OriginStopTime.DepartureTime}
          <button
            data-testid='ticket-btn'
            className='ticket-btn'
            onClick={(e) => handleTicketClick(e, index)}
          ></button>
        </td>
        <td>
          {calculateTime(
            data.OriginStopTime.DepartureTime,
            data.DestinationStopTime.ArrivalTime
          )}
        </td>
        <td>{data.DestinationStopTime.ArrivalTime}</td>
        <td>{data.DailyTrainInfo.TrainNo}</td>
      </tr>
    )
  })

  const renderResult = () => {
    return (
      <section className='result'>
        <div className='title'>
          <div className='title__left'>
            <span>
              {timeTable.length > 0
                ? timeTable[0].OriginStopTime.OSStationName.Zh_tw
                : ''}
            </span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>
              {timeTable.length > 0
                ? timeTable[0].DestinationStopTime.DSStationName.Zh_tw
                : ''}
            </span>
          </div>
          <div className='title__middle'>
            {`${date}(${weekValue})`}
            {time}
          </div>
          <div
            className={`title__right ${
              cartInfo.show ? 'title__right-move' : ''
            }`}
          >
            <div className='title__right-early' onClick={onPrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
              較早班次
            </div>
            <div className='title__right-late' onClick={onNext}>
              較晚班次
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>

        <table className='detail'>
          <thead className='detail__head'>
            <tr className='detail__head-row'>
              <th>出發時間</th>
              <th>行車時間</th>
              <th>抵達時間</th>
              <th>車次</th>
            </tr>
          </thead>

          <tbody className='detail__body'>
            {timeTable.length > 0 ? renderDetail : ''}
          </tbody>
        </table>
      </section>
    )
  }

  return <>{timeTable.length > 0 ? renderResult() : null}</>
}

const mapStateToProps = (state) => {
  return {
    timeTable: state.timeTable,
    price: state.price,
    cartInfo: state.cartInfo
  }
}

export default connect(mapStateToProps, {
  setShow,
  setCartDetail
})(Result)
