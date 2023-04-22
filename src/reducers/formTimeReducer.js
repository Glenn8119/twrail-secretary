const initialState = {
  date: '',
  time: ''
}

const formTimeReducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case 'SET_SELECTED_TIME':
      return {
        ...state,
        time: payload
      }
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        date: payload
      }
    default:
      return state
  }
}

export default formTimeReducer
