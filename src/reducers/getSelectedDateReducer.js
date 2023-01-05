const getSelectedTimeReducer = (selectedDate = '', action) => {
  switch (action.type) {
    case 'GET_SELECTED_DATE':
      return action.payload
    default:
      return selectedDate
  }
}

export default getSelectedTimeReducer
