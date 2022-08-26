import { Routes, Route } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import CreateEmployee from './pages/CreateEmployee'
import { EmployeeProvider } from './utils/context/employee'
import { FormProvider } from './utils/context/form'
import { FORM_DEFAULT_VALUES } from './utils/data'

function App() {
  return (
    <div>
      <EmployeeProvider>
        <FormProvider initialValues={FORM_DEFAULT_VALUES}>
          <Routes>
            <Route path='/' element={<CreateEmployee />} />
            <Route path='/employee-list' element={<EmployeeList />} />
          </Routes>
        </FormProvider>
      </EmployeeProvider>
    </div>
  )
}

export default App
