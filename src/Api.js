import bas2022 from './bas2022.json'
import {storage} from './Storage'

export const getBas = async setBas => {
  const basCache = storage.getString('bas')
  // TODO: kontrollera att basCache sparats i storage
  console.log('API.js: basCache', typeof basCache)
  if (typeof basCache !== 'undefined') {
    // TODO: kolla så att man inte just köpt en ny version
    // TODO: useReducer istället: setBas({type: 'SET_BAS', payload: JSON.parse(basCache)}) Räcker detta eller?
    setBas({loaded: true, data: JSON.parse(basCache), status: 'cached'})
    return true
  }
  const response = await getData() // {loaded: true, data: json, status: 'success', version: json.ChartVersion.Name}

  if (response.loaded) {
    // DET ÄR HÄR JAG ÄR NU! SKALL LOGIKEN VARA HÄR ELLER NÅGON ANNANSTANS FÖR ATT KOLLA VILKEN VERSION MAN HAR RÄTT TILL?
    // TODO: Check if user has paid for BAS 2023 in a more accurate way
    const isCurrent = response.version.includes('2022')
    storage.set('bas', JSON.stringify(response))
    if (isCurrent) {
      setBas({loaded: true, data: response, status: 'live'})
    } else {
      setBas({loaded: true, data: bas2022, status: 'file'})
    }
    return true
  } else {
    setBas({loaded: true, data: bas2022, status: 'file'})
    return true
  }
  // else
  setBas({loaded: false, data: error, status: 'error'})
  return false
}
/**
 * @typedef {object} BasInfo
 * @property {boolean} loaded - true if BAS is loaded
 * @property {object} data - The entire BAS API object
 * @property {string} status - "syntax error" / "errorObj" / "success"
 */
/**
 * Returns BAS and information about current BAS.
 *
 * @param {boolean} noData If true, don't return bas data
 * @return {BasInfo}
 */
export const getData = async (noData = false) => {
  const url = 'https://api.bas.se/v1/accounts/?organizationType=ALL'
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    if (response.ok) {
      const json = await response.json()
      return noData
        ? {
            loaded: true,
            data: {},
            status: 'success',
            version: json.ChartVersion.Name,
          }
        : {
            loaded: true,
            data: json,
            status: 'success',
            version: json.ChartVersion.Name,
          }
    } else {
      return {loaded: false, data: {}, status: 'syntax error', version: ''}
    }
  } catch (error) {
    return {loaded: false, data: error, status: 'connection error', version: ''}
  }
}
