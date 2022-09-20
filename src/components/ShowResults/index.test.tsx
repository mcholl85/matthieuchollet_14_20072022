import ShowResults from '.'
import { render, screen } from '@testing-library/react'
import { mockStore, useSelectorMock } from '../../utils/mock'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('ShowResults', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore))
  })

  afterEach(() => {
    useSelectorMock.mockClear()
  })
  test('Should render the component into the screen', () => {
    render(<ShowResults />)
    expect(screen.getByTestId('showResults')).toBeInTheDocument()
  })
  test('Should render the first and last index of the page table, and the sum of all the employees', () => {
    useSelectorMock.mockReturnValue({ totalCount: 1000, params: { entries: 25, page: 2 } })
    render(<ShowResults />)
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('26')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })
})
