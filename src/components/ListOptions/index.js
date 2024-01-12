import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import React from 'react'
import CheckBoxComponent from './CheckBoxComponent'

const ListOptions = ({title, options, handleData}) => {
  return (
    <View>
      <Text h4 style={styles.textStyle}>{title}</Text>
      {options.map((option) => {
        return (
          <CheckBoxComponent
            key={option}
            text={option}
            handleCity={handleData}
          />
        )
      })}
    </View>
  )
}

export default ListOptions

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 40,
  }
})