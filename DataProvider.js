import React, {createContext, useState, useEffect, useReducer} from 'react'
import {getBas, getData} from './src/Api'
import {Platform} from 'react-native'
import App from './App'
import {storage} from './src/Storage'
import Purchases, {
  getOffering,
  getUserInfo,
  makePurchase,
  restorePurchase,
} from './src/Utils/inAppPurchase'
export const DataContext = createContext()

const basReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BAS':
      return {
        ...state,
        loaded: true,
        data: action.payload,
        status: 'success',
      }
    case 'SET_BAS_ERROR':
      return {
        ...state,
        loaded: true,
        data: {},
        status: 'error',
      }
    case 'SET_BAS_VERSION':
      return {
        ...state,
        version: action.payload,
      }
    default:
      return state
  }
}
/**
 * TODO:
 * 1. Version check:
 * 2. Get current year from Date()
 * 3. Get current version from BAS
 * 4. Get version purchased from AppStore
 * 5. if initial purchase is current -> Use current BAS API, else:
 *  5a. getUserInfo() -> if latest purchased version is current (check, then store productIdentifier in Storage ), use current BAS API, else:
 *  5b. if no purchases || old version (store productIdentifier in Storage ) ->  show restorePurchase() -> if restored is current, use current BAS API, else:
 *  5c. if nothing to restore || if restored is older (store productIdentifier in Storage ) -> getOffering() -> if yes, use current BAS API, else:
 *  5d. Show BAS from JSON file corresponding to productIdentifier in Storage
 * 6. Implementera bas-reducer
 * 7. If error retreiving BAS, show error and show most suitable BAS from JSON file corresponding to productIdentifier in Storage
 */
const resolveUserBas = async setEntitlements => {
  // Get current year from Date()
  const currentYear = new Date().getFullYear()
  // Get current version from BAS {loaded: false, data: {}, status: 'syntax error/errorObj, ', version: 'BAS 2022 ver 1.0'}
  const basInfo = await getData(true)
  if (basInfo.status === 'success') {
    noData=false
  }
}

const DataProvider = () => {
  const [entitlements, setEntitlements] = useState(null)
  // Get information about user and set correct BAS
  resolveUserBas(setEntitlements)

  const [bas, dispatch] = useReducer(basReducer, {
    // initial state:
    loaded: false,
    data: {},
    status: 'initial',
    version: '',
  })
  // kanske borde använda en useReducer istället, https://daveceddia.com/usereducer-hook-examples/

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true)
    if (Platform.OS === 'ios') {
      const theSetup = Purchases.setup('appl_OgTDyeLXvAnsQpPNePVzNCPFJBL') // appl_OgTDyeLXvAnsQpPNePVzNCPFJBL - Public API-key
      console.log('theSetup', theSetup)
    } else if (Platform.OS === 'android') {
      Purchases.setup('public_google_sdk_key')
    }
    getOffering()
    getUserInfo()
  })

  // useEffect(() => {
  //   // setBas({loaded: false, data: {}, status: 'initial', version: ''})
  //   //getBas(setBas)
  //   //throw new Error('reducer Not implemented')
  //   //getBas(dispatch)
  // }, [])

  return (
    <DataContext.Provider value={bas}>
      <App />
    </DataContext.Provider>
  )
}
export default DataProvider
