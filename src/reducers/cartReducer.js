const initialState = {
  detail: [],
  show: false
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW':
      return { ...state, show: true };
    case 'SET_NOT_SHOW':
      return { ...state, show: false };
    case 'SET_CART_DETAIL':
      localStorage.setItem('cartDetail', JSON.stringify(action.payload));
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
