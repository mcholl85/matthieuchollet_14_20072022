import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import ShowResults from '../../components/ShowResults'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import SearchTable from '../../components/SearchTable'
import SelectTable from '../../components/SelectTable'
import Header from '../../components/Header'
import { MOCK_EMPLOYEES, USE_MOCK_DATA } from '../../utils/mock'
import { EmployeeContext } from '../../utils/context/employee'
import { COLUMNS_TABLE } from '../../utils/data'
import { getParams } from '../../utils/employeeList'
import * as actions from '../../features/table'

export default function EmployeeList() {
  const { employees } = USE_MOCK_DATA ? { employees: MOCK_EMPLOYEES } : useContext(EmployeeContext)
  const dispatch = useDispatch()
  const url = new URL(window.location.href)
  const optionsByParamsURL = getParams(url.searchParams)

  useEffect(() => {
    dispatch(actions.loadTable({ employees: employees, params: optionsByParamsURL }))
  }, [])

  return (
    <div className='container mx-auto py-4 sm:py-4 px-4 md:px-4'>
      <Header className='text-xl mb-6 uppercase font-bold text-center' title='Current Employees' />
      <div className='flex flex-wrap'>
        <div className='w-full md:w-1/2 text-gray-700 text-sm'>
          <SelectTable />
        </div>
        <div className='w-full md:w-1/2 text-gray-700 text-sm'>
          <SearchTable />
        </div>
      </div>
      <Table columns={COLUMNS_TABLE} />
      <div className='bg-white py-3 flex items-center justify-between'>
        <div className='sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <ShowResults />
          <Pagination />
        </div>
      </div>

      <Link to='/'>
        <Button
          title='Home'
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-6 border border-gray-400 rounded shadow'
        />
      </Link>
    </div>
  )
}
