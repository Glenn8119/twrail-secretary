import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Result from './components/Result'
import Carousel from './components/Carousel'
import Price from './components/Price'
import Cart from './components/Cart'
import Footer from './components/Footer'
import { setShow, setCartDetail } from '../../actions'

const links = [
  {
    href: 'https://www.thsrc.com.tw/ArticleContent/2f940836-cedc-41ef-8e28-c2336ac8fe68',
    text: '車站介紹'
  },
  {
    href: 'https://irs.thsrc.com.tw/IMINT/?locale=tw',
    text: '官網介紹'
  }
]

export const stationOptions = [
  { name: '南港', id: '0990' },
  { name: '臺北', id: '1000' },
  { name: '板橋', id: '1010' },
  { name: '桃園', id: '1020' },
  { name: '新竹', id: '1030' },
  { name: '苗栗', id: '1035' },
  { name: '台中', id: '1040' },
  { name: '彰化', id: '1043' },
  { name: '雲林', id: '1047' },
  { name: '嘉義', id: '1050' },
  { name: '台南', id: '1060' },
  { name: '左營', id: '1070' }
]

const changeTimeForm = (date) => {
  const h = date.getHours()
  const m = date.getMinutes()
  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`
}

export function changeDateForm(date) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  return `${y}-${m < 9 ? '0' + (m + 1) : m + 1}-${d <= 9 ? '0' + d : d}`
}

const MainPage = ({ setShow, cartInfo, setCartDetail }) => {
  // 預設日期時間為當下, 起訖站預設為南港到左營
  const [form, setForm] = useState({
    date: changeDateForm(new Date()),
    time: changeTimeForm(new Date()),
    stationID: stationOptions[0].id,
    destinationStationID: stationOptions[stationOptions.length - 1].id
  })

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('cartDetail'))
    if (storageData) {
      setCartDetail(storageData)
    }
  }, [setCartDetail])

  const handleCartClick = (e) => {
    e.stopPropagation()
    setShow()
  }

  const renderLinks = () =>
    links.map((link) => {
      return (
        <li className='nav-item' key={link.text}>
          <a
            target='_blank'
            className='nav-item__link'
            href={link.href}
            rel='noreferrer noopener'
          >
            {link.text}
          </a>
        </li>
      )
    })

  return (
    <div className='container'>
      <nav className='navbar'>
        <Link to='/' className='navbar__logo'>
          高鐵秘書
        </Link>
        <ul className='navbar__item-box'>
          {renderLinks()}
          <li className='nav-item' onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{cartInfo.detail.length}</span>
          </li>
        </ul>
      </nav>

      <main className='main'>
        <Carousel />
        <Search form={form} setForm={setForm} />
        <Result time={form.time} date={form.date} />
        <Price />
        <Cart />
      </main>

      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({ cartInfo: state.cartInfo })

export default connect(mapStateToProps, { setShow, setCartDetail })(MainPage)
