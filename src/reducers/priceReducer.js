const priceReducer = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_FETCHED_PRICE':
      const fares = action.payload[0].Fares
      return fares
    default:
      return state
  }
}

export default priceReducer
