/**
 * För att starta:
 npx react-native start
 npx react-native run-ios
 * Om man behöver installera fler dependencies, kör pod install på detta sätt: (blir fel i iTerm annars)
 cd ios
 arch -x86_64 pod install
 * För att döda en process som redan kör port 8081
 sudo lsof -i :8081
 kill -9 <PID>
  reactjs.org/link/setstate-in-render
 * vanliga fel: https://reactnative.dev/docs/troubleshooting
  //TODO: install  and use react-native-purchases from revenueCat
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native'

import {DataContext} from './DataProvider'
import Input from './src/Components/Input'
import List from './src/Components/List'

const App = () => {
  const bas = useContext(DataContext)
  const backgroundStyle = {
    backgroundColor: '#262d30',
    color: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    display: 'flex',
  }
  const [text, setText] = useState(null)
  const [data, setData] = useState([])
  const escapeRegex = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed && bas.loaded) {
      const accounts = bas.data?.Accounts || []
      let filteredAccounts = accounts.filter(account => {
        if (isNaN(text)) {
          return (
            account.SwedishName.search(new RegExp(escapeRegex(text), 'i')) >
              -1 && account.AccountNumber.length !== 3
          )
        }
        return text
          ? account.AccountNumber.startsWith(text) &&
              account.AccountNumber.length !== 3
          : true
      })
      setData(filteredAccounts)
    } else if (text === '') {
      setData([])
    }
    return () => (isSubscribed = false)
  }, [text, bas.loaded, bas.data, bas.status])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('./src/img/logo.png')} />
        <Input text={text} setText={setText} />
      </View>
      <View style={styles.results}>
        <List basData={data} />
        {/* {bas.loaded && (text === null || text === '') && (
          <Text style={styles.version}>{bas?.version || ''}</Text>
        )} */}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  logo: {height: 60, resizeMode: 'contain'},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 10,
    flex: 0,
  },
  results: {
    display: 'flex',
    flex: 1,
  },
  version: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
})

export default App
