import SearchTable from '.'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mockStore, useSelectorMock, useDispatchMock } from '../../utils/mock'
import * as actions from '../../features/table'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('SearchTable', () => {
  const searchAction = jest.spyOn(actions, 'search')

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
    render(<SearchTable />)
    expect(screen.getByTestId('search')).toBeInTheDocument()
  })
  test('Should render the value of search params', () => {
    useSelectorMock.mockReturnValue({ params: { search: 'searchValue' } })
    render(<SearchTable />)
    expect((screen.getByTestId('search') as HTMLInputElement).value).toBe('searchValue')
  })
  test('Should render a value onChange', () => {
    render(<SearchTable />)
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'searchValue' } })
    expect((screen.getByTestId('search') as HTMLInputElement).value).toBe('searchValue')
  })
  test('Should dispatch search action after onChange', () => {
    render(<SearchTable />)
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'searchValue' } })
    waitFor(() => {
      expect(searchAction).toHaveBeenCalled()
    })
  })
})
