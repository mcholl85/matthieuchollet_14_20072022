import { filteredEmployeesBySortAndOrder } from './table';
import { MOCK_EMPLOYEES } from '../utils/mock/'

describe('filteredEmployeesBySortAndOrder', () => {
  describe('sort by firstName', () => {
    test('and order by asc', () => {
      const sorted = filteredEmployeesBySortAndOrder(MOCK_EMPLOYEES, 'firstName', 'asc')
      expect((MOCK_EMPLOYEES.sort((a,b) => a['firstName'].localeCompare(b['firstName'])))).toEqual(sorted)
    }),
    test('and order by desc', () => {
      const sorted = filteredEmployeesBySortAndOrder(MOCK_EMPLOYEES, 'firstName', 'desc')
      expect((MOCK_EMPLOYEES.sort((a,b) => -1 * a['firstName'].localeCompare(b['firstName'])))).toEqual(sorted)
    })
  })
})
