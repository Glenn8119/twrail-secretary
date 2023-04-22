const priceReducer = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_FETCHED_PRICE':
      return action.payload
    default:
      return state
  }
}

export default priceReducer
