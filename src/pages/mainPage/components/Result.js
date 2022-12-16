import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { setShow, setNotShow, setCartDetail } from '../../../actions';
import { connect } from 'react-redux';
import { checkTime } from './calculating';

const Result = ({
  time,
  selectedTime,
  selectedDate,
  setShow,
  price,
  setCartDetail,
  cartInfo
}) => {
  //設定預設要show的車次是在全部資料的哪個index
  const [currentArrIndexStart, setCurrentArrIndexStart] = useState(0);
  const [currentArrIndexEnd, setCurrentArrIndexEnd] = useState(5);

  //從全部資料中挑選第一筆大於出發時間的班次
  let startItem = time.find((item) =>
    checkTime(item.OriginStopTime.DepartureTime, selectedTime)
  );

  useEffect(() => {
    setCurrentArrIndexStart(time.indexOf(startItem));
    setCurrentArrIndexEnd(time.indexOf(startItem) + 5);
  }, [time, startItem]);

  //點擊icon儲存資料至LOCAL STORAGE
  const onClick = (e) => {
    e.stopPropagation();
    const btnId = e.target.id;
    const data = timeArr[btnId];
    let dataArr = cartInfo.detail ? [...cartInfo.detail] : [];
    let cartDetailObj = {};

    // 起站
    cartDetailObj.originStop = data.OriginStopTime.StationName.Zh_tw;
    // 迄站
    cartDetailObj.destinationStop = data.DestinationStopTime.StationName.Zh_tw;
    // 車次
    cartDetailObj.number = data.DailyTrainInfo.TrainNo;
    // 日期
    cartDetailObj.date = data.TrainDate;
    // 時間
    cartDetailObj.departureTime = data.OriginStopTime.DepartureTime;
    // 費用
    cartDetailObj.price = {
      business: price[0].Fares[0].Price,
      normal: price[0].Fares[1].Price,
      freeSeat: price[0].Fares[2].Price
    };
    // 票種
    cartDetailObj.ticketType = 'adult';
    cartDetailObj.seatType = 'normal';
    // 數量
    cartDetailObj.ticketNumber = 1;

    //先把新的資料更新到local storage上
    dataArr.push(cartDetailObj);
    localStorage.setItem('cartDetail', JSON.stringify(dataArr));

    //再把localstorage的資料更新到localStorageReducer上
    let localStorageReducer = JSON.parse(localStorage.getItem('cartDetail'));
    setCartDetail(localStorageReducer);

    //開啟購物車
    setShow();
  };

  //計算行車時間轉換成HH:MM:SS格式
  function subTime(DepartureTime, ArrivalTime) {
    let DepartureArr = DepartureTime.split(':');
    let ArrivalArr = ArrivalTime.split(':');

    let subHour = ArrivalArr[0] - DepartureArr[0];
    let subMinute = ArrivalArr[1] - DepartureArr[1];

    let ResultDate;
    if (subMinute >= 0) {
      ResultDate = new Date(0, 0, 0, subHour, subMinute, 0);
    } else {
      ResultDate = new Date(0, 0, 0, subHour - 1, subMinute + 60, 0);
    }
    return `${
      ResultDate.getHours() < 10
        ? '0' + ResultDate.getHours()
        : ResultDate.getHours()
    }:${
      ResultDate.getMinutes() < 10
        ? '0' + ResultDate.getMinutes()
        : ResultDate.getMinutes()
    }`;
  }

  function onEarlyClick(e) {
    e.stopPropagation();
    if (currentArrIndexStart >= 5) {
      setCurrentArrIndexStart(currentArrIndexStart - 5);
      setCurrentArrIndexEnd(currentArrIndexEnd - 5);
    }
  }

  function onLateClick(e) {
    e.stopPropagation();
    if (currentArrIndexEnd < time.length) {
      setCurrentArrIndexStart(currentArrIndexStart + 5);
      setCurrentArrIndexEnd(currentArrIndexEnd + 5);
    }
  }

  //只顯示五個結果
  const timeArr = time.slice(currentArrIndexStart, currentArrIndexEnd);
  const renderDetail = timeArr.map((data, index) => {
    return (
      <tr key={index} className='detail__body-row'>
        <td>
          {data.OriginStopTime.DepartureTime}
          <button id={index} className='ticket-btn' onClick={onClick}></button>
        </td>
        <td>
          {subTime(
            data.OriginStopTime.DepartureTime,
            data.DestinationStopTime.ArrivalTime
          )}
        </td>
        <td>{data.DestinationStopTime.ArrivalTime}</td>
        <td>{data.DailyTrainInfo.TrainNo}</td>
      </tr>
    );
  });

  const renderResult = () => {
    return (
      <section className='result'>
        <div className='title'>
          <div className='title__left'>
            <span>
              {time.length > 0 ? time[0].OriginStopTime.StationName.Zh_tw : ''}
            </span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>
              {time.length > 0
                ? time[0].DestinationStopTime.StationName.Zh_tw
                : ''}
            </span>
          </div>
          <div className='title__middle'>
            {selectedDate}
            {selectedTime}
          </div>
          <div
            className={`title__right ${
              cartInfo.show ? 'title__right-move' : ''
            }`}
          >
            <div className='title__right-early' onClick={onEarlyClick}>
              <FontAwesomeIcon icon={faArrowLeft} />
              較早班次
            </div>
            <div className='title__right-late' onClick={onLateClick}>
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
            {time.length > 0 ? renderDetail : ''}
          </tbody>
        </table>
      </section>
    );
  };

  return <Fragment>{time.length > 0 ? renderResult() : null}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    time: state.time,
    selectedTime: state.selectedTime,
    selectedDate: state.selectedDate,
    price: state.price,
    cartInfo: state.cartInfo
  };
};

export default connect(mapStateToProps, {
  setShow,
  setNotShow,
  setCartDetail
})(Result);
