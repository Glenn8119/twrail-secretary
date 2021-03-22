import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { fetchTime, fetchPrice, getSelectedTime, getSelectedDate } from "../actions";


let options = [
    { name: "南港", id: "0990" },
    { name: "臺北", id: "1000" },
    { name: "板橋", id: "1010" },
    { name: "桃園", id: "1020" },
    { name: "新竹", id: "1030" },
    { name: "苗栗", id: "1035" },
    { name: "台中", id: "1040" },
    { name: "彰化", id: "1043" },
    { name: "雲林", id: "1047" },
    { name: "嘉義", id: "1050" },
    { name: "台南", id: "1060" },
    { name: "左營", id: "1070" }
];

const Search = ({ fetchTime, fetchPrice, getSelectedTime, getSelectedDate }) => {

    const date = new Date();
    const maxDate = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 28);
    const h = date.getHours();
    const mi = date.getMinutes();

    const dateValue = changeDateForm(date);
    const maxDateValue = changeDateForm(maxDate);
    //將時間轉換成 HH:MM:SS格式
    const timeValue = `${h < 10 ? "0" + h : h}:${mi < 10 ? "0" + mi : mi}`

    //預設日期時間為當下
    const [dateInput, setDateInput] = useState(dateValue);
    const [timeInput, setTimeInput] = useState(timeValue);


    //起訖站預設為左營
    const [OriginStationID, setOriginStationID] = useState("0990");
    const [DestinationStationID, setDestinationStationID] = useState("1070")

    const renderOptions = () => {
        return options.map((option) => {
            return (
                <option key={option.id} value={option.id}>{option.name}</option>
            )
        })
    }

    //取得所選的日期和時間
    const week = ["日", "一", "二", "三", "四", "五", "六"];
    const weekValue = week[new Date(dateInput).getDay()];

    //將日期轉換成 YY-MM-DD格式
    function changeDateForm(date) {
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();

        return `${y}-${m < 9 ? "0" + (m + 1) : m + 1}-${d < 9 ? "0" + d : d}`
    }

    function onSubmit(e) {
        e.preventDefault();
        fetchTime(OriginStationID, DestinationStationID, dateInput);
        fetchPrice(OriginStationID, DestinationStationID);
        getSelectedTime(timeInput);
        getSelectedDate(`${dateInput}(${weekValue})`);
    }

    return (
        <form className="search" onSubmit={onSubmit}>

            <div className="start-box">
                <label htmlFor="start-box__select">起站</label>
                <select
                    id="start-box__select"
                    className="start-box__select"
                    value={OriginStationID}
                    onChange={(e) => setOriginStationID(e.target.value)}
                >
                    {renderOptions()}
                </select>
            </div>

            <button className="exchange__icon"><FontAwesomeIcon icon={faExchangeAlt} /></button>

            <div className="end-box">
                <label htmlFor="end-box__select">迄站</label>
                <select
                    id="end-box__select"
                    className="end-box__select"
                    value={DestinationStationID}
                    onChange={(e) => setDestinationStationID(e.target.value)}
                >
                    {renderOptions()}
                </select>
            </div>

            <div className="date-box">
                <label htmlFor="date-box__input">去程日期</label>
                <input
                    id="date-box__input"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="date-box__input"
                    min={dateValue}
                    max={maxDateValue}
                />
            </div>

            <div className="time-box">
                <label htmlFor="time-box__input">去程時刻</label>
                <input
                    id="time-box__input"
                    type="time"
                    className="time-box__input"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                />
            </div>

            <button className="search__btn">查詢</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return { time: state.time, price: state.price }
}

export default connect(mapStateToProps, { fetchTime, fetchPrice, getSelectedTime, getSelectedDate })(Search);