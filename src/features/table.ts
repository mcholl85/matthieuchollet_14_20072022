import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeState } from '../utils/context/employee';
import { entriesOptionsIsValid, orderOptionsIsValid, sortOptionsIsValid, updateURL } from '../utils/employeeList'
import { filteredEmployeesBySortAndOrder, getFilteredEmployeesBySearch } from '../utils/table';

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
  totalCount: 0,
  totalPage: 0
}

const { actions, reducer } = createSlice({
  name: 'table',
  initialState,
  reducers: {
    loadTable: (draft: StateTable, action: PayloadAction<ActionLoad>) => {
      const params = action.payload.params
      let { sort, search, order } = params
      let entries = parseInt(params.entries)
      let page = parseInt(params.page)

      draft.employees = [...action.payload.employees]
      draft.filteredEmployees = [...action.payload.employees]

      if(!sortOptionsIsValid(sort)){ 
        sort = initialState.params.sort
      }

      if(!order || !orderOptionsIsValid(order)) {
        order = initialState.params.order
      }

      if(!entries || !entriesOptionsIsValid(entries)) {
        entries = initialState.params.entries
      }

      if (search) {
        search = action.payload.params.search
        draft.filteredEmployees = getFilteredEmployeesBySearch(search, draft.employees)
      } else {
        search = initialState.params.search
      }
      draft.filteredEmployees = filteredEmployeesBySortAndOrder(draft.filteredEmployees, sort, order)

      draft.totalCount = draft.filteredEmployees.length
      draft.totalPage = draft.totalCount === 0 ? 1 : Math.ceil(draft.totalCount / entries)

      if (!page || !(page > 0 && page <= draft.totalPage)) {
        page = initialState.params.page  
      }
      
      draft.params = { entries, sort, page, search, order }
      
      updateURL(draft.params)

      return 
    },
    setEntries: (draft, action: PayloadAction<ParamsState>) => {
      if(!action.payload.entries || !entriesOptionsIsValid(action.payload.entries)) {
        draft.params.entries = initialState.params.entries
      } else {
        draft.params.entries = action.payload.entries
      }

      draft.totalPage = draft.totalCount === 0 ? 1 : Math.ceil(draft.totalCount/ draft.params.entries)

      if (!(draft.params.page > 0 && draft.params.page <= draft.totalPage)) {
        draft.params.page = initialState.params.page  
      }
      
      updateURL({...draft.params})
      
      return
    },
    setSortAndOrder: (draft, action: PayloadAction<ParamsState>) => {
      if(!action.payload.sort || !sortOptionsIsValid(action.payload.sort)){ 
        draft.params.sort = initialState.params.sort
      } else {
        draft.params.sort = action.payload.sort
      }
      if(!action.payload.order || !orderOptionsIsValid(action.payload.order)) {
        draft.params.order = initialState.params.order
      } else {
        draft.params.order = action.payload.order
      }

      draft.filteredEmployees = filteredEmployeesBySortAndOrder(draft.filteredEmployees, draft.params.sort, draft.params.order)

      updateURL(draft.params)

      return
    },
    search: (draft, action: PayloadAction<ParamsState>) => {
      if (action.payload.search) {
        draft.params.search = action.payload.search
        draft.filteredEmployees = getFilteredEmployeesBySearch(draft.params.search, draft.employees)
        draft.filteredEmployees = filteredEmployeesBySortAndOrder(draft.filteredEmployees, draft.params.sort, draft.params.order)
      } else {
        draft.params.search = initialState.params.search
        draft.filteredEmployees = draft.employees
      }

      draft.totalCount = draft.filteredEmployees.length
      draft.totalPage = draft.totalCount === 0 ? 1 : Math.ceil(draft.totalCount / draft.params.entries)

      updateURL(draft.params)

      return
    },
    setPage: (draft, action: PayloadAction<ParamsState>) => {
      const page = action.payload.page

      if (!page || !(page > 0 && page <= draft.totalPage)) {
        return
      }

      draft.params.page = page
      updateURL(draft.params)

      return
    },
  }
})

export const {loadTable, setEntries, setPage, setSortAndOrder, search} = actions

export default reducer