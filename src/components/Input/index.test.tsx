import Input from '.'
import { FormProvider } from '../../utils/context/form'
import { render, fireEvent, screen } from '@testing-library/react'
import { FORM_DEFAULT_VALUES } from '../../utils/data'

describe('Input', () => {
  test('Should render the component into the screen', () => {
    render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Input label='First Name' type='text' id='firstName' />
      </FormProvider>,
    )
    expect(screen.getByTestId('firstName')).toBeInTheDocument()
  })
  test('Should render a value onChange', () => {
    const { getByTestId } = render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Input label='First Name' type='text' id='firstName' />
      </FormProvider>,
    )

    fireEvent.change(getByTestId('firstName'), { target: { value: 'inputValue' } })
    expect((getByTestId('firstName') as HTMLInputElement).value).toBe('inputValue')
  })
  test('Should render an error message if I use wrong value', () => {
    const { getByTestId } = render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Input label='First Name' type='text' id='firstName' />
      </FormProvider>,
    )

    fireEvent.change(getByTestId('firstName'), { target: { value: 1 } })
    expect(getByTestId('error-firstName')).toBeInTheDocument()
  })
})
