const timetableReducer = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_FETCHED_TIMETABLE':
      return action.payload
    default:
      return state
  }
}

export default timetableReducer
