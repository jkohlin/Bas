import {Alert} from 'react-native'

const BuyAlert = setBuyIntent =>
  Alert.alert(
    'Uppgradera databasen',
    'Det har kommit en ny version av BAS. Vill du köpa uppdateringen?',
    [
      {
        text: 'Fråga mig senare',
        onPress: () => setBuyIntent('LATER'),
      },
      {
        text: 'Nej',
        onPress: () => setBuyIntent('NOUPGRADE'),
        style: 'cancel',
      },
      {text: 'Ja', onPress: () => setBuyIntent('BUY')},
    ],
  )

export default BuyAlert
