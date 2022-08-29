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

  const currentPage = page

  const delta = 1
  const range = getRangeOfPages(currentPage, totalPage, delta)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = (e.target as HTMLButtonElement).value
    dispatch(actions.setPage({ page: parseInt(value) }))
  }

  return (
    <div className='shadow-md'>
      <div
        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
        aria-label='Pagination'
      >
        <button
          className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          value={currentPage - 1}
          onClick={handleClick}
          disabled={currentPage <= 1}
        >
          <span className='sr-only'>Previous</span>
          <svg
            className='h-5 w-5 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        {range.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              value={page}
              onClick={handleClick}
              aria-current='page'
              className={`z-10 ${
                currentPage === page ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-500'
              }  border-gray-300  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'
            >
              {page}
            </span>
          ),
        )}

        <button
          className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          value={currentPage + 1}
          onClick={handleClick}
          disabled={currentPage >= totalPage}
        >
          <span className='sr-only'>Next</span>
          <svg
            className='h-5 w-5 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
