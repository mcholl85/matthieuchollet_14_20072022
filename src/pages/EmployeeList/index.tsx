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
    <div className='antialiased bg-gray-100 font-sans min-h-screen'>
      <div className='container mx-auto py-4 sm:py-8 px-4 md:px-0'>
        <div className='px-6 pt-8 bg-white rounded-lg'>
          <Header className='mb-6 text-2xl font-semibold leading-tight' title='Current Employees' />
          <div className='my-2 flex justify-between'>
            <div className='flex flex-col sm:flex-row items-start'>
              <SelectTable />
              <SearchTable />
            </div>
            <div>
              <Link to='/'>
                <Button
                  title='Add Employee'
                  className='text-sm bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-900 rounded-md duration-200 ease-out hover:scale-105'
                />
              </Link>
            </div>
          </div>
          <ShowResults />

          <div className='pt-4 overflow-x-auto'>
            <div className='inline-block bg-white min-w-full rounded-lg overflow-hidden'>
              <Table columns={COLUMNS_TABLE} />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
