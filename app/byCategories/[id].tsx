import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { id } = useLocalSearchParams();
  console.log({id})
  return (
    <View>
      <Text>Transactions by category id: {id}</Text>
    </View>
  )
}
