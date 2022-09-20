import Header from '.'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  test('Should render the component onto the screen', () => {
    render(<Header title='title' />)
    expect(screen.getByText('title')).toBeInTheDocument()
  })
  test('Should render the title props', () => {
    render(<Header title='title' />)

    const heading = screen.getByText('title')
    expect(heading).toBeDefined()
  })
  test('Should render classes props', () => {
    const { container } = render(<Header title='title' className='ml-1' />)
    expect(container.getElementsByClassName('ml-1').length).toBe(1)
  })
})
