import { EmployeeState } from './context/employee'

export const filteredEmployeesBySortAndOrder = (employees: EmployeeState[], sort: string, order: string) => {
  if(order === 'asc') {
    return [...employees].sort((a,b) => a[sort].localeCompare(b[sort])) 
  } else {
    return [...employees].sort((a,b) => -1 * a[sort].localeCompare(b[sort])) 
  }
}

export const filteredEmployeesByEntriesAndPage = (employees: EmployeeState[], entries: number, currentPage: number) => {
  return [...employees].filter((_obj, index) => index <= currentPage * entries - 1 && index >= (currentPage -1) * entries)
}

const filteredEmployeesBySearch = (employees: EmployeeState[], search: string) => {
  return [...employees].filter((obj) => Object.values(obj).some((value) => value?.toLowerCase().includes(search?.toLowerCase())))
}

export const getFilteredEmployeesBySearch = (search: string, employees: EmployeeState[]) => {
  let filteredEmployees = [... employees]

  if(search && search !== '') {
    filteredEmployees = filteredEmployeesBySearch(filteredEmployees, search)
  }

  return filteredEmployees
}

export const getRangeOfPages = (currentPage: number, lastPage: number, delta: number) => {
  const range = []

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(lastPage - 1, currentPage + delta);
    i += 1
  ) {
    range.push(i)
  }

  if (currentPage - delta > 2) range.unshift('...')
  if (currentPage + delta < lastPage - 1) range.push('...')
  range.unshift(1)
  if (lastPage !== 1) range.push(lastPage)

  return range
}