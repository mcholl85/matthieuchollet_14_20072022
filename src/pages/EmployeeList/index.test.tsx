import EmployeeList from '.'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { EmployeeProvider } from '../../utils/context/employee'
import { mockStore, useDispatchMock, useSelectorMock } from '../../utils/mock'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('EmployeeList', () => {
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {
      return
    })
    useSelectorMock.mockImplementation((selector) => selector(mockStore))
  })

  afterEach(() => {
    useDispatchMock.mockClear()
    useSelectorMock.mockClear()
  })
  test('Should render the page without crashing', () => {
    render(
      <BrowserRouter>
        <EmployeeProvider>
          <EmployeeList />
        </EmployeeProvider>
      </BrowserRouter>,
    )
  })
})
