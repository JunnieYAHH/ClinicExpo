import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import walls from './../../assets/images/walls.gif';
import Colors from '../../assets/Shared/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    navigation.navigate("TabNavigation")
                }
            } catch (error) {
                console.log("Eror on login Status", error);
            }
        };
        checkLoginStatus();
    }, [])

    const handleNavigateToLoginScreen = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ marginTop: 5 }}>
                    <Image source={walls} style={{ width: 500, height: 650 }} />
                </View>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: Colors.LIGHT_GRAY
                }}>

                    <View style={{
                        backgroundColor: Colors.white,
                        padding: 25,
                        alignItems: 'center',
                        marginTop: -50,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>
                        <Text style={styles.heading}>Online Appointment App</Text>
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            Book Appointment Effortlessly and monitor your health Journey
                        </Text>
                        <TouchableOpacity onPress={handleNavigateToLoginScreen}
                            style={{
                                padding: 16,
                                backgroundColor: Colors.PRIMARY,
                                borderRadius: 90,
                                alignItems: 'center',
                                marginTop: 20,
                                width: Dimensions.get('screen').width * 0.8,
                            }}>
                            <Text style={styles.buttonText}>LogIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView >

    );
}

const styles = StyleSheet.create({
    wallImage: {
        width: 400,
        height: 600,
        objectFit: 'cover',
        marginTop: 50,
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#000'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    button: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 90,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        fontSize: 20,
        color: Colors.white,
    }
});
