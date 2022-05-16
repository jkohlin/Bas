import bas2022 from './bas2022.json'
import {storage} from './Storage'
export const getBas = async setBas => {
  const basCache = storage.getString('bas')
  // TODO: kontrollera att basCache sparats i storage
  if (typeof basCache !== 'undefined') {
    setBas({
      type: 'SET_BAS_CACHE',
      payload: {
        loaded: true,
        data: basCache,
        status: 'cache',
        version: 'BAS 2022 ver 1.0',
      },
    })
    return true
  }
  const response = await getData() // {loaded: true, data: json, status: 'success', version: json.ChartVersion.Name}

  if (response.loaded) {
    const isCurrent = response.version.includes('2022')
    storage.set('bas', JSON.stringify(response))
    if (isCurrent) {
      setBas({
        type: 'SET_BAS_LIVE',
        payload: {
          loaded: true,
          data: response.data,
          status: 'live',
          version: response.version,
        },
      })
    } else {
      setBas({
        type: 'SET_BAS_FILE',
        payload: {
          loaded: true,
          data: bas2022,
          status: 'file',
          version: 'BAS 2022 ver 1.0',
        },
      })
    }
    return true
  } else {
    setBas({
      type: 'SET_BAS_ERROR',
      payload: {
        loaded: true,
        data: bas2022,
        status: response.status,
        version: 'BAS 2022 ver 1.0',
      },
    })
    return true
  }
}
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
