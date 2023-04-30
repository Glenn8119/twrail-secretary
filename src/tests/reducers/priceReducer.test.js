import priceReducer from '../../reducers/priceReducer'
import { mockPrice, mockFilteredPrice } from '../fake'

const initialState = []

describe('test timetableReducer', () => {
  it('should return the initial state', () => {
    expect(priceReducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should filter payload to only get useful data', () => {
    const prevState = initialState
    expect(
      priceReducer(prevState, {
        type: 'RECEIVE_FETCHED_PRICE',
        payload: mockPrice
      })
    ).toEqual(mockFilteredPrice)
  })
})
