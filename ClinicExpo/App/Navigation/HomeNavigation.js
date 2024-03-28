
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import ClinicServiceScreen from '../Screens/ClinicServiceScreen';
import BookAppointment from '../Screens/BookAppointment';

const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='clinic-service-screen' component={ClinicServiceScreen} />
            <Stack.Screen name='book-appointment-now' component={BookAppointment} />
        </Stack.Navigator>
    )
}

export default HomeNavigation

const styles = StyleSheet.create({})