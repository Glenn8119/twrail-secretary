import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { setShow, setCartDetail } from '../../../actions';
import { connect } from 'react-redux';

//檢驗t1是否大於t2
const laterThan = (t1, t2) => {
  const t1Arr = t1.split(':');
  const t2Arr = t2.split(':');
  return t1Arr[0] * 60 + t1Arr[1] - (t2Arr[0] * 60 + t2Arr[1]) > 0;
};

//計算行車時間轉換成HH:MM:SS格式
function calculateTime(DepartureTime, ArrivalTime) {
  const DepartureArr = DepartureTime.split(':');
  const ArrivalArr = ArrivalTime.split(':');

  const hourDiff = ArrivalArr[0] - DepartureArr[0];
  const minuteDiff = ArrivalArr[1] - DepartureArr[1];

  if (minuteDiff < 0) return `${hourDiff - 1}:${minuteDiff + 60}`;
  else return `${hourDiff}:${minuteDiff}`;
}

const Result = ({
  timeTable,
  selectedTime,
  selectedDate,
  setShow,
  price,
  setCartDetail,
  cartInfo
}) => {
  const [startIdxOffset, setStartIdxOffset] = useState(0);

  useEffect(() => {
    setStartIdxOffset(0);
  }, [timeTable]);

  const startItem = timeTable.find((item) =>
    laterThan(item.OriginStopTime.DepartureTime, selectedTime)
  );
  const startIdx = timeTable.indexOf(startItem) + startIdxOffset;
  const endIdx = startIdx + 5;

  const handleTicketClick = (e, index) => {
    // stop cart from not showing
    e.stopPropagation();

    const ticket = resultArr[index];
    const clonedCartDetail = cartInfo.detail ? [...cartInfo.detail] : [];
    const ticketInfo = {
      originStop: ticket.OriginStopTime.StationName.Zh_tw,
      destinationStop: ticket.DestinationStopTime.StationName.Zh_tw,
      number: ticket.DailyTrainInfo.TrainNo,
      date: ticket.TrainDate,
      departureTime: ticket.OriginStopTime.DepartureTime,
      price: {
        business: price[0].Fares[0].Price,
        normal: price[0].Fares[1].Price,
        freeSeat: price[0].Fares[2].Price
      },
      ticketType: 'adult',
      seatType: 'normal',
      ticketNumber: 1
    };

    clonedCartDetail.push(ticketInfo);
    setCartDetail(clonedCartDetail);
    setShow();
  };

  function onPrev() {
    if (startIdx >= 5) {
      setStartIdxOffset(startIdxOffset - 5);
    }
  }

  function onNext() {
    if (endIdx < timeTable.length) {
      setStartIdxOffset(startIdxOffset + 5);
    }
  }

  const resultArr = timeTable.slice(startIdx, endIdx);
  const renderDetail = resultArr.map((data, index) => {
    return (
      <tr key={data.DailyTrainInfo.TrainNo} className='detail__body-row'>
        <td>
          {data.OriginStopTime.DepartureTime}
          <button
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
    );
  });

  const renderResult = () => {
    return (
      <section className='result'>
        <div className='title'>
          <div className='title__left'>
            <span>
              {timeTable.length > 0
                ? timeTable[0].OriginStopTime.StationName.Zh_tw
                : ''}
            </span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>
              {timeTable.length > 0
                ? timeTable[0].DestinationStopTime.StationName.Zh_tw
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
    );
  };

  return <>{timeTable.length > 0 ? renderResult() : null}</>;
};

const mapStateToProps = (state) => {
  return {
    timeTable: state.timeTable,
    selectedTime: state.selectedTime,
    selectedDate: state.selectedDate,
    price: state.price,
    cartInfo: state.cartInfo
  };
};

export default connect(mapStateToProps, {
  setShow,
  setCartDetail
})(Result);
