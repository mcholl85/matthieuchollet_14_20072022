import { ENTRIES_OPTIONS } from '../../utils/data'
import { useSelector, useDispatch } from 'react-redux'
import { selectTable } from '../../utils/selectors'
import * as actions from '../../features/table'

export default function SelectTable() {
  const dispatch = useDispatch()
  const {
    params: { entries },
  } = useSelector(selectTable)

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    dispatch(actions.setEntries({ entries: parseInt(value) }))
  }

  return (
    <>
      <label className=''>
        Show
        <select
          className='appearance-none shadow-md bg-gray-200 border-gray-200 text-gray-700 text-sm border rounded mx-3 mb-3 leading-tight focus:outline-none focus:bg-white'
          value={entries}
          onChange={handleChange}
        >
          {ENTRIES_OPTIONS.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        entries
      </label>
    </>
  )
}
