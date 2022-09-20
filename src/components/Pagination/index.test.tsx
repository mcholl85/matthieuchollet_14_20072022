import Pagination from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockStore, useSelectorMock, useDispatchMock } from '../../utils/mock'
import * as actions from '../../features/table'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('Pagination', () => {
  const pageAction = jest.spyOn(actions, 'setPage')

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
    render(<Pagination />)
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })
  test('Should render by default the button page 1', () => {
    render(<Pagination />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
  test('Should render the previous button disabled when page <=1', () => {
    useSelectorMock.mockReturnValue({ totalPage: 8, params: { page: 1 } })
    render(<Pagination />)
    expect((screen.getByText('Previous') as HTMLButtonElement).disabled).toBeTruthy()
  })
  test('Should render the previous button clickable when page & totalPage > 1', () => {
    useSelectorMock.mockReturnValue({ totalPage: 9, params: { page: 2 } })
    render(<Pagination />)
    expect((screen.getByText('Previous') as HTMLButtonElement).disabled).toBeFalsy()
  })
  test('Should render the active page with a dark bg', () => {
    useSelectorMock.mockReturnValue({ totalPage: 9, params: { page: 2 } })
    render(<Pagination />)
    expect(screen.getByText('2') as HTMLButtonElement).toHaveClass('bg-gray-900')
  })
  test('Should dispatch page action after click on page', () => {
    useSelectorMock.mockReturnValue({ totalPage: 9, params: { page: 2 } })
    render(<Pagination />)
    fireEvent.click(screen.getByText('3'))
    expect(pageAction).toHaveBeenCalled()
  })
})
