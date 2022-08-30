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
    <th className='px-3 py-4 text-center'>
      <button value={column.data} onClick={handleClick}>
        <span className='flex items-center text-sm uppercase font-bolder text-white whitespace-nowrap text-left justify-start pointer-events-none'>
          {column.title}
          <div className='ml-1'>
            {sort === column.data ? (
              <Chevron
                direction={order === 'asc' ? 'down' : 'up'}
                className='h-5 w-5 opacity-100'
              />
            ) : (
              <Chevron direction='down' className='h-5 w-5 opacity-25' />
            )}
          </div>
        </span>
      </button>
    </th>
  )
}
