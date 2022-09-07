import CreateEmployee from '.'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FormProvider } from '../../utils/context/form'
import { EmployeeProvider } from '../../utils/context/employee'
import { FORM_DEFAULT_VALUES } from '../../utils/data'
import { BrowserRouter } from 'react-router-dom'
import { mockFormSuccessValues } from '../../utils/mock'

describe('CreateEmployee', () => {
  test('Should render the page without crashing', () => {
    render(
      <BrowserRouter>
        <FormProvider initialValues={FORM_DEFAULT_VALUES}>
          <EmployeeProvider>
            <CreateEmployee />
          </EmployeeProvider>
        </FormProvider>
      </BrowserRouter>,
    )
  })
  test('Should redirect to employeeList page when i click on add employee button', () => {
    render(
      <BrowserRouter>
        <FormProvider initialValues={FORM_DEFAULT_VALUES}>
          <EmployeeProvider>
            <CreateEmployee />
          </EmployeeProvider>
        </FormProvider>
      </BrowserRouter>,
    )
    fireEvent.click(screen.getByText('Current Employees'))
    expect(screen.getByText('Current Employees')).toBeInTheDocument()
  })
  test('Should render errors messages when form is invalid', () => {
    render(
      <BrowserRouter>
        <FormProvider initialValues={FORM_DEFAULT_VALUES}>
          <EmployeeProvider>
            <CreateEmployee />
          </EmployeeProvider>
        </FormProvider>
      </BrowserRouter>,
    )
    fireEvent.click(screen.getByText('Save'))
    expect(screen.getByTestId('error-firstName')).toBeInTheDocument()
  })
  test('Should render a success modal when form is valid', () => {
    render(
      <BrowserRouter>
        <FormProvider initialValues={mockFormSuccessValues}>
          <EmployeeProvider>
            <CreateEmployee />
          </EmployeeProvider>
        </FormProvider>
      </BrowserRouter>,
    )
    fireEvent.click(screen.getByText('Save'))
    expect(screen.getByText('Success !')).toBeInTheDocument()
  })
})
