import React from 'react'
import { connect } from 'react-redux'
import { setCartDetail } from '../../../actions'
import { CABIN_CLASS, TICKET_TYPE } from '../../../config'
import { getTicketPrice, getTimeDifference } from '../../../utils'

const CartItem = ({ cartInfo, setCartDetail, item, index, price }) => {
  const { detail } = cartInfo

  const onSelect = (e) => {
    const { name: type, value } = e.target
    const IntVal = parseInt(value)

    if (type === 'ticketType') {
      if (item.ticketNumber < 11 && IntVal === TICKET_TYPE.GROUP) {
        alert('選擇團體票人數須至少11人')
        return
      }
      if (
        item.cabinClass === CABIN_CLASS.FREE &&
        IntVal === TICKET_TYPE.GROUP
      ) {
        alert('自由座無販售團體票')
        return
      }
    }

    if (type === 'cabinClass') {
      if (
        item.ticketType === TICKET_TYPE.GROUP &&
        IntVal === CABIN_CLASS.FREE
      ) {
        alert('自由座無販售團體票')
        return
      }
    }

    const clonedDetail = [...detail]
    const clonedItem = { ...item }
    clonedItem[type] = parseInt(IntVal)
    clonedDetail[index] = clonedItem
    setCartDetail(clonedDetail)
  }

  const onClickDelete = () => {
    const updatedArr = detail.filter((_, idx) => idx !== index)
    setCartDetail(updatedArr)
  }

  const onIncrement = () => {
    const clonedItem = { ...item }
    const clonedDetail = [...detail]
    clonedItem.ticketNumber += 1
    clonedDetail[index] = clonedItem
    setCartDetail(clonedDetail)
  }

  const onDecrement = () => {
    //團體票人數須大於11人
    if (item.ticketNumber === 11 && item.ticketType === TICKET_TYPE.GROUP) {
      return alert('團體票人數須大於11人, 若要減少張數請選擇其他票種')
    }

    const clonedItem = { ...item }
    const clonedDetail = [...detail]
    if (clonedItem.ticketNumber > 1) {
      clonedItem.ticketNumber -= 1
      clonedDetail[index] = clonedItem
      setCartDetail(clonedDetail)
    }
  }

  const ticketPrice = getTicketPrice(item)

  return (
    <div className='item' data-testid='cart-item'>
      <div className='item__left'>
        <span className='item__left-location'>{item.originStop}</span>
        <span>往</span>
        <span className='item__left-location'>{item.destinationStop}</span>
      </div>
      <div className='item__middle'>
        <div className='item__middle-time'>
          <span>{item.date}</span>
          <span>{item.departureTime}</span>
        </div>
        <div className='item__middle-number'>
          車次
          <span>
            {item.number}
            <span className='expired'>
              {getTimeDifference(item) < 0 ? '(已過期)' : null}
            </span>
          </span>
        </div>
        <div className='item__middle-price'>$ {ticketPrice} 元</div>
        <div className='item__middle-select'>
          <select
            className='item__middle-select-cabinClass'
            onChange={onSelect}
            name='cabinClass'
            value={item.cabinClass}
          >
            <option value={CABIN_CLASS.STANDARD}>標準</option>
            <option value={CABIN_CLASS.BUSINESS}>商務</option>
            <option value={CABIN_CLASS.FREE}>自由座</option>
          </select>
          <select
            className='item__middle-select-ticketType'
            onChange={onSelect}
            name='ticketType'
            value={item.ticketType}
            data-testid='ticketType'
          >
            <option value={TICKET_TYPE.NORMAL}>全票</option>
            <option value={TICKET_TYPE.GROUP}>團體</option>
          </select>
        </div>
      </div>
      <div className='item__right'>
        <span onClick={onIncrement} className='item__right-up'></span>
        <span>{item.ticketNumber}</span>
        <span onClick={onDecrement} className='item__right-down'></span>
      </div>
      <button
        className='item__icon'
        onClick={(e) => onClickDelete(e, index)}
        id={index}
      ></button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state.cartInfo,
    price: state.price
  }
}

export default connect(mapStateToProps, { setCartDetail })(CartItem)
