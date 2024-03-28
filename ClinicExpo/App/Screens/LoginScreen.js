import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Image, TextInput, Pressable, Alert, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import walls from './../../assets/images/walls.gif';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabNavigation } from '../Navigation/TabNavigation'
import SignInWithOAuth from '../Components/SignInWithOAuth';
import baseURL from '../../assets/common/baseURL';

const LoginScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigation();

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

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };

        axios
            .post(`${baseURL}/users/login`, user)
            .then((response) => {
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace('TabNavigation')
            }).catch((error) => {
                Alert.alert('Login Error', "Invalid Email and Password", error.message)
                console.log(error.message);
            })
    }

    return (
        <ScrollView>

            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                {/* <View style={{ marginTop: 5 }}>
                    <Image source={walls} style={{ width: 500, height: 500 }} />
                </View> */}
                <KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42' }}>
                                Log in To Your Account
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <SignInWithOAuth />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                            <MaterialIcons name="email" size={24} color="black" style={{ marginLeft: 10 }} />
                            <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ fontSize: email ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }} placeholder='Enter Your Email' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 10 }}>
                            <FontAwesome name="lock" size={24} color="black" style={{ marginLeft: 10 }} />
                            <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ fontSize: password ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }} placeholder='Enter Your Password' />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>Keep Me Log In</Text>
                        <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forgot Password</Text>
                    </View>
                </KeyboardAvoidingView>
                <Pressable
                    onPress={handleLogin}
                    style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, justifyContent: 'center', padding: 15, marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}> Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center' }}>Dont have an account? Sign Up</Text>
                </Pressable>

                <View style={{ marginTop: 50, color: 'gray', fontSize: 16 }} />
            </SafeAreaView>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})