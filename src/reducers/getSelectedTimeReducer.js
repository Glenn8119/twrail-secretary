const getSelectedTimeReducer = (selectedTime = '', action) => {
  switch (action.type) {
    case 'GET_SELECTED_TIME':
      return action.payload
    default:
      return selectedTime
  }
}

export default getSelectedTimeReducer
