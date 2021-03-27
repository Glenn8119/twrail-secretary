import React, { Fragment } from "react";
import { connect } from "react-redux"

const Price = ({ price }) => {

    //團體票規則
    function groupPrice(price) {
        if (price * 0.95 % 10 > 5) {
            return Math.round(price * 0.95 / 10) * 10 - 5;
        }
        return Math.round(price * 0.95 / 10) * 10
    }

    //敬老票規則
    function oldPrice(price) {
        if (price * 0.5 % 10 > 5) {
            return Math.round(price * 0.5 / 10) * 10 - 5;
        }
        return Math.round(price * 0.5 / 10) * 10
    }


    const renderDetail = () => {

        const priceBusiness = price[0].Fares[0].Price
        const priceNormal = price[0].Fares[1].Price
        const pricefreeSeat = price[0].Fares[2].Price
        // const priceBusiness  

        return (
            <section className="price">
                <h2 className="heading-2">車廂票價參考</h2>

                <table className="detail-price">
                    <thead className="detail-price__head">
                        <tr className="detail-price__head-row">
                            <th ></th>
                            <th>全票</th>
                            <th>孩童票/敬老票/愛心票</th>
                            <th>團體票</th>
                        </tr>
                    </thead>
                    <tbody className="detail-price__body">
                        <tr className="detail-price__body-row">
                            <td>標準車廂</td>
                            <td>${priceNormal}</td>
                            <td>${oldPrice(priceNormal)}</td>
                            <td>${groupPrice(priceNormal)}</td>
                        </tr>
                        <tr className="detail-price__body-row">
                            <td>商務車廂</td>
                            <td>${priceBusiness}</td>
                            <td>${oldPrice(priceBusiness)}</td>
                            <td>${groupPrice(priceBusiness)}</td>
                        </tr>
                        <tr className="detail-price__body-row">
                            <td>自由座車廂</td>
                            <td>${pricefreeSeat}</td>
                            <td>${oldPrice(pricefreeSeat)}</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }

    return (
        <Fragment>
            {price.length ? renderDetail() : null}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return { price: state.price }
}

export default connect(mapStateToProps)(Price);
