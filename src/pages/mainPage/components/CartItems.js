import React from 'react';
import { connect } from 'react-redux';
import { setCartDetail } from '../../../actions';
import { getTicketPrice, getTimeDifference } from '../../../utils';

const CartItems = ({ cartInfo, setCartDetail, item, index }) => {
  const { detail } = cartInfo;
  //改變票種的同時儲存到redux以及localstorage
  const onTicketTypeChange = (e) => {
    //人數低於11人不能選團體票 && 自由座不能選團體票
    if (item.ticketNumber < 11 && e.target.value === 'group') {
      alert('選擇團體票人數須至少11人');
      return;
    } else if (item.seatType === 'freeSeat' && e.target.value === 'group') {
      alert('自由座無販售團體票');
      return;
    }

    const Arr = [...detail];
    const Obj = { ...item };
    Obj.ticketType = e.target.value;
    Arr[index] = Obj;
    setCartDetail(Arr);
  };
  //改變票種的同時儲存到redux以及localstorage
  const onSeatTypeChange = (e) => {
    if (item.ticketType === 'group' && e.target.value === 'freeSeat') {
      alert('自由座無販售團體票');
      return;
    }

    const Arr = [...detail];
    const Obj = { ...item };
    Obj.seatType = e.target.value;
    Arr[index] = Obj;
    setCartDetail(Arr);
  };

  const onClickDelete = (e) => {
    e.stopPropagation();
    // 刪除該項目
    const updatedArr = detail.filter(
      (item) => detail.indexOf(item) !== e.target.id
    );

    setCartDetail(updatedArr);
  };

  const onClickUp = (item) => {
    //拷貝該物件
    const Obj = { ...item };
    //拷貝陣列
    const Arr = [...detail];
    Obj.ticketNumber += 1;
    Arr[index] = Obj;
    setCartDetail(Arr);
  };

  const onClickDown = (item) => {
    //團體票人數須大於11人
    if (item.ticketNumber === 11 && item.ticketType === 'group') {
      alert('團體票人數須大於11人, 若要減少張數請選擇其他票種');
      return;
    }

    const Obj = { ...item };
    const Arr = [...detail];
    if (Obj.ticketNumber > 1) {
      Obj.ticketNumber -= 1;
      Arr[index] = Obj;
      setCartDetail(Arr);
    }
  };

  const ticketPrice = getTicketPrice(item);

  return (
    <div className='item'>
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
            onChange={onSeatTypeChange}
            value={item.seatType}
          >
            <option value='normal'>標準</option>
            <option value='business'>商務</option>
            <option value='freeSeat'>自由座</option>
          </select>
          <select
            className='item__middle-select-ticketType'
            onChange={onTicketTypeChange}
            value={item.ticketType}
          >
            <option value='adult'>全票</option>
            <option value='old'>敬老</option>
            <option value='group'>團體</option>
          </select>
        </div>
      </div>
      <div className='item__right'>
        <span onClick={() => onClickUp(item)} className='item__right-up'></span>
        <span>{item.ticketNumber}</span>
        <span
          onClick={() => onClickDown(item)}
          className='item__right-down'
        ></span>
      </div>
      <button
        className='item__icon'
        onClick={onClickDelete}
        id={index}
      ></button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartInfo: state.cartInfo
  };
};

export default connect(mapStateToProps, { setCartDetail })(CartItems);
