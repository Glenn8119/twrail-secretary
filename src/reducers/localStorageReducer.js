const localStorageReducer = (localStorage = [], action) => {
  switch (action.type) {
    case 'SET_LOCALSTORAGE':
      return action.payload
    default:
      return localStorage
  }
}

export default localStorageReducer
