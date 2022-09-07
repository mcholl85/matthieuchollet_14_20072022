import TableHead from '.'
import { COLUMNS_TABLE } from '../../utils/data'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mockStore, useSelectorMock, useDispatchMock } from '../../utils/mock'
import * as actions from '../../features/table'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('TableHead', () => {
  const sortAndOrderAction = jest.spyOn(actions, 'setSortAndOrder')

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

  test('Should render the component into the screen', () => {
    render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
    expect(screen.getByTestId('tableHead')).toBeInTheDocument()
  })
  test('Should show the column title', () => {
    render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
    expect(screen.getByText(COLUMNS_TABLE[0].title)).toBeInTheDocument()
  })
  describe('Should render the order icon', () => {
    test('with down direction when sort params != column.data', () => {
      useSelectorMock.mockReturnValue({ params: { sort: COLUMNS_TABLE[1].data } })
      render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
      expect(screen.getByTestId('down')).toBeInTheDocument()
    })
    test('with up direction when sort params = column.data', () => {
      useSelectorMock.mockReturnValue({ params: { sort: COLUMNS_TABLE[0].data } })
      render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
      expect(screen.getByTestId('up')).toBeInTheDocument()
    })
  })
  test('Should dispatch a sort and order action when I click on the button', () => {
    render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
    fireEvent.click(screen.getByTestId('sortAndOrderButton'))
    expect(sortAndOrderAction).toHaveBeenCalled()
  })
  test('Should change the direction of order icon when I click on the button', () => {
    useSelectorMock.mockReturnValue({ params: { sort: COLUMNS_TABLE[1].data } })
    render(<TableHead key={0} column={COLUMNS_TABLE[0]} />)
    expect(screen.getByTestId('down')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('sortAndOrderButton'))
    useDispatchMock.mockReturnValue({
      type: 'table/setSortAndOrder',
      payload: {
        order: 'asc',
        sort: 'firstName',
      },
    })
    waitFor(() => {
      expect(screen.getByTestId('up')).toBeInTheDocument()
    })
  })
})
