import { fakeCartDetail } from '../fake/cartData';
import cartReducer from './cartReducer';

const initialState = {
  detail: [],
  show: false
};

describe('test cartReducer', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle cart state', () => {
    const prevState = initialState;
    expect(cartReducer(prevState, { type: 'SET_SHOW' })).toEqual({
      ...prevState,
      show: true
    });
  });

  it('should set cart detail', () => {
    const prevState = initialState;
    expect(
      cartReducer(prevState, {
        type: 'SET_CART_DETAIL',
        payload: fakeCartDetail
      })
    ).toEqual({
      ...prevState,
      detail: fakeCartDetail
    });
  });
});
