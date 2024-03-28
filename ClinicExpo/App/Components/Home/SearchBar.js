import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={{marginTop:15}}>
        <View>
        <Ionicons name="search-outline" size={24} color="black" />
            <TextInput placeholder='Seacrh'/>
        </View>
    </View>
  )
}