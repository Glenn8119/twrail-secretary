import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { fakeCartDetail } from '../../fake/cartData'
import reducers from '../../reducers'
import { mockTimetable } from '../../fake/Result'
import MainPage from '.'
import { HashRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { mockPrice } from '../../fake/price'

const mockCartInfo = {
  show: true,
  detail: fakeCartDetail
}

const setupStore = (preloadState) => {
  return createStore(reducers, preloadState, applyMiddleware(thunk))
}

const customRender = (
  ui,
  { preloadState = {}, store = setupStore(preloadState), ...options } = {}
) => {
  const MockProvider = ({ children }) => {
    console.log({ store: store.getState() })
    return (
      <Provider store={store}>
        <HashRouter>{children}</HashRouter>
      </Provider>
    )
  }
  return render(ui, { wrapper: MockProvider, ...options })
}

it('group tickets cannot be select when there are less than 11 people', async () => {
  customRender(<MainPage />, {
    preloadState: {
      timeTable: mockTimetable,
      cartInfo: mockCartInfo
    }
  })
  window.alert = jest.fn()

  const selectElement = screen.getAllByTestId('ticketType')
  fireEvent.change(selectElement[0], { target: { value: 'group' } })
  expect(window.alert).toHaveBeenCalledTimes(1)
  expect(window.alert).toHaveBeenCalledWith('選擇團體票人數須至少11人')
})

it('should add an item into cart when users click ticket icon', () => {
  customRender(<MainPage />, {
    preloadState: {
      timeTable: mockTimetable,
      selectedTime: '20:00',
      price: mockPrice
    }
  })
  // no items in cart initially
  const cartItem = screen.queryByTestId('cart-item')
  expect(cartItem).not.toBeInTheDocument()

  // click ticket icon and a cart item appears in the cart
  const ticket = screen.getAllByTestId('ticket-btn')[0]
  fireEvent.click(ticket)
  const cartItemAfterClickTicket = screen.queryByTestId('cart-item')
  expect(cartItemAfterClickTicket).toBeInTheDocument()
})
