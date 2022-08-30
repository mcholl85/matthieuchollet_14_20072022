import { useSelector } from 'react-redux'
import { selectTable } from '../../utils/selectors'

export default function ShowResults() {
  const {
    totalCount,
    params: { entries, page },
  } = useSelector(selectTable)

  const first = totalCount === 0 ? 0 : (page - 1) * entries + 1
  const last = entries * page > totalCount ? totalCount : entries * page

  return (
    <div className='pt-2'>
      <p className='text-sm text-gray-900'>
        Showing
        <span className='font-semibold mx-1'>{first}</span>
        to
        <span className='font-semibold mx-1'>{last}</span>
        of
        <span className='font-semibold mx-1'>{totalCount}</span>
        results
      </p>
    </div>
  )
}
