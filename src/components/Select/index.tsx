import { useState } from 'react'
import SelectIcon from '../SelectIcon'
import CheckIcon from '../CheckIcon'

interface Options {
  options: {
    id: number
    value: string
  }[]
  label: string
  id: string
  errors: {
    [key: string]: string
  }
  clickEvent: (key: string, value: string) => void
}

export default function Select({ options, label, id, errors, clickEvent }: Options) {
  const [selected, setSelected] = useState({ id: -1, value: `Select a ${label}` })
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full px-3'>
      <label
        className='block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2'
        htmlFor='department'
      >
        {label}
      </label>
      <div className='mt-1 relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`appearance-none text-left block w-full bg-gray-200 border ${
            errors[id] ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900`}
          aria-haspopup='listbox'
          aria-expanded='true'
          aria-labelledby='listbox-label'
        >
          <span className='block truncate text-gray-700'>{selected.value}</span>
          <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <SelectIcon />
          </span>
        </button>

        {isOpen && (
          <ul
            className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            tabIndex={-1}
            role='listbox'
            aria-labelledby='listbox-label'
            aria-activedescendant={`listbox-option-${selected.id}`}
          >
            {options.map((option) => (
              <li
                key={option.id}
                className='text-gray-900 cursor-default select-none relative py-2 pl-3 hover:bg-gray-900 hover:text-white'
                id={id}
                role='option'
                value={option.id}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(!isOpen)
                  clickEvent(id, option.value)
                }}
              >
                <div className='flex items-center pointer-events-none'>
                  <span className='font-normal ml-3 block truncate'>{option.value}</span>
                </div>
                <span className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                  {option.value === selected.value && <CheckIcon />}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors[id] && <p className='text-red-500 text-xs italic'>{errors[id]}.</p>}
    </div>
  )
}
