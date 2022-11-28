import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import React, { useEffect, useCallback } from 'react'
import Search from './Search'
import Result from './Result'
import Carousel from './Carousel'
import Price from './Price'
import Cart from './Cart'
import Footer from './Footer'
import { setShow, setCartDetail } from '../actions'

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

const MainPage = ({ setShow, cartInfo, setCartDetail }) => {
  // 如果原本localstorage就有資料的話就先讀取
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('cartDetail'))
    if (storageData) {
      setCartDetail(storageData)
    }
  }, [setCartDetail])

  const onClick = (e) => {
    setShow()
    e.stopPropagation()
  }

  const onLogoClick = (e) => {
    e.stopPropagation()
  }

  const renderLinks = useCallback(
    () =>
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
      }),
    []
  )

  return (
    <div className='container'>
      <nav className='navbar'>
        <Link to='/' className='navbar__logo' onClick={onLogoClick}>
          高鐵秘書
        </Link>
        <ul className='navbar__item-box'>
          {renderLinks()}
          <li className='nav-item' onClick={onClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{cartInfo.detail.length}</span>
          </li>
        </ul>
      </nav>

      <main className='main'>
        <Carousel />
        <Search />
        <Result />
        <Price />
        <Cart />
      </main>

      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cartInfo: state.cartInfo
  }
}

export default connect(mapStateToProps, { setShow, setCartDetail })(MainPage)
