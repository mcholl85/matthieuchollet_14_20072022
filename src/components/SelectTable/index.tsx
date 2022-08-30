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
    <div className='relative'>
      <select
        className='appearance-none h-full rounded-md border block w-full bg-gray-900 border-gray-900 text-white font-semibold py-2 px-4 pr-8 leading-tight focus:border-gray-400 focus:ring-0'
        value={entries}
        onChange={handleChange}
      >
        {ENTRIES_OPTIONS.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  )
}
