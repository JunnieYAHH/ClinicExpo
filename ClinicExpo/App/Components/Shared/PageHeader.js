import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PageHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-circle-outline" size={34} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontFamily: 'System' }} >{title}</Text>
        </View>
    )
}

export default PageHeader