import React from 'react'
import {View, Text} from 'react-native'
import {translate} from '../Utils/translate'

const Table = ({items, styles}) => {
  let oddEven = false
  styles = {
    ...styles,
    table: {borderRadius: 5, overflow: 'hidden'},
    tableHeaderRow: {
      backgroundColor: '#546569',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 10,
      paddingVertical: 10,
    },
    tableValueRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 10,
      paddingVertical: 5,
    },
    tableHeader: {
      color: '#ebebde',
      fontSize: 12,
      fontWeight: 'bold',
      flexBasis: '50%',
      flex: 1,
    },
    tableValue: {
      color: '#262d30',
      fontSize: 12,
      flexBasis: '50%',
      flex: 1,
    },
    dark: {
      backgroundColor: '#8ba7ad',
    },
    light: {
      backgroundColor: '#9ab9c0',
    },
  }
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableHeader}>{translate('TaxForm')}</Text>
        <Text style={styles.tableHeader}>{translate('Code')}</Text>
      </View>
      {items.map(i => {
        oddEven = !oddEven
        return (
          <View
            style={[styles.tableValueRow, oddEven ? styles.light : styles.dark]}
            key={i.TaxForm + i.Code}>
            <Text style={styles.tableValue}>{i.TaxForm}</Text>
            <Text style={styles.tableValue}>
              {i.Code ?? translate('Indeterminate')}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
export default Table
