import React, {useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { setNotShow, setLocalStorage } from "../actions"
import { connect } from "react-redux";

import { getTicketPrice, getTimeDifference, changeTimeToMillisecond, findValidMinimumItem } from "./calculating";
import CartItems from "./CartItems";

const Cart = ({ cartState, setNotShow, storageArr, setLocalStorage }) => {

    const refCart = useRef();
    //點擊其他地方會收起cart
    document.addEventListener("click", (e)=>{
        if(refCart.current && !refCart.current.contains(e.target)){
            setNotShow();
        }
        return 
    })

    const renderDetail = storageArr ? storageArr.map((item, index) => {
        return (
            <CartItems item={item} index={index} key={index} />
        )
    }) : null;

    const onClickClear = () => {
        let arr = [];
        //更新Localstorage
        localStorage.setItem("dataList", JSON.stringify(arr));
        //儲存到reducer
        setLocalStorage(JSON.parse(localStorage.getItem("dataList")));
    }

    //抓出購物車所有車次的出發時間, 轉換成毫秒後排成陣列
    let timeArr = storageArr.map((item) => changeTimeToMillisecond(item));

    //抓出尚未過期且最小的一班車的index
    let targetIndex = timeArr.indexOf(findValidMinimumItem(timeArr));

    //計算該車次發車時間與目前時間差
    let TimeDifference = getTimeDifference(storageArr[targetIndex]);
    let daysLeft = TimeDifference ? Math.floor(TimeDifference.getTime() / 3600000 / 24) : "-";
    let hoursLeft = TimeDifference ? TimeDifference.getUTCHours() : "-";
    let minutesLeft = TimeDifference ? TimeDifference.getUTCMinutes() : "-";

    //顯示最近一班車資訊
    let nextOriginStop = TimeDifference ? storageArr[targetIndex].originStop : null ;
    let nextDestinationStop = TimeDifference ? storageArr[targetIndex].destinationStop : null ;
    let nextDepartureTime = TimeDifference ? storageArr[targetIndex].departureTime : null ;
    let nextDepartureDate = TimeDifference ? storageArr[targetIndex].date : null ;
    let nextnumber = TimeDifference ? storageArr[targetIndex].number : null ;

    //計算票價總和
    let priceArr = storageArr.map(item => getTicketPrice(item))
    let totalPrice = priceArr.length > 0 ? priceArr.reduce((a, b) => {
        return a + b;
    }) : 0;

    return (
        <section ref={refCart} className={`cart ${cartState ? "show-cart" : ""}`}>
            <FontAwesomeIcon icon={faTimes} onClick={setNotShow} />
            <h2 className="heading-2 cart__heading">購物車</h2>
            <div className="early">
                <h3 className="heading-3">最近車次</h3>
                <div className="early__detail">
                    <div className="early__detail-date"><span>{nextDepartureDate}</span><span>{nextDepartureTime}</span></div>
                    <div className="early__detail-information">
                        <span className="early__detail-information-number">{nextnumber}</span>
                        <span className="early__detail-information-destination">{nextOriginStop}</span>{TimeDifference ? "往" : ""}<span>{nextDestinationStop}</span>
                    </div>
                    <p className="early__detail-time">距發車剩餘<span>{daysLeft}</span>天<span>{hoursLeft}</span>時<span>{minutesLeft}</span>分</p>
                </div>
            </div>
            {renderDetail}
            <div className="total">
                <p className="total__price">總金額 :<span>$ {totalPrice}</span>元</p>
                <button onClick={onClickClear} className="total__btn">清空購物車</button>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        cartState: state.cartState,
        storageArr: state.storageArr
    }
}

export default connect(mapStateToProps, { setNotShow, setLocalStorage })(Cart);
