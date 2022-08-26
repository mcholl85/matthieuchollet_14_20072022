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
    <>
      <label className='flex md:justify-end items-baseline'>
        Search :
        <input
          className='appearance-none block bg-gray-200 border-gray-200
             text-gray-700 border rounded mb-3 ml-3 leading-tight focus:outline-none focus:bg-white'
          type='text'
          value={inputSearchValue}
          onChange={handleChange}
        />
      </label>
    </>
  )
}
