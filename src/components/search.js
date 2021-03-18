import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const h = date.getHours();
    const mi = date.getMinutes();

    const dateValue = `${y}-${m < 9 ? "0" : ""}${m + 1}-${d}`;
    const timeValue = `${h < 10 ? "0" : ""}${h}:${mi < 10 ? "0" : ""}${mi}`

    const [dateInput, setDateInput] = useState(dateValue);
    const [timeInput, setTimeInput] = useState(timeValue);

    return (
        <form className="search">

            <div className="start-box">
                <label htmlFor="start-box__select">起站</label>
                <select id="start-box__select" className="start-box__select">
                    <option> 左營 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
                </select>
            </div>

            <button className="exchange__icon"><FontAwesomeIcon icon={faExchangeAlt} /></button>

            <div className="end-box">
                <label htmlFor="end-box__select">迄站</label>
                <select id="end-box__select" className="end-box__select">
                    <option> 左營 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
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

export default Search;