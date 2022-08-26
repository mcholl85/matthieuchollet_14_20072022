import React, { createContext, useState } from 'react'
import { FORM_DEFAULT_VALUES } from '../data'
import { EmployeeState } from './employee'

export type ErrorsType = {
  [key: string]: string
}

export interface ContextFormType {
  form: EmployeeState
  setForm: (form: EmployeeState) => void
  errors: ErrorsType
  setErrors: (errors: ErrorsType) => void
  setNewForm: () => void
}

export type ValidationsType = {
  [key: string]: {
    pattern?: {
      message: string
      regExp: string
    }
    custom?: {
      isValid: (date: string) => boolean
      message: string
    }
    required?: {
      value: boolean
      message: string
    }
  }
}

export const FormContext = createContext({} as ContextFormType)

interface FormProviderProps {
  children: React.ReactNode
  initialValues: EmployeeState
  validations?: ValidationsType
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const setNewForm = () => {
    setForm(FORM_DEFAULT_VALUES)
  }

  return (
    <FormContext.Provider value={{ form, setForm, errors, setErrors, setNewForm }}>
      {children}
    </FormContext.Provider>
  )
}
