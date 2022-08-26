import { useContext } from 'react'
import { FormContext } from '../../utils/context/form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  changeEvent: (key: string, value: string) => void
}

export default function Input({ label, type, id, changeEvent }: InputProps) {
  const { form, errors } = useContext(FormContext)

  return (
    <>
      <label
        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        value={form[id]}
        onChange={(e) => changeEvent(id, e.target.value)}
        id={id}
        className={`appearance-none block w-full bg-gray-200 ${
          errors[id] ? 'border-red-500' : 'border-gray-200'
        } text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
      />
      {errors[id] && <p className='text-red-500 text-xs italic'>{errors[id]}</p>}
    </>
  )
}
