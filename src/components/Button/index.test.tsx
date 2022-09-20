import Button from '.'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  test('Should render the component onto the screen', () => {
    render(<Button title='test' />)
  })
  test('Should render the title props', () => {
    render(<Button title='test' />)
    const button = screen.getByRole('button')
    expect(button.textContent).toBe('test')
  })
})
