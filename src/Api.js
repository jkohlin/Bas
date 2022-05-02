import bas2022 from './bas2022.json'
import {storage} from './Storage'

export const getBas = async setBas => {
  const basCache = storage.getString('bas')
  // TODO: varför läses inte Api.js in med storage med key:bas?
  console.log('(typeof basCache', typeof basCache)
  if (typeof basCache !== 'undefined') {
    setBas({loaded: true, data: JSON.parse(basCache), status: 'cached'})
    return true
  }
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
      // TODO: Check if user has paid for BAS 2023
      const isCurrent = json.ChartVersion.Name.includes('2022')
      storage.set('bas', JSON.stringify(json))
      if (isCurrent) {
        setBas({loaded: true, data: json, status: 'live'})
      } else {
        setBas({loaded: true, data: bas2022, status: 'file'})
      }
      return true
    } else {
      setBas({loaded: true, data: bas2022, status: 'file'})
      return true
    }
  } catch (error) {
    setBas({loaded: false, data: error, status: 'error'})
    return false
  }
}
