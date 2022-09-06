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
    <table className='min-w-full leading-normal'>
      <thead>
        <tr className='bg-gradient-to-t from-gray-900 to-gray-700'>
          {columns.map((column, key) => (
            <TableHead key={key} column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 ? (
          data.map((employee, key) => (
            <tr
              className='bg-white text-sm border-b border-gray-200 hover:bg-gray-200'
              key={'employee' + key}
            >
              {Object.entries(employee).map(([key, value], index) => (
                <td
                  className='py-4 px-2 text-gray-900 text-center whitespace-nowrap'
                  key={key + index}
                >
                  {getColumnByData(key)?.type === 'date'
                    ? new Date(value).toLocaleDateString('fr', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : value}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className='py-6 px-5 text-xl text-center font-bold text-gray-900'
            >
              No matching records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
