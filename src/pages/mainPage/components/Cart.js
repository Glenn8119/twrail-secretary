import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setNotShow, setCartDetail } from '../../../actions'
import { connect } from 'react-redux'
import {
  getTicketPrice,
  getTimeDifference,
  toMillisecond
} from '../../../utils'

import CartItems from './CartItems'

function findClosest(arr) {
  const nowTime = new Date().getTime()
  const positiveArr = arr.filter((item) => item - nowTime > 0)
  return Math.min(...positiveArr)
}

const Cart = ({ cartInfo, setNotShow, setCartDetail }) => {
  const refCart = useRef()
  const { show, detail } = cartInfo

  useEffect(() => {
    const closeCart = (e) => {
      if (refCart.current && !refCart.current.contains(e.target)) {
        setNotShow()
      }
    }
    document.addEventListener('click', closeCart)

    return () => {
      document.removeEventListener('click', closeCart)
    }
  }, [setNotShow])

  const clickCart = () => {
    setCartDetail([])
  }

  const timeArr = detail.map((item) => toMillisecond(item))
  const targetIndex = timeArr.indexOf(findClosest(timeArr))

  const renderRemind = () => {
    let daysLeft = '-'
    let hoursLeft = '-'
    let minutesLeft = '-'
    let nextOriginStop
    let nextDestinationStop
    let nextDepartureTime
    let nextDepartureDate
    let nextnumber
    const timeDifference = getTimeDifference(detail[targetIndex])

    if (timeDifference) {
      daysLeft = Math.floor(timeDifference.getTime() / 3600000 / 24)
      hoursLeft = timeDifference.getUTCHours()
      minutesLeft = timeDifference.getUTCMinutes()
      nextOriginStop = detail[targetIndex].originStop
      nextDestinationStop = detail[targetIndex].destinationStop
      nextDepartureTime = detail[targetIndex].departureTime
      nextDepartureDate = detail[targetIndex].date
      nextnumber = detail[targetIndex].number
    }

    return (
      <div className='early'>
        <h3 className='heading-3'>最近車次</h3>
        <div className='early__detail'>
          <div className='early__detail-date'>
            <span>{nextDepartureDate}</span>
            <span>{nextDepartureTime}</span>
          </div>
          <div className='early__detail-information'>
            <span className='early__detail-information-number'>
              {nextnumber}
            </span>
            <span className='early__detail-information-destination'>
              {nextOriginStop}
            </span>
            {timeDifference ? '往' : ''}
            <span>{nextDestinationStop}</span>
          </div>
          <p className='early__detail-time'>
            距發車剩餘<span>{daysLeft}</span>天<span>{hoursLeft}</span>時
            <span>{minutesLeft}</span>分
          </p>
        </div>
      </div>
    )
  }

  const renderDetail = () =>
    detail.map((item, index) => {
      return <CartItems item={item} index={index} key={index} />
    })

  //計算票價總和
  const priceArr = detail.map((item) => getTicketPrice(item))
  const totalPrice = priceArr.reduce((a, b) => a + b, 0)

  return (
    <section ref={refCart} className={`cart ${show ? 'show-cart' : ''}`}>
      <FontAwesomeIcon icon={faTimes} onClick={setNotShow} />
      <h2 className='heading-2 cart__heading'>購物車</h2>
      {renderRemind()}
      {renderDetail()}
      <div className='total'>
        <p className='total__price'>
          總金額 :<span>$ {totalPrice}</span>元
        </p>
        <button onClick={clickCart} className='total__btn'>
          清空購物車
        </button>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state.cartInfo
  }
}

export default connect(mapStateToProps, { setNotShow, setCartDetail })(Cart)
