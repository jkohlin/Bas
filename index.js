/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native'
import DataProvider from './DataProvider'
import {name as appName} from './app.json'

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."])

AppRegistry.registerComponent(appName, () => DataProvider)
