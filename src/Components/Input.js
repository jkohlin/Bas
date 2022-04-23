import React from 'react'
import {StyleSheet, TextInput, View, Dimensions} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const Input = ({text, setText}) => {
  const styles = StyleSheet.create({
    sectionContainer: {
      display: 'flex',
      marginVertical: 10,
      padding: 10,
      color: Colors.white,
      flex: 0,
    },
    searchInput: {
      width: Dimensions.get('window').width - 50,
      backgroundColor: '#323d3f',
      color: Colors.white,
      height: 60,
      fontSize: 20,
      marginHorizontal: 5,
      borderColor: '#ffb300',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  })

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        clearButtonMode="while-editing"
        style={styles.searchInput}
        onChangeText={setText}
        value={text}
        placeholder="Sök baskonto eller nummer"
        keyboardType="default"
      />
    </View>
  )
}

export default Input
