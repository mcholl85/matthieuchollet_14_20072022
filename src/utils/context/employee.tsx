import { createContext, useState, PropsWithChildren } from 'react'

export interface EmployeeState {
  [key: string]: string
  firstName: string
  lastName: string
  dateOfBirth: string
  startDate: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
}

export interface ContextEmployeeType {
  employees: Array<EmployeeState>
  saveEmployees: (value: EmployeeState) => void
}

export const EmployeeContext = createContext({} as ContextEmployeeType)

export const EmployeeProvider = ({ children }: PropsWithChildren) => {
  const [employees, setEmployees] = useState([] as Array<EmployeeState>)
  const saveEmployees = (newEmployee: EmployeeState) => {
    setEmployees([...employees, newEmployee])
  }

  return (
    <EmployeeContext.Provider value={{ employees, saveEmployees }}>
      {children}
    </EmployeeContext.Provider>
  )
}
