import { useSelector } from 'react-redux'
import { getColumnByData } from '../../utils/form'
import { selectTable } from '../../utils/selectors'
import TableHead from '../TableHead'

interface PropsTable {
  columns: { title: string; data: string }[]
}

export default function Table({ columns }: PropsTable) {
  const { filteredEmployees: data } = useSelector(selectTable)

  return (
    <table className='table-auto w-full text-xs text-center text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700  dark:text-gray-400'>
        <tr>
          {columns.map((column, key) => (
            <TableHead key={key} column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 ? (
          data.map((employee, key) => (
            <tr className='border-b border-gray-200 dark:border-gray-700' key={'employee' + key}>
              {Object.entries(employee).map(([key, value], index) => (
                <td className='py-3 px-4' key={key + index}>
                  {getColumnByData(key)?.type === 'date'
                    ? new Date(value).toLocaleDateString('fr')
                    : value}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className='p-3 text-lg bg-gray-25'>
              No matching records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
