/**
 * @format
 */

import {AppRegistry} from 'react-native'
import DataProvider from './DataProvider'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => DataProvider)
