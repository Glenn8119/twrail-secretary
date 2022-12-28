import video from './video/video.mp4'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrain, faHandPointer } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

const CoverPage = () => {
  const onClick = (e) => {
    e.stopPropagation()
  }
  return (
    <div className='cover'>
      <div className='bg-video'>
        <video className='bg-video__content' autoPlay loop muted>
          <source src={video} type='video/mp4' />
          Your browser is not supported to play this video!
        </video>
      </div>
      <div className='content'>
        <h1 className='heading-1'>歡迎使用高鐵秘書</h1>
        <div className='content__text'>
          <span className='line line-1'>在這裡你可以...</span>
          <span className='line line-2'>
            <FontAwesomeIcon icon={faTrain} />
            模擬購票
          </span>
          <span className='line line-3'>
            <FontAwesomeIcon icon={faTrain} />
            保留模擬紀錄
          </span>
          <span className='line line-4'>
            <FontAwesomeIcon icon={faTrain} />
            確認發車剩餘時間
          </span>
        </div>
        <Link to='/main' className='button' onClick={onClick}>
          <FontAwesomeIcon icon={faHandPointer} />
          Start
        </Link>
      </div>
    </div>
  )
}

export default CoverPage
