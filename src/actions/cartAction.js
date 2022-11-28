//設定購物車狀態on
export const setShow = () => {
  return {
    type: 'SET_SHOW'
  }
}
//設定購物車狀態off
export const setNotShow = () => {
  return {
    type: 'SET_NOT_SHOW'
  }
}

//將LOCALSTORAGE的資料儲存
export const setCartDetail = (detail) => {
  return {
    type: 'SET_CART_DETAIL',
    payload: detail
  }
}
