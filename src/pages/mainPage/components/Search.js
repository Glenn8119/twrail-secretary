import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import {
  fetchTime,
  fetchPrice,
  getSelectedTime,
  getSelectedDate
} from '../../../actions'

function changeDateForm(date) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  return `${y}-${m < 9 ? '0' + (m + 1) : m + 1}-${d <= 9 ? '0' + d : d}`
}

const destOptions = [
  { name: '南港', id: '0990' },
  { name: '臺北', id: '1000' },
  { name: '板橋', id: '1010' },
  { name: '桃園', id: '1020' },
  { name: '新竹', id: '1030' },
  { name: '苗栗', id: '1035' },
  { name: '台中', id: '1040' },
  { name: '彰化', id: '1043' },
  { name: '雲林', id: '1047' },
  { name: '嘉義', id: '1050' },
  { name: '台南', id: '1060' },
  { name: '左營', id: '1070' }
]

const week = ['日', '一', '二', '三', '四', '五', '六']

const date = new Date()
const h = date.getHours()
const m = date.getMinutes()

// 最多僅能選一個月內時間
const maxDate = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 28)
const DEFAULT_DATE = changeDateForm(date)
const MAX_DATE = changeDateForm(maxDate)
const DEFAULT_TIME = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`

const Search = ({
  fetchTime,
  fetchPrice,
  getSelectedTime,
  getSelectedDate,
  cartInfo
}) => {
  //預設日期時間為當下
  const [dateInput, setDateInput] = useState(DEFAULT_DATE)
  const [timeInput, setTimeInput] = useState(DEFAULT_TIME)

  //起訖站預設為南港到左營
  const [stationID, setStationID] = useState(destOptions[0].id)
  const [DestinationStationID, setDestinationStationID] = useState(
    destOptions[destOptions.length - 1].id
  )

  const renderOptions = useCallback(() => {
    return destOptions.map((option) => {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )
    })
  }, [])

  function onSubmit(e) {
    e.preventDefault()

    if (stationID === DestinationStationID) {
      alert('出發站不可等於到達站')
    }

    const weekValue = week[new Date(dateInput).getDay()]

    fetchTime(stationID, DestinationStationID, dateInput)
    fetchPrice(stationID, DestinationStationID)
    getSelectedTime(timeInput)
    getSelectedDate(`${dateInput}(${weekValue})`)
  }

  const onOriginStopChange = (e) => {
    setStationID(e.target.value)
  }

  const onDestinationStopChange = (e) => {
    setDestinationStationID(e.target.value)
  }

  const onDateSelectChange = (e) => {
    setDateInput(e.target.value)
  }

  const onTimeSelectChange = (e) => {
    setTimeInput(e.target.value)
  }

  const onExchangeClick = (e) => {
    e.preventDefault()
    setStationID(DestinationStationID)
    setDestinationStationID(stationID)
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

      <button className='exchange__icon' onClick={onExchangeClick}>
        <FontAwesomeIcon icon={faExchangeAlt} />
      </button>

      <div className='end-box'>
        <label htmlFor='end-box__select'>迄站</label>
        <select
          id='end-box__select'
          className='end-box__select'
          value={DestinationStationID}
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
          value={dateInput}
          onChange={onDateSelectChange}
          className='date-box__input'
          min={DEFAULT_DATE}
          max={MAX_DATE}
        />
      </div>

      <div className='time-box'>
        <label htmlFor='time-box__input'>去程時刻</label>
        <input
          id='time-box__input'
          type='time'
          className='time-box__input'
          value={timeInput}
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
  fetchPrice,
  getSelectedTime,
  getSelectedDate
})(Search)
