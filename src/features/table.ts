import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeState } from '../utils/context/employee';
import { entriesOptionsIsValid, orderOptionsIsValid, sortOptionsIsValid, updateURL } from '../utils/employeeList'
import { filteredEmployeesByEntriesAndPage, filteredEmployeesBySortAndOrder, getFilteredEmployeesBySearch } from '../utils/table';

export interface ParamsState {
  entries?: number,
  page?: number,
  search?: string, 
  sort?: string, 
  order?:string
}

interface StateTable {
  employees: EmployeeState[],
  filteredEmployees?: EmployeeState[],
  params: ParamsState,
  count?: number,
  totalCount?: number,
  totalPage?: number,
}

interface ActionLoad {
  employees: EmployeeState[],
  params: {
      [key:string]: string
    },
}

const initialState = {
  employees: [] as EmployeeState[],
  filteredEmployees: [] as EmployeeState[],
  params: { entries: 10, page: 1, search: '', sort: 'firstName', order: 'asc' },
  count: 0,
  totalCount: 0,
  totalPage: 0
}

const { actions, reducer } = createSlice({
  name: 'table',
  initialState,
  reducers: {
    loadTable: (draft: StateTable, action: PayloadAction<ActionLoad>) => {
      const employees = action.payload.employees
      const params = action.payload.params
      let filteredEmployees = [... employees] 
      let { sort, search, order } = params
      let entries = parseInt(params.entries)
      let page = parseInt(params.page)

      if(!sortOptionsIsValid(sort)){ 
        sort = initialState.params.sort
      }
      if(!order || !orderOptionsIsValid(order)) {
        order = initialState.params.order
      }
      if(!entries || !entriesOptionsIsValid(entries)) {
        entries = initialState.params.entries
      }
      if (!search) {
        search = initialState.params.search
        filteredEmployees = [...employees]
      } else {
        filteredEmployees = getFilteredEmployeesBySearch(search, employees)
      }

      const totalCount = filteredEmployees.length
      const totalPage = totalCount === 0 ? 1 : Math.ceil(totalCount / entries)

      if (!page || !(page > 0 && page <= totalPage)) {
        page = initialState.params.page  
      }
      filteredEmployees = filteredEmployeesBySortAndOrder(filteredEmployees, sort, order)
      filteredEmployees = filteredEmployeesByEntriesAndPage(filteredEmployees, entries, page)

      draft.count = filteredEmployees.length
      draft.totalCount = totalCount
      draft.totalPage = totalPage
      draft.params = { entries, sort, page, search, order }
      draft.employees = employees
      draft.filteredEmployees = filteredEmployees
      
      updateURL(draft.params)

      return 
    },
    setEntries: (draft, action: PayloadAction<ParamsState>) => {
      let entries = action.payload.entries
      let page = draft.params.page
      let filteredEmployees = [...draft.employees]

      if(!entries || !entriesOptionsIsValid(entries)) {
        entries = initialState.params.entries
      } 
      
      const totalPage = draft.totalCount === 0 ? 1 : Math.ceil(draft.totalCount/ entries)
      
      if (draft.params.search !== '') {
        filteredEmployees = getFilteredEmployeesBySearch(draft.params.search, filteredEmployees)
      }
      if (!(draft.params.page > 0 && draft.params.page <= totalPage)) {
        page = initialState.params.page  
      }
      filteredEmployees = filteredEmployeesBySortAndOrder(filteredEmployees, draft.params.sort, draft.params.order)
      filteredEmployees = filteredEmployeesByEntriesAndPage(filteredEmployees, entries, page)

      draft.count = filteredEmployees.length
      draft.totalPage = totalPage
      draft.params.entries = entries
      draft.params.page = page
      draft.filteredEmployees = filteredEmployees

      updateURL({...draft.params})
      
      return
    },
    setSortAndOrder: (draft, action: PayloadAction<ParamsState>) => {
      let { sort, order } = action.payload
      let filteredEmployees = [...draft.employees]
      const { entries } = draft.params

      if(!sort || !sortOptionsIsValid(sort)){ 
        sort = initialState.params.sort
      }
      if(!order || !orderOptionsIsValid(order)) {
        order = initialState.params.order
      }
      if (draft.params.search !== '') {
        filteredEmployees = getFilteredEmployeesBySearch(draft.params.search, filteredEmployees)
      }
      filteredEmployees = filteredEmployeesBySortAndOrder(filteredEmployees, sort, order)
      filteredEmployees = filteredEmployeesByEntriesAndPage(filteredEmployees, entries, draft.params.page)

      draft.filteredEmployees = filteredEmployees
      draft.params.sort = sort
      draft.params.order = order

      updateURL(draft.params)

      return
    },
    search: (draft, action: PayloadAction<ParamsState>) => {
      let search = action.payload.search
      let filteredEmployees = [...draft.employees]
      let { page } = draft.params
      const { sort, order, entries } = draft.params

      if (!search) {
        search = initialState.params.search
      } else {
        filteredEmployees = getFilteredEmployeesBySearch(search, filteredEmployees)
      }

      const totalCount = filteredEmployees.length
      const totalPage = totalCount === 0 ? 1 : Math.ceil(totalCount / entries)

      if (!(page > 0 && (page) <= totalPage)) {
        page = initialState.params.page  
      }
      filteredEmployees = filteredEmployeesBySortAndOrder(filteredEmployees, sort, order)
      filteredEmployees = filteredEmployeesByEntriesAndPage(filteredEmployees, entries, page)

      draft.count = filteredEmployees.length
      draft.totalCount = totalCount
      draft.totalPage = totalPage
      draft.params.search = search
      draft.filteredEmployees = filteredEmployees
      
      updateURL({ entries, sort, page, search, order })

      return
    },
    setPage: (draft, action: PayloadAction<ParamsState>) => {
      const page = action.payload.page
      let filteredEmployees = [...draft.employees]

      if (!page || !(page > 0 && page <= draft.totalPage)) {
        return
      }
      if (draft.params.search !== '') {
        filteredEmployees = getFilteredEmployeesBySearch(draft.params.search, filteredEmployees)
      }
      filteredEmployees = filteredEmployeesBySortAndOrder(filteredEmployees, draft.params.sort, draft.params.order)
      filteredEmployees = filteredEmployeesByEntriesAndPage(filteredEmployees, draft.params.entries, page)

      draft.count = filteredEmployees.length
      draft.filteredEmployees = filteredEmployees
      draft.params.page = page

      updateURL(draft.params)

      return
    },
  }
})

export const {loadTable, setEntries, setPage, setSortAndOrder, search} = actions

export default reducer