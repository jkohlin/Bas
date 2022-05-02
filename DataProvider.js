import React, {createContext, useState, useEffect} from 'react'
import {getBas} from './src/Api'
import {Platform} from 'react-native'
import Purchases from 'react-native-purchases'
import App from './App'
import {storage} from './src/Storage'

storage.clearAll() // varför?
const getOffering = async () => {
  try {
    const offerings = await Purchases.getOfferings()
    //console.log('offerings', JSON.stringify(offerings.current))
    if (offerings.current !== null) {
      console.log(
        'offerings.current.identifier: ',
        offerings.current.identifier,
      )
      const currentOffering = offerings.current.identifier
      const [currentPackage] = offerings.current.availablePackages.filter(
        paket => paket.offeringIdentifier === currentOffering,
      )
      // showPaywall(product) // hitta på den dialogen
      makePurchase(currentPackage)
    }
  } catch (e) {}
}
const userInfo = async () => {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo()
    console.log('purchaserInfo', purchaserInfo)
    // access latest purchaserInfo
  } catch (e) {
    // Error fetching purchaser info
  }
}
const makePurchase = async paket => {
  // TODO: Skapa olika useState för userInfo, paket, Offering etc. Genomför inget köp om  {entitlements} = await Purchases.getPurchaserInfo();  if !entitlements.active makePurchase(paket)

    const {purchaserInfo, productIdentifier} = await Purchases.purchasePackage(
      paket,
    )
    console.log('purchaserInfo', purchaserInfo)
    // productIdentifier se.lejman.baskontoplan.2022
    if (typeof purchaserInfo.entitlements.active !== 'undefined') {
      // Unlock that great "pro" content
    }
  } catch (e) {
    if (!e.userCancelled) {
      console.error(e)
    }
  }
}
export const DataContext = createContext()

const DataProvider = () => {
  const [bas, setBas] = useState({loaded: false, data: {}, status: 'initial'})

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true)
    if (Platform.OS === 'ios') {
      Purchases.setup('appl_OgTDyeLXvAnsQpPNePVzNCPFJBL') // appl_OgTDyeLXvAnsQpPNePVzNCPFJBL - Public API-key
    } else if (Platform.OS === 'android') {
      Purchases.setup('public_google_sdk_key')
    }
    getOffering()
    userInfo()
  })

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
