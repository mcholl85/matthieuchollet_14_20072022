import Chevron from '.'
import { render, screen } from '@testing-library/react'

describe('Chevron', () => {
  test('Should render a up icon', () => {
    render(<Chevron direction='up' />)
    expect(screen.getByTestId('up')).toBeTruthy()
  })
  test('Should render a down icon', () => {
    render(<Chevron direction='down' />)
    expect(screen.getByTestId('down')).toBeTruthy()
  })
  test('Should render classes props', () => {
    const { container } = render(<Chevron direction='up' className='ml-1' />)
    expect(container.getElementsByClassName('ml-1').length).toBe(1)
  })
})
