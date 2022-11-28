import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setNotShow, setCartDetail } from '../actions'
import { connect } from 'react-redux'

import {
  getTicketPrice,
  getTimeDifference,
  changeTimeToMillisecond,
  findValidMinimumItem
} from './calculating'
import CartItems from './CartItems'

const Cart = ({ cartInfo, setNotShow, setCartDetail }) => {
  const refCart = useRef()
  const { show, detail } = cartInfo

  useEffect(() => {
    const closeCart = (e) => {
      if (refCart.current && !refCart.current.contains(e.target)) {
        setNotShow()
      }
    }
    //點擊購物車以外其他地方會收起cart
    document.addEventListener('click', closeCart)

    return () => {
      document.addEventListener('click', closeCart)
    }
  }, [setNotShow])

  //想要分別管理每一個item裡面的票種狀態,因此將每個購物車item用另一個component顯示
  const renderDetail = detail
    ? detail.map((item, index) => {
        return <CartItems item={item} index={index} key={index} />
      })
    : null

  //清空購物車
  const onClickClear = () => {
    let arr = []
    //更新Localstorage
    localStorage.setItem('cartDetail', JSON.stringify(arr))
    //儲存到reducer
    setCartDetail(JSON.parse(localStorage.getItem('cartDetail')))
  }

  //抓出購物車所有車次的出發時間, 轉換成毫秒後排成陣列
  let timeArr = detail.map((item) => changeTimeToMillisecond(item))

  //抓出尚未過期且最小的一班車的index
  let targetIndex = timeArr.indexOf(findValidMinimumItem(timeArr))

  //計算該車次發車時間與現在時間差
  let TimeDifference = getTimeDifference(detail[targetIndex])
  let daysLeft = TimeDifference
    ? Math.floor(TimeDifference.getTime() / 3600000 / 24)
    : '-'
  let hoursLeft = TimeDifference ? TimeDifference.getUTCHours() : '-'
  let minutesLeft = TimeDifference ? TimeDifference.getUTCMinutes() : '-'

  //顯示最近一班車資訊
  let nextOriginStop = TimeDifference ? detail[targetIndex].originStop : null
  let nextDestinationStop = TimeDifference
    ? detail[targetIndex].destinationStop
    : null
  let nextDepartureTime = TimeDifference
    ? detail[targetIndex].departureTime
    : null
  let nextDepartureDate = TimeDifference ? detail[targetIndex].date : null
  let nextnumber = TimeDifference ? detail[targetIndex].number : null

  //計算票價總和
  let priceArr = detail.map((item) => getTicketPrice(item))
  let totalPrice =
    priceArr.length > 0
      ? priceArr.reduce((a, b) => {
          return a + b
        })
      : 0

  return (
    <section ref={refCart} className={`cart ${show ? 'show-cart' : ''}`}>
      <FontAwesomeIcon icon={faTimes} onClick={setNotShow} />
      <h2 className='heading-2 cart__heading'>購物車</h2>
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
            {TimeDifference ? '往' : ''}
            <span>{nextDestinationStop}</span>
          </div>
          <p className='early__detail-time'>
            距發車剩餘<span>{daysLeft}</span>天<span>{hoursLeft}</span>時
            <span>{minutesLeft}</span>分
          </p>
        </div>
      </div>
      {renderDetail}
      <div className='total'>
        <p className='total__price'>
          總金額 :<span>$ {totalPrice}</span>元
        </p>
        <button onClick={onClickClear} className='total__btn'>
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
