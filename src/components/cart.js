import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    return (
        <section className="cart hide">
            <h2 className="heading-2 cart__heading">購物車</h2>
            <div className="early">
                <h3 className="heading-3">最近車次</h3>
                <div className="early__detail">
                    <div className="early__detail-date"><span>2021-03-25</span><span>14:00</span></div>
                    <div className="early__detail-information">
                        <span className="early__detail-information-number">1011</span>
                        <span className="early__detail-information-destination">高雄</span>往<span>板橋</span>
                    </div>
                    <p className="early__detail-time">距發車剩餘<span>0</span>天<span>15</span>時<span>27</span>秒</p>
                </div>
            </div>
            <div className="item">
                <div className="item__left">
                    <span className="item__left-location">高雄</span><span>往</span><span className="item__left-location">板橋</span>
                </div>
                <div className="item__middle">
                    <div className="item__middle-time"><span>2021-3-25</span><span>14:00</span></div>
                    <div className="item__middle-number">車次<span>1011</span></div>
                    <div className="item__middle-price">$ 1500 元 (敬老票)</div>
                </div>
                <div className="item__right">
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span>1</span>
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className="item">
                <div className="item__left">
                    <span className="item__left-location">高雄</span><span>往</span><span className="item__left-location">板橋</span>
                </div>
                <div className="item__middle">
                    <div className="item__middle-time"><span>2021-3-25</span><span>14:00</span></div>
                    <div className="item__middle-number">車次<span>1011</span></div>
                    <div className="item__middle-price">$ 1500 元 (敬老票)</div>
                </div>
                <div className="item__right">
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span>1</span>
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className="item">
                <div className="item__left">
                    <span className="item__left-location">高雄</span><span>往</span><span className="item__left-location">板橋</span>
                </div>
                <div className="item__middle">
                    <div className="item__middle-time"><span>2021-3-25</span><span>14:00</span></div>
                    <div className="item__middle-number">車次<span>1011</span></div>
                    <div className="item__middle-price">$ 1500 元 (敬老票)</div>
                </div>
                <div className="item__right">
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span>1</span>
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className="item">
                <div className="item__left">
                    <span className="item__left-location">高雄</span><span>往</span><span className="item__left-location">板橋</span>
                </div>
                <div className="item__middle">
                    <div className="item__middle-time"><span>2021-3-25</span><span>14:00</span></div>
                    <div className="item__middle-number">車次<span>1011</span></div>
                    <div className="item__middle-price">$ 1500 元 (敬老票)</div>
                </div>
                <div className="item__right">
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span>1</span>
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className="total">
                <p className="total__price">總金額 :<span>$ 1500</span>元</p>
                <button className="total__btn">清空購物車</button>
            </div>
        </section>
    )
}

export default Cart;