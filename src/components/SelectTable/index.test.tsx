import SelectTable from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockStore, useSelectorMock, useDispatchMock } from '../../utils/mock'
import * as actions from '../../features/table'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('SelectTable', () => {
  const entriesAction = jest.spyOn(actions, 'setEntries')

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
    render(<SelectTable />)
    expect(screen.getByTestId('selectTable')).toBeInTheDocument()
  })
  test('Should render the value of entries params', () => {
    useSelectorMock.mockReturnValue({ params: { entries: 25 } })
    render(<SelectTable />)
    expect((screen.getByTestId('selectTable') as HTMLSelectElement).value).toBe('25')
  })
  test('Should dispatch entries action on change', () => {
    render(<SelectTable />)
    fireEvent.change(screen.getByTestId('selectTable'), { target: { value: '25' } })
    expect(entriesAction).toHaveBeenCalled()
  })
})
