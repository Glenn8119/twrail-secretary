const timetableReducer = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_FETCHED_TIMETABLE':
      const filteredTimetable = action.payload.map((item) => {
        const {
          OriginStopTime: { StationName: OSStationName, DepartureTime },
          DestinationStopTime: { StationName: DSStationName, ArrivalTime },
          DailyTrainInfo: { TrainNo },
          TrainDate
        } = item

        return {
          OriginStopTime: {
            OSStationName,
            DepartureTime
          },
          DestinationStopTime: {
            DSStationName,
            ArrivalTime
          },
          DailyTrainInfo: {
            TrainNo
          },
          TrainDate
        }
      })

      return filteredTimetable
    default:
      return state
  }
}

export default timetableReducer
