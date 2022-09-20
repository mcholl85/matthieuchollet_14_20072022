import SelectIcon from '.'
import { render, screen } from '@testing-library/react'

describe('SelectIcon', () => {
  test('Should render the component into the screen', () => {
    render(<SelectIcon />)
    expect(screen.getByTestId('selectIcon')).toBeInTheDocument()
  })
})
