import timetableReducer from '../../reducers/timeTableReducer'
import { mockFilteredTimetable, mockTimetable } from '../fake'

const initialState = []

describe('test timetableReducer', () => {
  it('should return the initial state', () => {
    expect(timetableReducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })
  it('should filter payload to only get useful data', () => {
    const prevState = initialState
    expect(
      timetableReducer(prevState, {
        type: 'RECEIVE_FETCHED_TIMETABLE',
        payload: mockTimetable
      })
    ).toEqual(mockFilteredTimetable)
  })
})
