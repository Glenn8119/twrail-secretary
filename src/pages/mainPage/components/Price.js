import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { CABIN_CLASS, FARE_CLASS, TICKET_TYPE } from '../../../config'

export const calculatePrice = (price, ticketType, fareClass, cabinClass) => {
  return price.find(
    (_price) =>
      _price.TicketType === ticketType &&
      _price.FareClass === fareClass &&
      _price.CabinClass === cabinClass
  )?.Price
}

export const collectPrices = (price) => {
  if (!price.length) return

  const priceNormalStandard = calculatePrice(
    price,
    TICKET_TYPE.NORMAL,
    FARE_CLASS.ADULT,
    CABIN_CLASS.STANDARD
  )
  const priceNormalBusiness = calculatePrice(
    price,
    TICKET_TYPE.NORMAL,
    FARE_CLASS.ADULT,
    CABIN_CLASS.BUSINESS
  )
  const priceNormalFree = calculatePrice(
    price,
    TICKET_TYPE.NORMAL,
    FARE_CLASS.ADULT,
    CABIN_CLASS.FREE
  )
  const priceGroupStandard = calculatePrice(
    price,
    TICKET_TYPE.GROUP,
    FARE_CLASS.ADULT,
    CABIN_CLASS.STANDARD
  )
  const priceGroupBusiness = calculatePrice(
    price,
    TICKET_TYPE.GROUP,
    FARE_CLASS.ADULT,
    CABIN_CLASS.BUSINESS
  )

  return {
    priceNormalStandard,
    priceNormalBusiness,
    priceNormalFree,
    priceGroupStandard,
    priceGroupBusiness
  }
}

const Price = ({ price }) => {
  const renderDetail = () => {
    const {
      priceNormalStandard,
      priceNormalBusiness,
      priceNormalFree,
      priceGroupStandard,
      priceGroupBusiness
    } = collectPrices(price)

    return (
      <section className='price'>
        <h2 className='heading-2'>車廂票價參考</h2>

        <table className='detail-price'>
          <thead className='detail-price__head'>
            <tr className='detail-price__head-row'>
              <th></th>
              <th>全票</th>
              <th>團體票</th>
            </tr>
          </thead>
          <tbody className='detail-price__body'>
            <tr className='detail-price__body-row'>
              <td>標準車廂</td>
              <td>${priceNormalStandard}</td>
              <td>${priceGroupStandard}</td>
            </tr>
            <tr className='detail-price__body-row'>
              <td>商務車廂</td>
              <td>${priceNormalBusiness}</td>
              <td>${priceGroupBusiness}</td>
            </tr>
            <tr className='detail-price__body-row'>
              <td>自由座車廂</td>
              <td>${priceNormalFree}</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }

  return <Fragment>{price.length ? renderDetail() : null}</Fragment>
}

const mapStateToProps = (state) => {
  return { price: state.price }
}

export default connect(mapStateToProps)(Price)
