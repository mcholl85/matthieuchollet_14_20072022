import Select from '.'
import { FormProvider } from '../../utils/context/form'
import { render, screen, fireEvent } from '@testing-library/react'
import { STATES_OPTIONS, FORM_DEFAULT_VALUES } from '../../utils/data'

describe('Select', () => {
  test('Should render the component with the props into the screen', () => {
    render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Select options={STATES_OPTIONS} label='selectLabel' id='state' />
      </FormProvider>,
    )
    expect(screen.getByText('selectLabel')).toBeTruthy()
    expect(screen.getByTestId('select')).toBeInTheDocument()
  })
  test('Should render the list of option after click on the label', () => {
    render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Select options={STATES_OPTIONS} label='selectLabel' id='state' />
      </FormProvider>,
    )
    fireEvent.click(screen.getByText('Select a selectLabel'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })
  test('Should select an option and add a checkIcon to the selected option', () => {
    const option = { id: 1, value: 'Alabama' }
    render(
      <FormProvider initialValues={FORM_DEFAULT_VALUES}>
        <Select options={STATES_OPTIONS} label='selectLabel' id='state' />
      </FormProvider>,
    )
    fireEvent.click(screen.getByText('Select a selectLabel'))
    fireEvent.click(screen.getByText(option.value))
    fireEvent.click(screen.getByText(option.value))
    expect(screen.getByRole('option', { selected: true })).toBeInTheDocument()
  })
})
