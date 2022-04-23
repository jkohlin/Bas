import React, {createContext, useState, useEffect} from 'react'
import {getBas} from './src/Api'
import App from './App'
import {storage} from './src/Storage'
storage.clearAll()

export const DataContext = createContext()

const DataProvider = () => {
  const [bas, setBas] = useState({loaded: false, data: {}, status: 'initial'})

  useEffect(() => {
    // setBas({loaded: false, data: []})
    getBas(setBas)
  }, [])

  return (
    <DataContext.Provider value={bas}>
      <App />
    </DataContext.Provider>
  )
}
export default DataProvider
