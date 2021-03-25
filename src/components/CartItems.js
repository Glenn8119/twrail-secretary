import React from "react";
import { connect } from "react-redux";
import { getTicketPrice } from "./calculating";

import { setLocalStorage } from "../actions";

const CartItems = ({ storageArr, setLocalStorage, item, index }) => {

    const onTicketTypeChange = (e) => {
        let Arr = [...storageArr];
        let Obj = { ...item };
        Obj.ticketType = e.target.value;
        Arr[index] = Obj;
        localStorage.setItem("dataList", JSON.stringify(Arr));
        setLocalStorage(Arr);
    }

    const onSeatTypeChange = (e) => {
        let Arr = [...storageArr];
        let Obj = { ...item };
        Obj.seatType = e.target.value;
        Arr[index] = Obj;
        localStorage.setItem("dataList", JSON.stringify(Arr));
        setLocalStorage(Arr);
    }

    const onClickDelete = (e) => {

        // 刪除該項目
        let updatedArr = storageArr.filter((item) => storageArr.indexOf(item) != e.target.id )
        //更新LocalStorage
        localStorage.setItem("dataList", JSON.stringify(updatedArr));
        //儲存到reducer
        setLocalStorage(JSON.parse(localStorage.getItem("dataList")));
    }

    const onClickUp = (item) => {
        //拷貝該物件
        let Obj = { ...item }
        //拷貝陣列
        let Arr = [...storageArr]
        //數字+1
        Obj.ticketNumber += 1;
        //更新Arr
        Arr[index] = Obj;
        //更新Localstorage
        localStorage.setItem("dataList", JSON.stringify(Arr));
        //儲存到reducer
        setLocalStorage(JSON.parse(localStorage.getItem("dataList")));
    }

    const onClickDown = (item) => {
        let Obj = { ...item }
        let Arr = [...storageArr]
        if (Obj.ticketNumber > 1) {
            Obj.ticketNumber -= 1;
            Arr[index] = Obj;
            localStorage.setItem("dataList", JSON.stringify(Arr));
            setLocalStorage(JSON.parse(localStorage.getItem("dataList")));
        }
    }

    let ticketPrice = getTicketPrice(item);


    return (
        <div className="item">
            <div className="item__left">
                <span className="item__left-location">{item.originStop}</span><span>往</span><span className="item__left-location">{item.destinationStop}</span>
            </div>
            <div className="item__middle">
                <div className="item__middle-time"><span>{item.date}</span><span>{item.departureTime}</span></div>
                <div className="item__middle-number">車次<span>{item.number}</span></div>
                <div className="item__middle-price">$ {ticketPrice} 元</div>
                <div className="item__select">
                    <select onChange={onSeatTypeChange} value={item.seatType}>
                        <option value="normal">標準</option>
                        <option value="business">商務</option>
                        <option value="freeSeat">自由座</option>
                    </select>
                        /
                    <select onChange={onTicketTypeChange} value={item.ticketType}>
                        <option value="adult">全票</option>
                        <option value="old">敬老</option>
                        <option value="group">團體</option>
                    </select>
                </div>
            </div>
            <div className="item__right">
                <span onClick={() => onClickUp(item)} className="item__right-up"></span>
                <span>{item.ticketNumber}</span>
                <span onClick={() => onClickDown(item)} className="item__right-down"></span>
            </div>
            <button className="item__icon" onClick={onClickDelete} id={index}></button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        storageArr: state.storageArr
    }
}

export default connect(mapStateToProps, { setLocalStorage })(CartItems);