import { getRangeOfPages } from '../../utils/table'
import { useSelector, useDispatch } from 'react-redux'
import { selectTable } from '../../utils/selectors'
import * as actions from '../../features/table'

export default function Pagination() {
  const dispatch = useDispatch()
  const {
    params: { page },
    totalPage,
  } = useSelector(selectTable)

  const delta = 1
  const range = getRangeOfPages(page, totalPage, delta)
  console.log(page, totalPage)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = (e.target as HTMLButtonElement).value
    dispatch(actions.setPage({ page: parseInt(value) }))
  }

  return (
    <div className='py-6' data-testid='pagination'>
      <div className='relative z-0 inline-flex rounded' aria-label='Pagination'>
        <button
          className='relative inline-flex items-center px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md text-sm font-semibold text-gray-900 disabled:bg-white disabled:text-gray-900'
          value={page - 1}
          onClick={handleClick}
          disabled={page <= 1}
        >
          Previous
        </button>
        {range.map((currentPage, index) =>
          typeof currentPage === 'number' ? (
            <button
              key={index}
              value={currentPage}
              onClick={handleClick}
              aria-current='page'
              className={`z-10 ${
                currentPage === page ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              } relative inline-flex rounded-md items-center mx-1 px-4 py-2 text-sm font-bold hover:bg-gray-900 hover:text-white`}
            >
              {currentPage}
            </button>
          ) : (
            <span
              key={index}
              className='relative inline-flex items-center mx-1 px-4 py-2 bg-white text-sm font-bold text-gray-900'
            >
              {currentPage}
            </span>
          ),
        )}

        <button
          className='relative inline-flex items-center px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md bg-white text-sm font-semibold text-gray-900 disabled:bg-white disabled:text-gray-900'
          value={page + 1}
          onClick={handleClick}
          disabled={page >= totalPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
