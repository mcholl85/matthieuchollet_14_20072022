import { useContext, useState } from 'react'
import { FormContext } from '../../utils/context/form'
import { EmployeeContext } from '../../utils/context/employee'
import { Link } from 'react-router-dom'
import { STATES_OPTIONS, VALIDATIONS, DEPARTMENT_OPTIONS } from '../../utils/data'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { getErrorsFromSubmit, objectIsEmpty } from '../../utils/form'
import { Modal } from 'react-tailwind-modal'

export default function CreateEmployee() {
  const { form, setErrors, setNewForm } = useContext(FormContext)
  const { saveEmployees } = useContext(EmployeeContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const newErrors = getErrorsFromSubmit(form, VALIDATIONS)

    if (objectIsEmpty(newErrors)) {
      saveEmployees({
        ...form,
        ...{
          startDate: new Date(form['startDate']).toJSON(),
          dateOfBirth: new Date(form['dateOfBirth']).toJSON(),
        },
      })
      setModalIsOpen(true)
      setNewForm()
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className='antialiased bg-gray-100 font-sans min-h-screen'>
      <div className='container mx-auto pt-2 pb-8 px-4 md:px-4'>
        <Header className='text-3xl my-6 uppercase font-bold text-center' title='HRnet' />
        <div className='px-6 py-8 bg-white rounded-lg'>
          <div className='flex flex-row items-baseline justify-between'>
            <h2 className='text-2xl mb-6 font-semibold leading-tight'>Create Employee</h2>
            <Link to='/employee-list'>
              <div className='w-full flex justify-center'>
                <Button
                  title='Current Employees'
                  className='text-sm bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-900 rounded-md duration-200 ease-out hover:scale-105'
                />
              </div>
            </Link>
          </div>
          <form id='create-employee' className='w-full' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <Input label='First Name' type='text' id='firstName' />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <Input label='Last Name' type='text' id='lastName' />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <Input label='Date of birth' type='date' id='dateOfBirth' />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <Input label='Start Date' type='date' id='startDate' />
              </div>
            </div>

            <fieldset className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <legend className='block uppercase tracking-wide text-dark-700 text-m font-bold mb-2'>
                  Address
                </legend>
                <div className='flex flex-wrap -mx-3 mb-6'>
                  <div className='w-full px-3'>
                    <Input label='Street' type='text' id='street' />
                  </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-2'>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <Input label='City' type='text' id='city' />
                  </div>
                  <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                    <Select options={STATES_OPTIONS} label='State' id='state' />
                  </div>
                  <div className='w-full md:w-1/3 px-3 mb-0'>
                    <Input label='Zip Code' type='number' id='zipCode' />
                  </div>
                </div>
              </div>
            </fieldset>

            <div className='flex flex-wrap -mx-3 mb-6'>
              <Select options={DEPARTMENT_OPTIONS} id='department' label='Department' />
            </div>
            <Button
              type='submit'
              title='Save'
              className='text-sm h-10 sm:h-auto w-full sm:w-auto bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-900 rounded-md duration-200 ease-out hover:scale-105'
            />
          </form>
        </div>
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
