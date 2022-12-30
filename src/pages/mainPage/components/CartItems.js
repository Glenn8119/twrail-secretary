import React from 'react'
import { connect } from 'react-redux'
import { setCartDetail } from '../../../actions'
import { getTicketPrice, getTimeDifference } from '../../../utils'

const CartItems = ({ cartInfo, setCartDetail, item, index }) => {
  const { detail } = cartInfo

  const onSelect = (e) => {
    const type = e.target.name

    if (type === 'ticketType') {
      if (item.ticketNumber < 11 && e.target.value === 'group') {
        alert('選擇團體票人數須至少11人')
        return
      }
      if (item.seatType === 'freeSeat' && e.target.value === 'group') {
        alert('自由座無販售團體票')
        return
      }
    }

    if (type === 'seatType') {
      if (item.ticketType === 'group' && e.target.value === 'freeSeat') {
        alert('自由座無販售團體票')
        return
      }
    }

    const clonedDetail = [...detail]
    const clonedItem = { ...item }
    clonedItem[type] = e.target.value
    clonedDetail[index] = clonedItem
    setCartDetail(clonedDetail)
  }

  const onClickDelete = () => {
    const updatedArr = detail.filter((_, idx) => idx !== index)
    setCartDetail(updatedArr)
  }

  const onClickUp = () => {
    const clonedItem = { ...item }
    const clonedDetail = [...detail]
    clonedItem.ticketNumber += 1
    clonedDetail[index] = clonedItem
    setCartDetail(clonedDetail)
  }

  const onClickDown = () => {
    //團體票人數須大於11人
    if (item.ticketNumber === 11 && item.ticketType === 'group') {
      alert('團體票人數須大於11人, 若要減少張數請選擇其他票種')
      return
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
            className='item__middle-select-seatType'
            onChange={onSelect}
            name='seatType'
            value={item.seatType}
          >
            <option value='normal'>標準</option>
            <option value='business'>商務</option>
            <option value='freeSeat'>自由座</option>
          </select>
          <select
            className='item__middle-select-ticketType'
            onChange={onSelect}
            name='ticketType'
            value={item.ticketType}
            data-testid='ticketType'
          >
            <option value='adult'>全票</option>
            <option value='old'>敬老</option>
            <option value='group'>團體</option>
          </select>
        </div>
      </div>
      <div className='item__right'>
        <span onClick={onClickUp} className='item__right-up'></span>
        <span>{item.ticketNumber}</span>
        <span onClick={onClickDown} className='item__right-down'></span>
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
    cartInfo: state.cartInfo
  }
}

export default connect(mapStateToProps, { setCartDetail })(CartItems)
