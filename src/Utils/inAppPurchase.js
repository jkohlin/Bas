import Purchases from 'react-native-purchases'
export default Purchases

const getUserInfo = async () => {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo()
    console.log('purchaserInfo', purchaserInfo)
    // access latest purchaserInfo
  } catch (e) {
    // Error fetching purchaser info
  }
}
const getOffering = async () => {
  try {
    const offerings = await Purchases.getOfferings()
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
      //then -> makePurchase(currentPackage)
    }
  } catch (e) {}
}
const makePurchase = async paket => {
  // TODO: Skapa olika useState för getUserInfo, paket, Offering etc. Genomför inget köp om  {entitlements} = await Purchases.getPurchaserInfo();  if !entitlements.active makePurchase(paket)

  try {
    const {purchaserInfo, productIdentifier} = await Purchases.purchasePackage(
      paket,
    )
    console.log('purchaserInfo', purchaserInfo)
    console.log('productIdentifier', productIdentifier)
    // productIdentifier se.lejman.baskontoplan.2022
    if (typeof purchaserInfo.entitlements.active !== 'undefined') {
      //storage.set('inAppPurchase', productIdentifier)
      // TODO: Unlock that great "pro" content
    }
  } catch (e) {
    if (!e.userCancelled) {
      console.error(e)
    }
  }
}
const restorePurchase = async () => {
  try {
    //const productIdentifier = await storage.get('inAppPurchase') // kanske?
    // TODO: show Alert to ask if user wants to restore purchase
    const WasThereAnythingToRestore = await Purchases.restoreTransactions()
    // TODO: some more logic och stuff
    // TODO: return something
  } catch (e) {
    console.error(e)
  }
}
export {getOffering, getUserInfo, makePurchase, restorePurchase}
