const priceReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRICE':
      return action.payload
    default:
      return state
  }
}

export default priceReducer
