export const STATES = [
  {
      'name': 'Alabama',
      'abbreviation': 'AL'
  },
  {
      'name': 'Alaska',
      'abbreviation': 'AK'
  },
  {
      'name': 'American Samoa',
      'abbreviation': 'AS'
  },
  {
      'name': 'Arizona',
      'abbreviation': 'AZ'
  },
  {
      'name': 'Arkansas',
      'abbreviation': 'AR'
  },
  {
      'name': 'California',
      'abbreviation': 'CA'
  },
  {
      'name': 'Colorado',
      'abbreviation': 'CO'
  },
  {
      'name': 'Connecticut',
      'abbreviation': 'CT'
  },
  {
      'name': 'Delaware',
      'abbreviation': 'DE'
  },
  {
      'name': 'District Of Columbia',
      'abbreviation': 'DC'
  },
  {
      'name': 'Federated States Of Micronesia',
      'abbreviation': 'FM'
  },
  {
      'name': 'Florida',
      'abbreviation': 'FL'
  },
  {
      'name': 'Georgia',
      'abbreviation': 'GA'
  },
  {
      'name': 'Guam',
      'abbreviation': 'GU'
  },
  {
      'name': 'Hawaii',
      'abbreviation': 'HI'
  },
  {
      'name': 'Idaho',
      'abbreviation': 'ID'
  },
  {
      'name': 'Illinois',
      'abbreviation': 'IL'
  },
  {
      'name': 'Indiana',
      'abbreviation': 'IN'
  },
  {
      'name': 'Iowa',
      'abbreviation': 'IA'
  },
  {
      'name': 'Kansas',
      'abbreviation': 'KS'
  },
  {
      'name': 'Kentucky',
      'abbreviation': 'KY'
  },
  {
      'name': 'Louisiana',
      'abbreviation': 'LA'
  },
  {
      'name': 'Maine',
      'abbreviation': 'ME'
  },
  {
      'name': 'Marshall Islands',
      'abbreviation': 'MH'
  },
  {
      'name': 'Maryland',
      'abbreviation': 'MD'
  },
  {
      'name': 'Massachusetts',
      'abbreviation': 'MA'
  },
  {
      'name': 'Michigan',
      'abbreviation': 'MI'
  },
  {
      'name': 'Minnesota',
      'abbreviation': 'MN'
  },
  {
      'name': 'Mississippi',
      'abbreviation': 'MS'
  },
  {
      'name': 'Missouri',
      'abbreviation': 'MO'
  },
  {
      'name': 'Montana',
      'abbreviation': 'MT'
  },
  {
      'name': 'Nebraska',
      'abbreviation': 'NE'
  },
  {
      'name': 'Nevada',
      'abbreviation': 'NV'
  },
  {
      'name': 'New Hampshire',
      'abbreviation': 'NH'
  },
  {
      'name': 'New Jersey',
      'abbreviation': 'NJ'
  },
  {
      'name': 'New Mexico',
      'abbreviation': 'NM'
  },
  {
      'name': 'New York',
      'abbreviation': 'NY'
  },
  {
      'name': 'North Carolina',
      'abbreviation': 'NC'
  },
  {
      'name': 'North Dakota',
      'abbreviation': 'ND'
  },
  {
      'name': 'Northern Mariana Islands',
      'abbreviation': 'MP'
  },
  {
      'name': 'Ohio',
      'abbreviation': 'OH'
  },
  {
      'name': 'Oklahoma',
      'abbreviation': 'OK'
  },
  {
      'name': 'Oregon',
      'abbreviation': 'OR'
  },
  {
      'name': 'Palau',
      'abbreviation': 'PW'
  },
  {
      'name': 'Pennsylvania',
      'abbreviation': 'PA'
  },
  {
      'name': 'Puerto Rico',
      'abbreviation': 'PR'
  },
  {
      'name': 'Rhode Island',
      'abbreviation': 'RI'
  },
  {
      'name': 'South Carolina',
      'abbreviation': 'SC'
  },
  {
      'name': 'South Dakota',
      'abbreviation': 'SD'
  },
  {
      'name': 'Tennessee',
      'abbreviation': 'TN'
  },
  {
      'name': 'Texas',
      'abbreviation': 'TX'
  },
  {
      'name': 'Utah',
      'abbreviation': 'UT'
  },
  {
      'name': 'Vermont',
      'abbreviation': 'VT'
  },
  {
      'name': 'Virgin Islands',
      'abbreviation': 'VI'
  },
  {
      'name': 'Virginia',
      'abbreviation': 'VA'
  },
  {
      'name': 'Washington',
      'abbreviation': 'WA'
  },
  {
      'name': 'West Virginia',
      'abbreviation': 'WV'
  },
  {
      'name': 'Wisconsin',
      'abbreviation': 'WI'
  },
  {
      'name': 'Wyoming',
      'abbreviation': 'WY'
  }
];

export const FORM_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  startDate: '',
  department: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
}

export const VALIDATIONS = {
  firstName: {
    pattern: {
      regExp: '^[A-Za-zà-üÀ-Ü- ]{1,}$',
      message: 'Enter a valid firstname',
    },
  },
  lastName: {
    pattern: {
      regExp: '^[A-Za-zà-üÀ-Ü- ]{1,}$',
      message: 'Enter a valid lastname',
    },
  },
  startDate: {
    custom: {
      isValid: (date: string) => Date.now() - new Date(date).getTime() > 0,
      message: 'Choose a date before today',
    },
  },
  department: {
    required: {
      value: true,
      message: 'The field is required',
    },
  },
  dateOfBirth: {
    custom: {
      isValid: (date: string) =>
        new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970 >= 18,
      message: 'The employee have to be at least 18 years old',
    },
  },
  street: {
    pattern: {
      regExp: '^[0-9A-Za-zà-üÀ-Ü- ]{1,}$',
      message: 'Enter a valid street',
    },
  },
  city: {
    pattern: {
      regExp: '^[A-Za-zà-üÀ-Ü- ]{1,}$',
      message: 'Enter a valid city',
    },
  },
  state: {
    required: {
      value: true,
      message: 'The field is required',
    },
  },
  zipCode: {
    custom: {
      isValid: (value: string) => !isNaN(parseInt(value)),
      message: 'The field must be a number',
    },
  },
}

  export const ENTRIES_OPTIONS = [
    { id: 0, value: 10 },
    { id: 1, value: 25 },
    { id: 2, value: 50 },
    { id: 3, value: 100 },
  ]

export const COLUMNS_TABLE = [
  { title: 'First Name', data: 'firstName', type: 'string' },
  { title: 'Last Name', data: 'lastName', type: 'string' },
  { title: 'Start Date', data: 'startDate', type: 'date' },
  { title: 'Department', data: 'department', type: 'string' },
  { title: 'Date of Birth', data: 'dateOfBirth', type: 'date' },
  { title: 'Street', data: 'street', type: 'string'  },
  { title: 'City', data: 'city', type: 'string'  },
  { title: 'State', data: 'state', type: 'string'  },
  { title: 'Zip Code', data: 'zipCode', type: 'string'  },
]

export const SORT_LIST = [
  'firstName',
  'lastName',
  'startDate',
  'department',
  'dateOfBirth',
  'street',
  'city',
  'state',
  'zipCode',
]

export const ORDER_LIST = ['asc', 'desc']

export const DEPARTMENT_OPTIONS = [
  { id: 0, value: 'Sales' },
  { id: 1, value: 'Marketing' },
  { id: 2, value: 'Engineering' },
  { id: 3, value: 'Human Resources' },
  { id: 4, value: 'Legal' },
]

export const STATES_OPTIONS = STATES.map((state, index) => {
  return { id: index, value: state.name }
})