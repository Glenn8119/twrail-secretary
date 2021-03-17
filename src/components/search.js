import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const date = new Date();
    const dateValue = `${date.getFullYear()}-${date.getMonth()<9 ? "0" : ""}${date.getMonth()+1}-${date.getDate()}`;

    const  [dates, setDates] = useState(dateValue)

    return (
        <form className="search">
            <select className="search__select">
                <option> 左營 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
            </select>

            <button className="search__icon"><FontAwesomeIcon icon={faExchangeAlt}/></button>

            <select className="search__select">
                <option> 左營 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
            </select>
            <input
            type="date"
            value={dates}
            onChange={(e)=> setDates(e.target.value)}
            className="search__date"
            />
            <input type="time" className="search__time"/>
            <button>查詢</button>            
        </form>
    )
}

export default Search;