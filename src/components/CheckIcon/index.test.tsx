import CheckIcon from '.'
import { render, screen } from '@testing-library/react'

describe('CheckIcon', () => {
  test('Should render the component onto the screen', () => {
    render(<CheckIcon />)
    expect(screen.getByTestId('checkIcon')).toBeInTheDocument()
  })
})
