import React, {createContext, useEffect, useReducer} from 'react'
import {getBas} from './src/Api'
import App from './App'
export const DataContext = createContext()
const basReducer = (state, action) => {
  const {type, payload} = action
  const {data, version} = payload
  switch (type) {
    case 'SET_BAS_LIVE':
      return {
        ...state,
        loaded: true,
        data,
        status: 'live',
        version,
      }
    case 'SET_BAS_CACHE':
      return {
        ...state,
        loaded: true,
        data,
        status: 'cache',
        version,
      }
    case 'SET_BAS_FILE':
      return {
        ...state,
        loaded: true,
        data,
        status: 'file',
        version,
      }
    case 'SET_BAS_ERROR':
      return {
        ...state,
        loaded: false,
        data: {},
        status: 'error',
        version,
      }
    case 'SET_BAS_VERSION':
      return {
        ...state,
        version,
      }
    default:
      return state
  }
}

const DataProvider = () => {
  const [bas, setBas] = useReducer(basReducer, {
    loaded: false,
    data: {Accounts: []},
    status: 'initial',
    version: '',
  })

  useEffect(() => {
    getBas(setBas)
  }, [])

  return (
    <DataContext.Provider value={bas}>
      <App />
    </DataContext.Provider>
  )
}

export default DataProvider
