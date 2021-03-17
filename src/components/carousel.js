import React from "react";

const Carousel = () => {
    return (
        <div className="carousel-container">
            <div className="items">
                <input id="btn1" type="radio" name="manual-btn" />
                <input id="btn2" type="radio" name="manual-btn" />
                <input id="btn3" type="radio" name="manual-btn" />

                <div className="item first"></div>
                <div className="item second"></div>
                <div className="item third"></div>
            </div>
            <div className="manual-btns">
                <label id="label-1" htmlFor="btn1" className="manual-btn"></label>
                <label id="label-2" htmlFor="btn2" className="manual-btn"></label>
                <label id="label-3" htmlFor="btn3" className="manual-btn"></label>
            </div>
        </div>
    )
}

export default Carousel;