import Chevron from '../Chevron'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../features/table'
import { selectTable } from '../../utils/selectors'

type Column = {
  data: string
  title: string
}

type TableHeadProps = {
  key: number
  column: Column
}

export default function TableHead({ column }: TableHeadProps) {
  const dispatch = useDispatch()
  const {
    params: { sort, order },
  } = useSelector(selectTable)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = (e.target as HTMLButtonElement).value

    if (sort === value) {
      if (order === 'asc') {
        dispatch(actions.setSortAndOrder({ order: 'desc', sort: value }))
      } else {
        dispatch(actions.setSortAndOrder({ order: 'asc', sort: value }))
      }
    } else {
      dispatch(actions.setSortAndOrder({ order: 'desc', sort: value }))
    }
  }

  return (
    <th className='py-2 px-2'>
      <button value={column.data} onClick={handleClick}>
        <span className='flex items-center justify-center pointer-events-none'>
          {column.title}
          <div className='ml-1'>
            <Chevron
              direction='up'
              className={`h-4 w-4 ${
                sort === column.data && order === 'asc' ? 'opacity-100' : 'opacity-25'
              }`}
            />
            <Chevron
              direction='down'
              className={`h-4 w-4 -mt-2 ${
                sort === column.data && order === 'desc' ? 'opacity-100' : 'opacity-25'
              }`}
            />
          </div>
        </span>
      </button>
    </th>
  )
}
