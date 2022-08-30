import * as actions from '../../features/table'
import { useSelector, useDispatch } from 'react-redux'
import { selectTable } from '../../utils/selectors'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

export default function SearchTable() {
  const {
    params: { search },
  } = useSelector(selectTable)
  const [inputSearchValue, setInputSearchValue] = useState(search)
  const dispatch = useDispatch()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setInputSearchValue(value)
    debouncedDispatch(value)
  }

  useEffect(() => {
    setInputSearchValue(search)
  }, [search])

  const debouncedDispatch = useCallback(
    debounce((value) => dispatch(actions.search({ search: value })), 500),
    [],
  )

  return (
    <div className='ml-2 block relative'>
      <span className='h-full absolute inset-y-0 left-0 flex items-center pl-2'>
        <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current text-white'>
          <path d='M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z'></path>
        </svg>
      </span>
      <input
        placeholder='Search'
        className='appearance-none rounded-md border border-grey-900 border-b block pl-8 pr-6 py-2 w-full bg-gray-900 text-sm font-semibold placeholder-gray-600 text-gray-700 focus:placeholder-white focus:text-white focus:font-semibold focus:border-gray-900 focus:ring-0'
        type='text'
        value={inputSearchValue}
        onChange={handleChange}
      />
    </div>
  )
}
