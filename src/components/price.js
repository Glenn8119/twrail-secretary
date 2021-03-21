import React from "react";
import { connect } from "react-redux"

const Price = ({price}) =>{

    // if(price.length){
    //     console.log(price)
    // }

    return (
        <section className="price">
            <h2 className="heading-2">車廂票價參考</h2>
            <table className="detail-price">
                <thead className="detail-price__head">
                    <tr className="detail-price__head-row">
                        <th></th>
                        <th>全票</th>
                        <th>孩童票/敬老票/愛心票</th>
                        <th>團體票</th>
                    </tr>
                </thead>
                <tbody className="detail-price__body">
                    <tr className="detail-price__body-row">
                        <td>標準車廂</td>
                        <td>$1530<button className="ticket-btn"></button></td>
                        <td>$765<button className="ticket-btn"></button></td>
                        <td>$1450<button className="ticket-btn"></button></td>
                    </tr>
                    <tr className="detail-price__body-row">
                        <td>商務車廂</td>
                        <td>$2500<button className="ticket-btn"></button></td>
                        <td>$1250<button className="ticket-btn"></button></td>
                        <td>$2375<button className="ticket-btn"></button></td>
                    </tr>
                    <tr className="detail-price__body-row">
                        <td>自由座車廂</td>
                        <td>$1480<button className="ticket-btn"></button></td>
                        <td>$740<button className="ticket-btn"></button></td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

const mapStateToProps = (state) => {
    return { price : state.price }
}

export default connect(mapStateToProps)(Price);