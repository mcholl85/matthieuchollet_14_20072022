import { EmployeeState } from './context/employee'
import { ErrorsType, ValidationsType } from './context/form'
import { COLUMNS_TABLE } from './data'

export const getErrorFromChange = (key: string, value: string, validations: ValidationsType): ErrorsType => {
  const validation = validations[key]
  const pattern = validation?.pattern
  const custom = validation?.custom

  if (validation?.required?.value && !value) {
    return {[key]: validation.required.message }
  } else if (pattern?.regExp && !RegExp(pattern.regExp).test(value)) {
    return {[key]: pattern.message }
  } else if (custom?.isValid && !custom.isValid(value)) {
    return {[key]: custom.message }
  } else {
    return {}
  }
}

export const getErrorsFromSubmit = (form: EmployeeState, validations?: ValidationsType): {[key: string]: string} => {
  let newErrors: { [key: string]: string } = {}

  if (validations) {
    for (const key in validations) {
      const error = getErrorFromChange(key, form[key], validations)
      if(Object.keys(error).length !== 0) {
        newErrors = {...newErrors, ...error}
      }
    }
  }

  return newErrors
}

export const objectIsEmpty = (obj: Record<string, unknown>):boolean => {
  if (Object.keys(obj).length === 0) return true
  return false
}

export const getColumnByData = (value: string) => {
  return COLUMNS_TABLE.find((column:{[key:string]: string}) => column['data'] === value)
}