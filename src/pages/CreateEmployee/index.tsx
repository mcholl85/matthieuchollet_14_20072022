import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../utils/context/form'
import { EmployeeContext } from '../../utils/context/employee'
import { Link } from 'react-router-dom'
import { STATES_OPTIONS, VALIDATIONS, DEPARTMENT_OPTIONS } from '../../utils/data'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { getErrorsFromSubmit, getErrorFromChange, objectIsEmpty } from '../../utils/form'
import Modal from '../../components/Modal'

export default function CreateEmployee() {
  const { form, setForm, errors, setErrors, setNewForm } = useContext(FormContext)
  const { saveEmployees } = useContext(EmployeeContext)
  const [formIsValid, setFormIsValid] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (formIsValid) {
      saveEmployees({
        ...form,
        ...{
          startDate: new Date(form['startDate']).toJSON(),
          dateOfBirth: new Date(form['dateOfBirth']).toJSON(),
        },
      })
      setModalIsOpen(true)
      setNewForm()
    }
  }, [formIsValid])

  const handleFormChange = (key: string, value: string): void => {
    const copyErrors = { ...errors }
    const newError = getErrorFromChange(key, value, VALIDATIONS)

    if (objectIsEmpty(newError)) {
      delete copyErrors[key]
      setErrors(copyErrors)
    } else {
      setErrors({ ...copyErrors, [key]: newError[key] })
    }
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const newErrors = getErrorsFromSubmit(form, VALIDATIONS)

    if (objectIsEmpty(newErrors)) {
      setFormIsValid(true)
    } else {
      setFormIsValid(false)
      setErrors(newErrors)
    }
  }

  return (
    <div>
      <div className='container mx-auto py-4 px-4 md:px-4'>
        <Header className='text-xl mb-6 uppercase font-bold text-center' title='HRnet' />
        <Link to='/employee-list'>
          <div className='w-full flex justify-center'>
            <Button
              title='Current Employees'
              className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-6 border border-gray-400 rounded shadow'
            />
          </div>
        </Link>
        <h2 className='text-l mb-6 uppercase font-bold'>Create Employee</h2>
        <form id='create-employee' className='w-full' onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <Input label='First Name' type='text' id='firstName' changeEvent={handleFormChange} />
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <Input label='Last Name' type='text' id='lastName' changeEvent={handleFormChange} />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <Input
                label='Date of birth'
                type='date'
                id='dateOfBirth'
                changeEvent={handleFormChange}
              />
            </div>
          </div>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <Input label='Start Date' type='date' id='startDate' changeEvent={handleFormChange} />
            </div>
          </div>

          <fieldset className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <legend className='block uppercase tracking-wide text-dark-700 text-m font-bold mb-2'>
                Address
              </legend>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                  <Input label='Street' type='text' id='street' changeEvent={handleFormChange} />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Input label='City' type='text' id='city' changeEvent={handleFormChange} />
                </div>
                <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                  <Select
                    options={STATES_OPTIONS}
                    label='State'
                    id='state'
                    errors={errors}
                    clickEvent={handleFormChange}
                  />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <Input
                    label='Zip Code'
                    type='number'
                    id='zipCode'
                    changeEvent={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <Select
              options={DEPARTMENT_OPTIONS}
              id='department'
              label='Department'
              errors={errors}
              clickEvent={handleFormChange}
            />
          </div>
          <Button type='submit' title='Save' />
        </form>
      </div>
      {modalIsOpen && (
        <Modal
          title='Success !'
          content='The employee has been created'
          onClick={() => setModalIsOpen(false)}
        />
      )}
    </div>
  )
}
