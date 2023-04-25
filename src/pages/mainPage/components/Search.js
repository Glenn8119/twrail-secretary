import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { fetchTime, fetchPrice } from '../../../actions'
import { changeDateForm, stationOptions } from '..'

const Search = ({ fetchTime, fetchPrice, cartInfo, form, setForm }) => {
  const { date, time, stationID, destinationStationID } = form
  // 最多僅能選一個月內時間
  const currentDate = new Date()
  const maxDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 28)
  const MAX_DATE = changeDateForm(maxDate)

  const renderOptions = useCallback(() => {
    return stationOptions.map((option) => {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )
    })
  }, [])

  function onSubmit(e) {
    e.preventDefault()

    if (stationID === destinationStationID) {
      alert('出發站不可等於到達站')
    }

    fetchTime(stationID, destinationStationID, date)
    fetchPrice(stationID, destinationStationID)
  }

  const onOriginStopChange = (e) => {
    setForm({
      ...form,
      stationID: e.target.value
    })
  }

  const onDestinationStopChange = (e) => {
    setForm({
      ...form,
      destinationStationID: e.target.value
    })
  }

  const onDateSelectChange = (e) => {
    setForm({
      ...form,
      date: e.target.value
    })
  }

  const onTimeSelectChange = (e) => {
    setForm({
      ...form,
      time: e.target.value
    })
  }

  const onExchangeClick = (e) => {
    setForm({
      ...form,
      stationID: form.destinationStationID,
      destinationStationID: form.stationID
    })
  }

  return (
    <form
      className={`search ${cartInfo.show ? 'search-move' : ''}`}
      onSubmit={onSubmit}
    >
      <div className='start-box'>
        <label htmlFor='start-box__select'>起站</label>
        <select
          id='start-box__select'
          className='start-box__select'
          value={stationID}
          onChange={onOriginStopChange}
        >
          {renderOptions()}
        </select>
      </div>

      <button
        className='exchange__icon'
        onClick={onExchangeClick}
        type='button'
      >
        <FontAwesomeIcon icon={faExchangeAlt} />
      </button>

      <div className='end-box'>
        <label htmlFor='end-box__select'>迄站</label>
        <select
          id='end-box__select'
          className='end-box__select'
          value={destinationStationID}
          onChange={onDestinationStopChange}
        >
          {renderOptions()}
        </select>
      </div>

      <div className='date-box'>
        <label htmlFor='date-box__input'>去程日期</label>
        <input
          id='date-box__input'
          type='date'
          value={date}
          onChange={onDateSelectChange}
          className='date-box__input'
          min={changeDateForm(new Date())}
          max={MAX_DATE}
        />
      </div>

      <div className='time-box'>
        <label htmlFor='time-box__input'>去程時刻</label>
        <input
          id='time-box__input'
          type='time'
          className='time-box__input'
          value={time}
          onChange={onTimeSelectChange}
        />
      </div>

      <button className='search__btn'>查詢</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    price: state.price,
    cartInfo: state.cartInfo
  }
}

export default connect(mapStateToProps, {
  fetchTime,
  fetchPrice
})(Search)
