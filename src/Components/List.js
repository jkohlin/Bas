import React, {useState, useContext, useRef} from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native'
import {translate} from '../Utils/translate'
import Table from './Table'
import TabView from './TabView'
import {DataContext} from '../../DataProvider'

const formatObject = item => {
  if (typeof item === 'object') {
    // taxform references
    return <Table items={item} styles={styles} />
  }
  if (typeof item === 'boolean') {
    return ''
  }
  return translate(item)
}

const Parents = ({accounts, id}) => {
  const getAccount = i => accounts.filter(item => item.AccountNumber === i)
  if (id.length === 4) {
    const [one] = getAccount(id.slice(0, 1))
    const [two] = getAccount(id.slice(0, 2))
    const [three] = getAccount(id.slice(0, 3))
    return <TabView parents={[one, two, three]} />
  }
  return null
}

const Item = ({item, onPress, backgroundColor, textColor, selectedId}) => {
  const id = `${item.AccountNumber}-${item.ValidForOrganizationTypes.join('-')}`
  const notes = item.IsBasic || item.NotAllowedInK2
  const excluded = [
    'AccountNumber',
    'SwedishName',
    'IsGroup',
    'ValidForOrganizationTypes',
    'EnglishName',
    'IsBasic',
    'NotAllowedInK2',
  ]
  const {data} = useContext(DataContext)
  // Pressable instead of TouchableOpacity in next version
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View style={styles.accountHeader}>
        <Text style={[item.IsGroup && styles.group, styles.account]}>
          {item.AccountNumber}
        </Text>
        <Text style={[styles.title, textColor]}>{item.SwedishName}</Text>
      </View>
      {selectedId === id && (
        <View style={styles.details}>
          {/* Föräldraskap */}
          <Parents accounts={data.Accounts} id={item.AccountNumber} />
          {/* Basdata */}
          {Object.keys(item)
            .filter(key => !excluded.includes(key))
            .map(key =>
              typeof item[key] !== 'object' ? (
                <View key={key} style={styles.basicInfo}>
                  <Text style={styles.tag}>{translate(key)}</Text>
                  <Text style={styles.value}>{formatObject(item[key])}</Text>
                </View>
              ) : null,
            )}
          {/* Organisationstyper */}
          <View style={styles.basicInfo}>
            <Text style={styles.tag}>Organisationstyp</Text>
            <Text style={[styles.value]}>
              {item.ValidForOrganizationTypes.map(translate).join(', ')}
            </Text>
          </View>
          {/* SRU-Kopplingar */}
          {item.TaxFormReferences && (
            <View style={styles.sru}>
              <Text style={styles.sruHeading}>
                {translate('TaxFormReferences')}
              </Text>
              <Text style={styles.value}>
                {formatObject(item.TaxFormReferences)}
              </Text>
            </View>
          )}
          {/* Anteckningar */}
          {notes && <Text style={styles.notesHeading}>Anteckningar</Text>}
          <View
            style={[
              notes ? styles.show : styles.hide,
              styles.notesContainer,
              styles.mt2,
            ]}>
            {item.IsBasic && (
              <Text style={styles.notes}>{translate('IsBasic')}</Text>
            )}
            {item.NotAllowedInK2 && (
              <Text style={styles.notes}>{translate('NotAllowedInK2')}</Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

const List = ({basData}) => {
  const [selectedId, setSelectedId] = useState(null)
  const scrollRef = useRef()

  const renderItem = ({item, index}) => {
    // eslint-disable-next-line prettier/prettier
    const id = `${item.AccountNumber}-${item.ValidForOrganizationTypes.join('-')}`
    const backgroundColor = id === selectedId ? '#435154' : '#323d3f'
    const color = id === selectedId ? 'white' : '#ebebde'
    return (
      <Item
        item={item}
        onPress={() => {
          setTimeout(() => {
            scrollRef.current.scrollToIndex({
              index: index,
              animated: true,
              viewPosition: 0,
            })
          }, 100)
          LayoutAnimation.configureNext({
            duration: 400,
            create: {type: 'easeOut', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.8},
            delete: {type: 'easeOut', property: 'opacity'},
          })
          setSelectedId(id === selectedId ? null : id)
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        selectedId={selectedId}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={basData}
        renderItem={renderItem}
        keyExtractor={item =>
          `${item.AccountNumber}-${item.ValidForOrganizationTypes.join('-')}`
        }
        extraData={selectedId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mb2: {marginBottom: 10},
  mt2: {marginTop: 10},
  accountHeader: {padding: 8},
  group: {fontWeight: 'bold', color: '#9ab9c0', fontSize: 11},
  account: {fontWeight: 'bold', color: '#9ab9c0', fontSize: 11},
  details: {
    color: '#fff',
    marginTop: 10,
    paddingTop: 10,
    padding: 10,
    borderRadius: 5,
    borderTopColor: '#667980',
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: 0,
    padding: 2,
  },
  item: {
    overflow: 'hidden',
    padding: 0,
    marginVertical: 2,
    marginHorizontal: 15,
    borderRadius: 4,
    transition: '0.4s',
  },
  tag: {
    fontSize: 12,
    color: '#ffdb72',
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    color: '#ebebde',
    marginBottom: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  basicInfo: {
    marginBottom: 5,
  },
  sruHeading: {fontWeight: 'bold', color: '#90e3e7', marginBottom: 10},
  sru: {
    marginTop: 10,
  },
  notesHeading: {fontWeight: 'bold', color: '#ff99e8', marginTop: 10},
  notesContainer: {
    padding: 10,
    backgroundColor: '#54656a',
    borderRadius: 5,
  },
  notes: {fontSize: 12, color: '#ebebde'},
  show: {display: 'flex'},
  hide: {display: 'none'},
  taxFormHeading: {color: '#90e3e7', fontSize: 12},
  taxFormValue: {color: '#ebebde'},
  taxFormColumn: {marginRight: 20, width: '40%'},
})

export default List
