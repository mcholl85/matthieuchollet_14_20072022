import Table from '.'
import { COLUMNS_TABLE } from '../../utils/data'
import { render, screen } from '@testing-library/react'
import { mockStore, mockStoreWithEmployees, useSelectorMock } from '../../utils/mock'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('Table', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore))
  })

  afterEach(() => {
    useSelectorMock.mockClear()
  })

  test('Should render the component into the screen', () => {
    render(<Table columns={COLUMNS_TABLE} />)
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })
  test('Should render a message when data employee is empty', () => {
    render(<Table columns={COLUMNS_TABLE} />)
    expect(screen.getByText('No matching records found')).toBeInTheDocument()
  })
  test('Should render the body with data', () => {
    useSelectorMock.mockImplementation((selector) => selector(mockStoreWithEmployees))
    render(<Table columns={COLUMNS_TABLE} />)
    expect(screen.getAllByTestId('employee').length).toBe(10)
  })
})
