export const setShow = () => {
  return {
    type: 'SET_SHOW'
  }
}

export const setNotShow = () => {
  return {
    type: 'SET_NOT_SHOW'
  }
}

export const setCartDetail = (detail) => (dispatch) => {
  localStorage.setItem('cartDetail', JSON.stringify(detail))

  dispatch({
    type: 'SET_CART_DETAIL',
    payload: detail
  })
}
