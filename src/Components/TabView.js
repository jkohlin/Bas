import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
  heading: {
    fontSize: 12,
    color: '#ffdb72',
    marginBottom: 3,
  },
  tabView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  tab: {
    padding: 6,
    backgroundColor: '#323d3f',
    width: 48,
    borderRadius: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#54646a',
    borderWidth: 1,
    shadowColor: '#262d30',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 0,
  },
  tabSelected: {
    backgroundColor: '#54646a',
    borderColor: '#323d3f',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0,
    height: 35,
    marginBottom: 0,
    alignSelf: 'flex-end',
  },
  tabText: {color: '#ebebde', fontWeight: 'bold'},
  descriptionContainer: {
    padding: 10,
    backgroundColor: '#54656a',
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  description: {color: '#fff'},
  mb2: {marginBottom: 10},
})

const TabView = ({parents}) => {
  const [selected, setSelected] = useState(null)
  return (
    <View style={styles.mb2}>
      <Text style={styles.heading}>Relaterade konton</Text>
      <View style={styles.tabView}>
        {parents.map((p, i) => (
          <Tab
            key={p.AccountNumber}
            parent={p}
            selected={selected}
            show={() => {
              setSelected(p === selected ? null : p)
            }}
          />
        ))}
      </View>
      <TabDescription selected={selected} />
    </View>
  )
}

const Tab = ({parent, show, selected}) => {
  const style = [styles.tab]
  if (parent === selected) {
    style.push(styles.tabSelected)
  }
  return (
    <>
      <TouchableOpacity onPress={show} style={style}>
        <Text style={styles.tabText}>{parent.AccountNumber}</Text>
      </TouchableOpacity>
      {parent.AccountNumber.length !== 3 && (
        <Text style={styles.tabText}>—</Text>
      )}
    </>
  )
}
const TabDescription = ({selected}) => {
  if (!selected) {
    return null
  }
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{selected.SwedishName}</Text>
    </View>
  )
}

export default TabView
