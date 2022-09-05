import { useContext } from 'react'
import { FormContext } from '../../utils/context/form'
import { VALIDATIONS } from '../../utils/data'
import { getErrorFromChange, objectIsEmpty } from '../../utils/form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export default function Input({ label, type, id }: InputProps) {
  const { form, setForm, setErrors, errors } = useContext(FormContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const copyErrors = { ...errors }
    const newError = getErrorFromChange(id, value, VALIDATIONS)

    if (objectIsEmpty(newError)) {
      delete copyErrors[id]
      setErrors(copyErrors)
    } else {
      setErrors({ ...copyErrors, [id]: newError[id] })
    }
    setForm({ ...form, [id]: value })
  }

  return (
    <>
      <label
        className='block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        value={form[id]}
        onChange={handleChange}
        id={id}
        data-testid={id}
        className={`appearance-none block w-full bg-gray-200 ${
          errors[id] ? 'border-red-500' : 'border-gray-200'
        } text-gray-900 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-900 focus:border-2 focus:ring-0`}
      />
      {errors[id] && <p className='text-red-500 text-xs italic'>{errors[id]}</p>}
    </>
  )
}
